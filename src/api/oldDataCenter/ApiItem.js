import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function queryCatalogItems(data) {
  return request({
    baseURL: baseURL,
    url: `/data/item/catalogItems?${stringify(data)}`,
    method: 'get'
  })
}

export function getById(data) {
  return request({
    baseURL: baseURL,
    url: `/data/item/vo?${stringify(data)}`,
    method: 'get'
  })
}

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/item?${stringify(data)}`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    baseURL: baseURL,
    url: '/data/item/save',
    method: 'post',
    data
  })
}

export function saveAndRegister(data) {
  return request({
    baseURL: baseURL,
    url: '/data/item/saveAndRegister',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    baseURL: baseURL,
    url: `/data/item?id=${id}`,
    method: 'delete'
  })
}

export function staticsByDepartment() {
  return request({
    baseURL: baseURL,
    url: `/data/item/departments`,
    method: 'get'
  })
}
