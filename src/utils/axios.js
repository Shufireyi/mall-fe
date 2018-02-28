import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://localhost:3000',
  timeout: 60 * 1000
})

instance.interceptors.request.use((config) => {
  const conf = {
    ...config,
    headers: {
      ...config.headers,
      // 'X-Appgo-Token': Cookies.get('_token')
      'x-access-token': 'AAAAAAAAAAAAAAA'
    }
  }
  return conf
}, (error) => {
  // outputErrMsg(error.response.data)
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  if (response.data.errcode) {
    // outputErrMsg(response.data.errmsg)
    if (response.data.errcode === 40200) {
      // outputErrMsg('用户信息已过期，请重新登录！')
      // setTimeout(() => {
      //   window.location.replace('/logout')
      // }, 2000)
    }
    return Promise.reject(response)
  }
  return response
}, (error) => {
  // outputErrMsg(error.response.data)
  return Promise.reject(error)
})

export default instance
