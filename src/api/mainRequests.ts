import { instanceApi } from './instance'
import store from '@/store'

// Get list of currencies
export const getCurrencies = async (): Promise<void> => {
  const { data } = await instanceApi.get('statdirectory/exchange?json')
  store.commit('currency/setCurrencies', data)
  store.commit('currency/setAllCurrencies', data)
}
