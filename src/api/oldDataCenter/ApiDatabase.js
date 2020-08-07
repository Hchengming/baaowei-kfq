import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function getTables(data) {
  return request({
    baseURL: baseURL,
    url: `/data/database/tables?${stringify(data)}`,
    method: 'get'
  })
}

export function getFields(data) {
  return request({
    baseURL: baseURL,
    url: `/data/database/fields?${stringify(data)}`,
    method: 'get'
  })
}
