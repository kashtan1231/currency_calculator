<template>
  <div class="home-page">
    <h1 class="home-page__title">Обмін валют</h1>

    <div class="home-page__inputs">
      <BaseCurrencyInput
        v-model="inputFirst.value"
        @input="calculateSecondInput"
        @chooseCurrency="chooseFirstCurrency"
        :selectedCurrency="inputFirst"
        :id="0"
        label="Віддаю"
      />

      <div class="home-page__inputs-switch" @click="switchCurrencies">⇄</div>

      <BaseCurrencyInput
        v-model="inputSecond.value"
        @input="calculateFirstInput"
        @chooseCurrency="chooseSecondCurrency"
        :selectedCurrency="inputSecond"
        :id="1"
        label="Отримую"
      />

      <button
        class="home-page__exchange-button"
        @click="exchange"
        :disabled="isExchangeButtonDisabled"
      >
        Обміняти
      </button>
    </div>

    <p class="home-page__exchange-rate">
      {{ getExchangeRate }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseCurrencyInput from '@/components/BaseCurrencyInput.vue'
import { Currency } from '@/models'

@Component({
  components: { BaseCurrencyInput }
})
export default class HomePage extends Vue {
  inputFirst: Currency = {
    value: null,
    rate: 0,
    cc: 'CCY',
    txt: '',
    reserve: 0
  }
  inputSecond: Currency = {
    value: null,
    rate: 0,
    cc: 'CCY',
    txt: '',
    reserve: 0
  }

  get getExchangeRate(): string {
    return `Курс обміну: 1 ${this.inputFirst.cc} = ${parseFloat(
      (this.inputFirst.rate / this.inputSecond.rate).toFixed(4)
    )} ${this.inputSecond.cc}`
  }
  get isExchangeButtonDisabled(): boolean {
    const exchangeResult = this.actualReserve - (this.inputSecond.value || 0)
    return Boolean(!this.inputSecond.value) || exchangeResult < 0
  }
  get actualReserve(): number {
    const neededCurrency = this.$store.getters['currency/getNeededCurrency'](this.inputSecond)
    return neededCurrency?.reserve.toFixed(0)
  }

  chooseFirstCurrency(newCurrency: Currency): void {
    this.inputFirst = { ...this.inputFirst, ...newCurrency }
    this.calculateSecondInput()
  }
  chooseSecondCurrency(newCurrency: Currency): void {
    this.inputSecond = { ...this.inputSecond, ...newCurrency }
    this.calculateSecondInput()
  }
  calculateFirstInput(): void {
    if (this.inputSecond.value && this.inputFirst.rate && this.inputSecond.rate) {
      this.inputFirst.value = parseFloat(
        ((this.inputSecond.rate / this.inputFirst.rate) * this.inputSecond.value).toFixed(4)
      )
    }
  }
  calculateSecondInput(): void {
    if (this.inputFirst.value && this.inputFirst.rate && this.inputSecond.rate) {
      this.inputSecond.value = parseFloat(
        ((this.inputFirst.rate / this.inputSecond.rate) * this.inputFirst.value).toFixed(4)
      )
    }
  }
  switchCurrencies(): void {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[this.inputFirst, this.inputSecond] = [this.inputSecond, this.inputFirst]
  }

  exchange(): void {
    this.$store.commit('currency/makeExchange', this.inputSecond)
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
  padding: 0 46px;

  &__title {
    text-align: center;
    margin-bottom: 64px;
  }

  &__inputs {
    display: flex;
    justify-content: center;

    > :not(:last-child) {
      margin-right: 16px;
    }

    &-switch {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 1px $gray-dark;
      cursor: pointer;

      &:hover {
        background-color: $gray;
      }
    }
  }

  &__exchange-button {
    @extend p;
    padding: 14px 16px;
    height: fit-content;
    box-shadow: inset 0 0 0 1px $gray-dark;
    background-color: $gray;
    border-radius: 4px;
    color: $black;
    transition-duration: 0.2s;

    &:hover {
      background-color: $red;
      color: $white;
    }

    &:disabled {
      cursor: default;
      box-shadow: none;

      &:hover {
        background-color: $gray;
        color: $black;
      }
    }
  }

  &__exchange-rate {
    margin-top: 32px;
    text-align: center;
  }
}

@media screen and (max-width: 1023px) {
  .home-page {
    padding: 0 16px;

    &__inputs {
      flex-direction: column;
      align-items: center;

      > :not(:last-child) {
        margin-right: 0;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
