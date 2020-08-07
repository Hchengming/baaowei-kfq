import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function treeTable(data) {
  return request({
    baseURL: baseURL,
    url: `/data/sys/dic/treeTable?${stringify(data)}`,
    method: 'get'
  })
}

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/sys/dic?${stringify(data)}`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    baseURL: baseURL,
    url: '/data/sys/dic/save',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    baseURL: baseURL,
    url: `/data/sys/dic?id=${id}`,
    method: 'delete'
  })
}
