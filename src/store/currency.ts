export default {
  namespaced: true,
  state: {
    allCurrenciesList: [],
    currenciesList: [],
    favoriteList: [],
  },
  mutations: {
    setCurrencies(
      state: any,
      currenciesList: Array<Record<string, string>>
    ): void {
      state.currenciesList = [...currenciesList]
      const hryvniaObject = {
        cc: 'UAH',
        exchangedate: '23.05.2023',
        rate: 1,
        txt: 'Гривня',
      }
      state.currenciesList.unshift(hryvniaObject)
    },

    setAllCurrencies(
      state: any,
      currenciesList: Array<Record<string, string>>
    ): void {
      state.allCurrenciesList = [...currenciesList]
      const hryvniaObject = {
        cc: 'UAH',
        exchangedate: '23.05.2023',
        rate: 1,
        txt: 'Гривня',
      }
      state.allCurrenciesList.unshift(hryvniaObject)
    },

    addToFavorites(state: any, newFavoriteItem: Record<string, string>) {
      state.favoriteList.unshift(newFavoriteItem)
      const indexToRemove = state.currenciesList.findIndex(
        (item: any) => item.cc === newFavoriteItem.cc
      )
      if (indexToRemove !== -1) {
        state.currenciesList.splice(indexToRemove, 1)
      }
    },

    removeFromFavorites(
      state: any,
      removeFavoriteItem: Record<string, string>
    ) {
      state.currenciesList.push(removeFavoriteItem)

      const indexToRemove = state.favoriteList.findIndex(
        (item: any) => item.cc === removeFavoriteItem.cc
      )
      if (indexToRemove !== -1) {
        state.favoriteList.splice(indexToRemove, 1)
      }
    },
  },
}
