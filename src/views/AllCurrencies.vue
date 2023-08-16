<template>
  <div class="all-currencies">
    <h1 class="all-currencies__title">Усі курси валют</h1>

    <div class="all-currencies__reference-wrapper">
      <p>Еталонна валюта:</p>

      <div class="reference">
        <div
          class="reference__button"
          @click="switchReferenceSelector"
        >
          <p>{{ selectedCurrency.txt }} {{ selectedCurrency.cc }}</p>

          <div
            :class="[
              'reference__arrow',
              { 'active-arrow': isReferenceSelectorShown },
            ]"
          ></div>
        </div>

        <div
          v-if="isReferenceSelectorShown"
          v-click-outside="closeCurrencySelector"
          class="reference__selector"
        >
          <BaseSearchInput
            v-model="searchedCurrency"
            class="reference__selector-search"
            label="Введіть валюту"
          />

          <div
            v-for="item in favoriteList"
            class="currency-item"
            @click="chooseCurrency(item)"
            :key="item.cc"
          >
            <img
              src="@/assets/star-shaded.svg"
              class="currency-item__star"
              alt="star-shaded"
            />
            <p class="currency-item__txt">{{ item.txt }}</p>
            <p class="currency-item__cc">{{ item.cc }}</p>
          </div>

          <div
            v-for="item in currenciesListSearched"
            class="currency-item"
            @click="chooseCurrency(item)"
            :key="item.cc"
          >
            <p class="currency-item__txt">{{ item.txt }}</p>
            <p class="currency-item__cc">{{ item.cc }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="favoriteList.length > 0"
      class="all-currencies__favorites"
    >
      <p>Обрані:</p>
      <div
        v-for="item in favoriteList"
        class="all-currencies__favorites-item"
        @click="removeFromFavorites(item)"
        :key="item.cc"
      >
        {{ item.cc }}
      </div>
    </div>

    <div class="all-currencies__list">
      <div
        v-for="item in currenciesListShown"
        class="all-currencies__list-item"
        :key="item.cc"
      >
        <img
          v-if="isCurrencyFavorite(item)"
          src="@/assets/star-shaded.svg"
          class="all-currencies__list-item-star"
          @click="removeFromFavorites(item)"
          alt="star-shaded"
        />
        <img
          v-else
          src="@/assets/star.svg"
          class="all-currencies__list-item-star"
          @click="addToFavorites(item)"
          alt="star"
        />

        <p>1 {{ item.txt }} {{ item.cc }} = {{ calculatedValue(item.rate) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vClickOutside from 'v-click-outside'
import BaseSearchInput from '@/components/BaseSearchInput.vue'

@Component({
  components: { BaseSearchInput },
})
export default class AllCurrencies extends Vue {
  searchedCurrency = ''
  isReferenceSelectorShown = false
  selectedCurrency: Record<string, string> = {}

  get favoriteList(): Array<Record<string, string>> {
    return this.$store.state.currency.favoriteList
  }
  get currenciesListShown(): Array<Record<string, string>> {
    return this.$store.state.currency.allCurrenciesList.filter(
      (item: any) => item.cc !== this.selectedCurrency.cc
    )
  }
  get currenciesListSearched(): Array<Record<string, string>> {
    return this.$store.state.currency.currenciesList.filter(
      (item: any) =>
        item.cc.toLowerCase().includes(this.searchedCurrency.toLowerCase()) ||
        item.txt.toLowerCase().includes(this.searchedCurrency.toLowerCase())
    )
  }

  isCurrencyFavorite(item: any): boolean {
    return this.favoriteList.some((obj) => obj.cc === item.cc)
  }
  calculatedValue(rate: string): string {
    return `${parseFloat((+rate / +this.selectedCurrency.rate).toFixed(4))} ${
      this.selectedCurrency.txt
    } ${this.selectedCurrency.cc}`
  }
  switchReferenceSelector(): void {
    this.isReferenceSelectorShown = !this.isReferenceSelectorShown
  }
  closeCurrencySelector(): void {
    this.isReferenceSelectorShown = false
  }
  chooseCurrency(newCurrency: Record<string, string>): void {
    this.selectedCurrency = newCurrency
    this.closeCurrencySelector()
  }
  addToFavorites(item: any): void {
    this.$store.commit('currency/addToFavorites', item)
  }
  removeFromFavorites(item: any): void {
    this.$store.commit('currency/removeFromFavorites', item)
  }

  created(): void {
    this.chooseCurrency(this.$store.state.currency.currenciesList[0])
    Vue.use(vClickOutside)
  }
}
</script>

<style lang="scss" scoped>
.all-currencies {
  display: flex;
  flex-direction: column;
  padding: 0 46px;

  &__title {
    text-align: center;
    margin-bottom: 16px;
  }

  &__reference-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    .reference {
      margin-left: 12px;

      &__button {
        display: flex;
        align-items: center;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: $gray;
        }
      }

      &__arrow {
        height: 0;
        margin-left: 8px;
        border-top: 5px solid $black;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        transition-duration: 0.2s;
      }

      &__selector {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        display: flex;
        flex-direction: column;
        max-height: 400px;
        width: 100%;
        max-width: 380px;
        padding: 14px 0;
        border-radius: 4px;
        background-color: $white;
        border: solid 1px $gray-dark;
        box-shadow: 0 0 11px 0px rgba($gray-dark, 0.5);
        overflow: auto;

        &-search {
          padding: 0 15px;
          margin-bottom: 8px;
        }
      }
    }
  }

  &__favorites {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 8px;

    > :not(:last-child) {
      margin-right: 8px;
    }

    &-item {
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: $gray;
      }
    }
  }

  &__list {
    display: flex;
    flex-direction: column;

    &-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: solid 2px $gray-dark;

      &-star {
        height: 24px;
        margin-right: 8px;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: $gray;
        }
      }
    }
  }

  .currency-item {
    display: flex;
    padding: 8px 15px;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: $gray;
    }

    &__star {
      height: 16px;
      margin-right: 8px;
    }

    &__txt {
      padding-right: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__cc {
      margin-left: auto;
    }
  }

  .active-arrow {
    rotate: 180deg;
  }
}

@media screen and (max-width: 767px) {
  .all-currencies {
    padding: 0 16px;
  }
}
</style>
