import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: window.config.BaseApi, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // eslint-disable-next-line no-console
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
/**
 * If you want to get http information such as headers or status
 * Please return  response => response
 */
service.interceptors.response.use(
  response => {
    let res = response.data

    try {
      if (typeof res === 'string') {
        res = JSON.parse(res)
      }
    } catch (e) {
      return res
    }

    // 文件下载
    if (
      res.type &&
      (res.type.indexOf('application/octet-stream') > -1 ||
        res.type.indexOf('text/xml') > -1)
    ) {
      return res
    }

    return res
  },
  error => {
    if (error.response && error.response.data) {
      switch (error.response.data.code) {
        case 50014:
          MessageBox.confirm(
            '您的登录已经过期。您可以[取消]以停留在此页或[重新登录]',
            '确认退出',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '返回',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          break
        case 401:
          MessageBox.confirm(
            '您无权访问。您可以[取消]以停留在此页或[重新登录]',
            '确认退出',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '返回',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          break
      }
    }
    let message = '网络错误,请检查网络后重试！'
    message =
      error.message && error.message.indexOf('timeout') > -1
        ? '请求超时，请重试或联系管理员！'
        : message
    return Promise.reject(message)
  }
)

export default service
