import request from '@/utils/request'
const baseURL = window.config.UserApi

export function userLogin(data) {
  return request({
    baseURL: baseURL,
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    baseURL: baseURL,
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function userLogout() {
  return request({
    baseURL: baseURL,
    url: '/user/logout',
    method: 'post'
  })
}
