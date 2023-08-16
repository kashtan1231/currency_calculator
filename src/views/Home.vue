<template>
  <div class="home">
    <h1 class="home__title">Курси обміну валют</h1>

    <div class="home__inputs">
      <BaseCurrencyInput
        v-model="inputFirst.value"
        @input="calculateSecondInput"
        @chooseCurrency="chooseFirstCurrency"
        :selectedCurrency="inputFirst"
        :id="0"
        label="В мене є"
      />

      <div
        class="home__inputs-switch"
        @click="switchCurrencies"
      >
        ⇄
      </div>

      <BaseCurrencyInput
        v-model="inputSecond.value"
        @input="calculateFirstInput"
        @chooseCurrency="chooseSecondCurrency"
        :selectedCurrency="inputSecond"
        :id="1"
        label="Я отримаю"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseCurrencyInput from '@/components/BaseCurrencyInput.vue'

interface InputFirst {
  value: null | number
  rate: number
  cc: string
  txt: string
}

@Component({
  components: { BaseCurrencyInput },
})
export default class Home extends Vue {
  inputFirst: InputFirst = {
    value: null,
    rate: 0,
    cc: 'CCY',
    txt: '',
  }
  inputSecond: InputFirst = {
    value: null,
    rate: 0,
    cc: 'CCY',
    txt: '',
  }

  chooseFirstCurrency(newCurrency: any): void {
    this.inputFirst.rate = newCurrency.rate
    this.inputFirst.cc = newCurrency.cc
    this.inputFirst.txt = newCurrency.txt

    this.calculateSecondInput()
  }
  chooseSecondCurrency(newCurrency: any): void {
    this.inputSecond.rate = newCurrency.rate
    this.inputSecond.cc = newCurrency.cc
    this.inputSecond.txt = newCurrency.txt
    this.calculateSecondInput()
  }
  calculateFirstInput(): void {
    if (
      this.inputSecond.value &&
      this.inputFirst.rate &&
      this.inputSecond.rate
    ) {
      this.inputFirst.value = parseFloat(
        (
          (this.inputSecond.rate / this.inputFirst.rate) *
          this.inputSecond.value
        ).toFixed(4)
      )
    }
  }
  calculateSecondInput(): void {
    if (
      this.inputFirst.value &&
      this.inputFirst.rate &&
      this.inputSecond.rate
    ) {
      this.inputSecond.value = parseFloat(
        (
          (this.inputFirst.rate / this.inputSecond.rate) *
          this.inputFirst.value
        ).toFixed(4)
      )
    }
  }
  switchCurrencies(): void {
    ;[this.inputFirst, this.inputSecond] = [this.inputSecond, this.inputFirst]
  }
}
</script>

<style lang="scss" scoped>
.home {
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
}

@media screen and (max-width: 1023px) {
  .home {
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
