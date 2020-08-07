import request from '@/utils/request'
import { stringify } from 'qs'

const baseURL = window.config.DataApi

export function query(data) {
  return request({
    baseURL: baseURL,
    url: `/data/useapply/tome?${stringify(data)}`,
    method: 'get'
  })
}

export function queryMy(data) {
  return request({
    baseURL: baseURL,
    url: `/data/useapply/my?${stringify(data)}`,
    method: 'get'
  })
}

export function agree(data) {
  return request({
    baseURL: baseURL,
    url: `/data/useapply/agree?${stringify(data)}`,
    method: 'get'
  })
}

export function reject(data) {
  return request({
    baseURL: baseURL,
    url: `/data/useapply/reject?${stringify(data)}`,
    method: 'get'
  })
}

export function save(data) {
  return request({
    baseURL: baseURL,
    url: '/data/useapply/save',
    method: 'post',
    data
  })
}

export function saveAndAgree(data) {
  return request({
    baseURL: baseURL,
    url: '/data/useapply/saveandagree',
    method: 'post',
    data
  })
}

export function getMyAppply(data) {
  return request({
    baseURL: baseURL,
    url: `/data/useapply/getMyAppply?${stringify(data)}`,
    method: 'get'
  })
}

export function getAppplyById(data) {
  return request({
    baseURL: baseURL,
    url: `/data/useapply/getAppplyById?${stringify(data)}`,
    method: 'get'
  })
}
