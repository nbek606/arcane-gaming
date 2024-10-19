import axios from 'axios'

const baseUrl = import.meta.env.VITE_SERVER_URL
const APIKey =  import.meta.env.VITE_SERVER_API_KEY

export const $api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': APIKey
  }
})
