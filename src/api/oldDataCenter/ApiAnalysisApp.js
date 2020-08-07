import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/app/query?${stringify(data)}`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/app/save`,
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/app/delete?${stringify(data)}`,
    method: 'delete'
  })
}
