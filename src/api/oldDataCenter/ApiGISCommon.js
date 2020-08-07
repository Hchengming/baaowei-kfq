import request from './requestnocheck'
// import { stringify } from 'qs'

// const baseURL = window.config.DataApi

export function get(url) {
  return request({
    url: `${url}`,
    method: 'get'
  })
}

export function post(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
