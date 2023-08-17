import { Currency } from '@/models'

export default {
  namespaced: true,
  state: {
    allCurrenciesList: [],
    madeExchangesList: []
  },
  getters: {
    getNeededCurrency:
      (state: any) =>
      (currency: Currency): Currency => {
        const neededCurency = state.allCurrenciesList.find((item: Currency) => {
          return item.cc === currency.cc
        })
        return neededCurency
      }
  },
  mutations: {
    setAllCurrencies(state: any, currenciesList: Currency[]): void {
      currenciesList = currenciesList.map((item: Currency) => {
        return { ...item, reserve: 200000 }
      })
      state.allCurrenciesList = [...currenciesList]
      const hryvniaObject = {
        cc: 'UAH',
        exchangedate: '23.05.2023',
        rate: 1,
        txt: 'Гривня',
        reserve: 200000
      }
      state.allCurrenciesList.unshift(hryvniaObject)
    },

    makeExchange(state: any, payload: any): void {
      if (payload.inputSecond.value) {
        const neededCurrency = state.allCurrenciesList.find(
          (item: Currency) => item.cc === payload.inputSecond.cc
        )
        neededCurrency.reserve -= payload.inputSecond.value
        const exchangeId = state.madeExchangesList.length - 1
        state.madeExchangesList.push({
          firstCurrency: payload.inputFirst,
          secondCurrency: payload.inputSecond,
          exchangeRate: payload.exchangeRate,
          id: exchangeId
        })
      }
    }
  }
}
