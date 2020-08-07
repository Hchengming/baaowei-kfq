import request from '@/utils/request'

// 前后端联调使用
// const baseURL = 'http://xxzx.natapp1.cc'
const baseURL = window.config.AppApi
const baseApiUrl = window.config.BaseApi_Api
const homeApiUrl = window.config.HomeApi

// 应用树
export function getNodes() {
  return request({
    baseURL: baseURL,
    url: '/app/getAppMenuList',
    method: 'post'
  })
}

export function getNodesAuth() {
  return request({
    baseURL: baseURL,
    url: '/app/getAppMenuNodeList',
    method: 'post'
  })
}

// 应用元素删除
export function appElementDel(key) {
  return request({
    baseURL: baseURL,
    url: '/appElement/delete',
    method: 'DELETE',
    params: { key }
  })
}

// 应用相关接口
export function createApp(data) {
  return request({
    baseURL: baseURL,
    url: '/app/save',
    method: 'post',
    data
  })
}

export function updateApp(data) {
  return request({
    baseURL: baseURL,
    url: '/app/updateSysApp',
    method: 'post',
    data
  })
}

export function deleteApp(apKey) {
  return request({
    baseURL: baseURL,
    url: '/app/delete',
    method: 'DELETE',
    params: { apKey }
  })
}

export function getAppDetail(query) {
  return request({
    baseURL: baseURL,
    url: '/app/findAppByKey',
    method: 'post',
    params: query
  })
}

export function getOrgList(query) {
  return request({
    baseURL: baseApiUrl,
    url: '/org/findOrgList',
    method: 'get',
    params: query
  })
}

export function getAppList() {
  return request({
    baseURL: baseURL,
    url: '/app/getTypeDetailList',
    method: 'get'
  })
}

// 页面相关接口
export function getPageList(query) {
  return request({
    baseURL: baseURL,
    url: '/page/findAll',
    method: 'get',
    params: query
  })
}

export function getPageDetail(query) {
  return request({
    baseURL: baseURL,
    url: '/page/query',
    method: 'get',
    params: query
  })
}

export function createPage(data) {
  return request({
    baseURL: baseURL,
    url: '/page/save',
    method: 'post',
    data
  })
}

export function updatePage(data) {
  return request({
    baseURL: baseURL,
    url: '/page/update',
    method: 'post',
    data
  })
}

// 角色相关接口
export function getRoleList(query) {
  return request({
    baseURL: baseURL,
    url: '/busRole/findAll',
    method: 'get',
    params: query
  })
}

export function getRoleDetail(rlId) {
  return request({
    baseURL: baseURL,
    url: '/busRole/findRoleById',
    method: 'get',
    params: { rlId }
  })
}

export function createRole(data) {
  return request({
    baseURL: baseURL,
    url: '/busRole/save',
    method: 'post',
    data
  })
}

export function deleteRole(rlId) {
  return request({
    baseURL: baseURL,
    url: '/busRole/delete',
    method: 'DELETE',
    params: { rlId }
  })
}

export function updateRole(data) {
  return request({
    baseURL: baseURL,
    url: '/busRole/update',
    method: 'post',
    data
  })
}

export function getRoleAuth(query) {
  return request({
    baseURL: baseURL,
    url: '/busRole/findAuthorize',
    method: 'post',
    params: query
  })
}

export function updateRoleAuth(data) {
  return request({
    baseURL: baseURL,
    url: '/busRole/authorize',
    method: 'post',
    data
  })
}

// 功能相关接口
export function getFeaturesList(query) {
  return request({
    baseURL: baseURL,
    url: '/function/findAll',
    method: 'get',
    params: query
  })
}

export function getFeaturesDetail(query) {
  return request({
    baseURL: baseURL,
    url: '/function/query',
    method: 'get',
    params: query
  })
}

export function flashFeatures() {
  return request({
    baseURL: baseURL,
    url: '/app/flashFunc',
    method: 'get'
  })
}

export function createFeatures(data) {
  return request({
    baseURL: baseURL,
    url: '/function/save',
    method: 'post',
    data
  })
}

export function updateFeatures(data) {
  return request({
    baseURL: baseURL,
    url: '/function/update',
    method: 'post',
    data
  })
}

// 服务接口相关接口
export function getServiceInterfaceList(query) {
  return request({
    baseURL: baseURL,
    url: '/service/queryList',
    method: 'get',
    params: query
  })
}

export function getServiceInterfaceDetail(query) {
  return request({
    baseURL: baseURL,
    url: '/service/queryByPower',
    method: 'post',
    params: query
  })
}

export function createServiceInterface(data) {
  return request({
    baseURL: baseURL,
    url: '/service/save',
    method: 'post',
    data
  })
}

export function updateServiceInterface(data) {
  return request({
    baseURL: baseURL,
    url: '/service/update',
    method: 'post',
    data
  })
}

export function deleteServiceInterface(query) {
  return request({
    baseURL: baseURL,
    url: '/service/delete',
    method: 'DELETE',
    params: query
  })
}

// 工作流相关接口
export function getWorkflowList(bzId) {
  return request({
    baseURL: baseURL,
    url: '/busbzform/findWork',
    method: 'get',
    params: { bzId }
  })
}

// 表单相关接口
export function getFormList(bzId) {
  return request({
    baseURL: baseURL,
    url: '/busbzform/findForm',
    method: 'get',
    params: { bzId }
  })
}

// 业务节点接口
export function getBusinessNode(query) {
  return request({
    baseURL: baseURL,
    url: '/app/getBizList',
    method: 'get',
    params: query
  })
}

// 业务相关接口
export function getBusinessList(query) {
  return request({
    baseURL: baseURL,
    url: '/app/findBizList',
    method: 'get',
    params: query
  })
}

export function deleteBusiness(query) {
  return request({
    baseURL: baseURL,
    url: '/app/deleteBiz',
    method: 'DELETE',
    params: query
  })
}

export function getBusinessDetail(bzId) {
  return request({
    baseURL: baseURL,
    url: '/app/findBizById',
    method: 'get',
    params: { bzId }
  })
}

export function createBusiness(data) {
  return request({
    baseURL: baseURL,
    url: '/app/saveBiz',
    method: 'post',
    data
  })
}

export function updateBusiness(data) {
  return request({
    baseURL: baseURL,
    url: '/app/updateBiz',
    method: 'post',
    data
  })
}

export function createBusinessCounter(query) {
  return request({
    baseURL: baseURL,
    url: '/BusCounterService/save4Biz',
    method: 'post',
    params: query
  })
}

export function getBusinessStatusList(bzId) {
  return request({
    baseURL: baseURL,
    url: '/busbzform/findState',
    method: 'get',
    params: { bzId }
  })
}

export function deleteStatus(bsID) {
  return request({
    baseURL: baseURL,
    url: '/app/deleteState',
    method: 'DELETE',
    params: { bsID }
  })
}

export function deleteForm(id) {
  return request({
    baseURL: baseURL,
    url: '/app/deleteForm',
    method: 'DELETE',
    params: { id }
  })
}

export function deleteReport(id) {
  return request({
    baseURL: baseURL,
    url: '/app/deleteOutForm',
    method: 'DELETE',
    params: { id }
  })
}

export function deleteWorkflow(id) {
  return request({
    baseURL: baseURL,
    url: '/app/deleteWork',
    method: 'DELETE',
    params: { id }
  })
}

export function getBusinessActivityList(bzId) {
  return request({
    baseURL: baseURL,
    url: '/busbzform/findState',
    method: 'get',
    params: { bzId }
  })
}

export function getBusinessReportList(bzId) {
  return request({
    baseURL: baseURL,
    url: '/busbzform/findOutForm',
    method: 'get',
    params: { bzId }
  })
}

// 计数器相关接口
export function getCounterList(data) { // 查询
  return request({
    baseURL: baseURL,
    url: `/BusCounterService/query`,
    method: 'get',
    params: data
  })
}

export function updateCounter(data) {
  return request({
    baseURL: baseURL,
    url: '/BusCounterService/UpdateOrSave',
    method: 'post',
    data
  })
}

// 组织授权相关接口
export function getSysOrgApp(data) {
  return request({
    baseURL: baseURL,
    url: '/sysOrgApp/selectById',
    method: 'post',
    data
  })
}

export function getOrgAppMenuList() {
  return request({
    baseURL: baseApiUrl,
    url: '/org/findOrgList',
    method: 'get'
  })
}

export function save(data) {
  return request({
    baseURL: baseURL,
    url: '/sysOrgApp/save',
    method: 'post',
    data
  })
}

export function deleteSysOrgApp(data) {
  return request({
    baseURL: baseURL,
    url: '/sysOrgApp/delete',
    method: 'DELETE',
    data
  })
}

// 消息
export function getMessageList(query) {
  return request({
    baseURL: baseURL,
    url: '/app/getTemplateAll',
    method: 'get',
    params: query
  })
}

export function createMessage(data) {
  return request({
    baseURL: baseURL,
    url: '/app/addTemplate',
    method: 'post',
    data
  })
}

export function getMessageDetail(query) {
  return request({
    baseURL: baseURL,
    url: '/app/getTemplateById',
    method: 'get',
    params: query
  })
}

export function deleteMessage(query) {
  return request({
    baseURL: baseURL,
    url: '/app/delTemplateById',
    method: 'DELETE',
    params: query
  })
}

// 数据视图
export function getDataViewList(query) {
  return request({
    baseURL: baseURL,
    url: '/app/getDataViewByPage',
    method: 'get',
    params: query
  })
}

export function getDataViewDetail(query) {
  return request({
    baseURL: baseURL,
    url: '/app/getDataViewById',
    method: 'get',
    params: query
  })
}

export function deleteDataView(query) {
  return request({
    baseURL: baseURL,
    url: '/app/delDataViewById',
    method: 'DELETE',
    params: query
  })
}

// 首页展示块
export function getWidgetList(query) {
  return request({
    baseURL: homeApiUrl,
    url: '/widget/list',
    method: 'get',
    params: query
  })
}

export function getWidgetDetail(query) {
  return request({
    baseURL: homeApiUrl,
    url: '/widget/query',
    method: 'get',
    params: query
  })
}

export function createWidget(data) {
  return request({
    baseURL: homeApiUrl,
    url: '/widget/save',
    method: 'post',
    data
  })
}

export function updateWidget(data) {
  return request({
    baseURL: homeApiUrl,
    url: '/widget/update',
    method: 'post',
    data
  })
}

export function getWidgets() {
  return request({
    baseURL: homeApiUrl,
    url: '/widget/widgetList',
    method: 'get'
  })
}

// 用户应用功能点
export function getUserApeKeyList(data) {
  return request({
    baseURL: homeApiUrl,
    url: '/widget/getUserApeKeyList',
    method: 'post',
    data
  })
}

