import axios from "axios"
import { BASE_API_URL } from "../../env.js"

export const useGet = (url) => {
  return axios.get(`${BASE_API_URL}${url}`)
}