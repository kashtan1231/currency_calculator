import axios from 'axios'

export const actualUrl = (): string => {
  return 'https://bank.gov.ua/NBUStatService/v1/'
}

const defaultHeaders = {
  accept: 'application/json',
}

export const instanceApi = axios.create({
  baseURL: actualUrl(),
  headers: defaultHeaders,
})
