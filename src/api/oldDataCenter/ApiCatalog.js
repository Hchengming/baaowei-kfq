import request from '@/utils/request'
import request2 from './requestnocheck'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function treeTable(data) {
  return request({
    baseURL: baseURL,
    url: `/data/catalog/treeTable?${stringify(data)}`,
    method: 'get'
  })
}

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/catalog?${stringify(data)}`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    baseURL: baseURL,
    url: '/data/catalog/save',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    baseURL: baseURL,
    url: `/data/catalog?id=${id}`,
    method: 'delete'
  })
}

export function exportExcel() {
  return request2({
    baseURL: baseURL,
    url: `/data/catalog/export`,
    method: 'get',
    responseType: 'arraybuffer'
  })
}
