import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/log/search?${stringify(data)}`,
    method: 'get'
  })
}
