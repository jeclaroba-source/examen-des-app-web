import axios from 'axios'

const api = axios.create({
  baseURL: 'https://6a31b79f7bc5e1c612661b65.mockapi.io/api'
})

export default api