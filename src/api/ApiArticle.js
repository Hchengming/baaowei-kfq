import request from '@/utils/request'
const baseURL = window.config.BaseApi

export function getArticleList(query) {
  return request({
    baseURL: baseURL,
    url: '/api/article/list',
    method: 'get',
    params: query
  })
}

export function getArticle(id) {
  return request({
    baseURL: baseURL,
    url: '/api/article/detail',
    method: 'get',
    params: { id }
  })
}

export function addArticle(data) {
  return request({
    baseURL: baseURL,
    url: '/api/article/add',
    method: 'post',
    data
  })
}

export function delArticle(id) {
  return request({
    baseURL: baseURL,
    url: '/api/article/del',
    method: 'get',
    params: { id }
  })
}

export function editArticle(data) {
  return request({
    baseURL: baseURL,
    url: '/api/article/edit',
    method: 'post',
    data
  })
}

export function fetchPv(pv) {
  return request({
    baseURL: baseURL,
    url: '/api/article/pv',
    method: 'get',
    params: { pv }
  })
}
