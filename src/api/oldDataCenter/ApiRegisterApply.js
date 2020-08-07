import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/registerapply?${stringify(data)}`,
    method: 'get'
  })
}

export function agree(data) {
  return request({
    baseURL: baseURL,
    url: `/data/registerapply/agree?${stringify(data)}`,
    method: 'get'
  })
}

export function reject(data) {
  return request({
    baseURL: baseURL,
    url: `/data/registerapply/reject?${stringify(data)}`,
    method: 'get'
  })
}
