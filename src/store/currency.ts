import { Currency } from '@/models'

export default {
  namespaced: true,
  state: {
    allCurrenciesList: [],
    currenciesList: [],
    favoriteList: []
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
    setCurrencies(state: any, currenciesList: Currency[]): void {
      state.currenciesList = [...currenciesList]
      const hryvniaObject = {
        cc: 'UAH',
        exchangedate: '23.05.2023',
        rate: 1,
        txt: 'Гривня'
      }
      state.currenciesList.unshift(hryvniaObject)
    },

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

    makeExchange(state: any, currency: Currency): void {
      if (currency.value) {
        const neededCurrency = state.allCurrenciesList.find(
          (item: Currency) => item.cc === currency.cc
        )
        neededCurrency.reserve -= currency.value
      }
    },

    addToFavorites(state: any, newFavoriteItem: Currency): void {
      state.favoriteList.unshift(newFavoriteItem)
      const indexToRemove = state.currenciesList.findIndex(
        (item: Currency) => item.cc === newFavoriteItem.cc
      )
      if (indexToRemove !== -1) {
        state.currenciesList.splice(indexToRemove, 1)
      }
    },

    removeFromFavorites(state: any, removeFavoriteItem: Currency): void {
      state.currenciesList.push(removeFavoriteItem)

      const indexToRemove = state.favoriteList.findIndex(
        (item: Currency) => item.cc === removeFavoriteItem.cc
      )
      if (indexToRemove !== -1) {
        state.favoriteList.splice(indexToRemove, 1)
      }
    }
  }
}
