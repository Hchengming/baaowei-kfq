import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/task?${stringify(data)}`,
    method: 'get'
  })
}

export function getVo(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/task/vo?${stringify(data)}`,
    method: 'get'
  })
}
