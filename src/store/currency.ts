import { Currency } from '@/models'

export default {
  namespaced: true,
  state: {
    allCurrenciesList: [],
    currenciesList: [],
    favoriteList: []
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
        txt: 'Гривня'
      }
      state.allCurrenciesList.unshift(hryvniaObject)
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
