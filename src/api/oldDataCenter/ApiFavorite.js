import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/favorites/my?${stringify(data)}`,
    method: 'get'
  })
}

export function remove(data) {
  return request({
    baseURL: baseURL,
    url: `/data/favorites/delete?${stringify(data)}`,
    method: 'delete'
  })
}

export function save(data) {
  return request({
    baseURL: baseURL,
    url: '/data/favorites/save',
    method: 'post',
    data
  })
}
