import request from '@/utils/request'
// import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function myinfo() {
  return request({
    baseURL: baseURL,
    url: `/data/user/myinfo`,
    method: 'get'
  })
}
