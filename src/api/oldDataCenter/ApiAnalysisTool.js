import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/tool?${stringify(data)}`,
    method: 'get'
  })
}

export function getOne(id) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/tool/${id}`,
    method: 'get'
  })
}

export function queryVo(id) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/tool/vo/${id}`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/tool/save`,
    method: 'post',
    data
  })
}

export function saveVo(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/tool/saveVo`,
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    baseURL: baseURL,
    url: `/data/analysis/tool/delete?${stringify(data)}`,
    method: 'delete'
  })
}
