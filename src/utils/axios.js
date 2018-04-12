import axios from 'axios'
import { getToken } from './cache'
const instance = axios.create({
  baseURL: '/api/',
  timeout: 60 * 1000
})

instance.interceptors.request.use(
  config => {
    const conf = {
      ...config,
      headers: {
        ...config.headers,
        'x-access-token': getToken()
      }
    }
    return conf
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.data.errcode) {
      if (response.data.errcode === 40002) {
        // setTimeout(() => {
        //   window.location.replace('/logout')
        // }, 2000)
        console.log('跳转登出')
      }
      return Promise.reject(response)
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
