import request from '@/utils/request'

const baseURL = window.config.BaseApi

export function getTotal(query) {
  return request({
    baseURL: baseURL,
    url: '/caData/data/statistics/total',
    method: 'get',
    params: query
  })
}

export function getNew(query) {
  return request({
    baseURL: baseURL,
    url: '/caData/data/statistics/new',
    method: 'get',
    params: query
  })
}
