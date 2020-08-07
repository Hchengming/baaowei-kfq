import request from '@/utils/request'
import axios from 'axios'
// import { getToken } from '@/utils/auth'
import { OldSystemApi } from '@/utils/config'

const baseURL = window.config.BaseApi
const homeURL = window.config.HomeApi
// const configURL = process.env.VUE_CONFIGURSTION_API
export function OldSystemGet(url, params) {
  params.ticket = localStorage.ticket
  params.uip = localStorage.ip
  return axios({
    method: 'get',
    url: OldSystemApi + url,
    params
  })
}

// 通讯录
export function getTel() {
  const params = {
    action: 'GetOrgTree'
  }
  return OldSystemGet('/Api/Resources.ashx', params)
}

// 通知
export function getTz(type) {
  const params = {
    action: 'GetPortalLetData',
    serviceName: 'Xinfo.Bus.BL.Service.EgovPlatform.PortalLet.PublicDocmentPortalLetService,Xinfo.Bus.BL.Service',
    guid: 'rcgz_tz',
    getCount: true,
    intTypeId: type,
    strBizType: type
  }
  return OldSystemGet('/Api/PortalLet.ashx', params)
}

// 政务督查
export function getZwdc() {
  const params = {
    action: 'GetPortalLetData',
    serviceName: 'Xinfo.Bus.BL.Service.EgovPlatform.PortalLet.GovernmentSupervisiontPortalLetService,Xinfo.Bus.BL.Service',
    guid: 'rcgz_zwdc',
    getCount: true,
    intTypeId: 0,
    strBizType: '',
    TaskType: 1
  }
  return OldSystemGet('/Api/PortalLet.ashx', params)
}

// 待办事项
export function getDbsx() {
  const params = {
    action: 'GetPortalLetData',
    serviceName: 'Xinfo.Bus.BL.Service.EgovPlatform.PortalLet.TaskOfWaitingPortalLetService,Xinfo.Bus.BL.Service',
    guid: 'rcgz_dbrw',
    getCount: true,
    intTypeId: 0,
    strBizType: 'A',
    TaskType: 1
  }
  return OldSystemGet('/Api/PortalLet.ashx', params)
}

// 数据中枢
export function getSjzs() {
  return request({
    method: 'get',
    url: baseURL + '/indexDB/mock/selectMock1'
  })
}

// 规划自然资源监测数据
export function getGhzrzyjcsj() {
  return request({
    method: 'get',
    url: baseURL + '/indexDB/image/selectAll'
  })
}

// 中间应用
export function getApplication() {
  return request({
    method: 'get',
    url: baseURL + '/indexDB/icon/'
  })
}

// 中间轮播
export function getLunbo() {
  return request({
    method: 'get',
    url: baseURL + '/indexDB/typedetail/'
  })
}

// 待办事项详情列表
export function getDbsxDetailList(param) {
  param = param || {}
  var requestParamObject = {
    action: 'GetToDoTask',
    akId: param.akId,
    biCode: param.biCode || '',
    biSame: param.biSame || '',
    bizzType: param.bizzType || '',
    condition: param.condition || '',
    id: param.id || '',
    isStagView: param.isStagView,
    node: param.node || 'root',
    order: param.order,
    page: param.pageNum || 1,
    rows: param.pageSize || 20,
    sort: '接收时间',
    taskType: ''
  }
  return OldSystemGet('/Api/Task.ashx', requestParamObject)
}
// 已办任务详情列表
export function getYbDetailList(param) {
  param = param || {}
  var requestParamObject = {
    action: 'GetCompleteTask',
    akId: param.akId,
    biCode: param.biCode || '',
    biSame: param.biSame || '',
    bizzType: param.bizzType || '',
    condition: param.condition || '',
    id: param.id || '',
    isStagView: param.isStagView,
    node: param.node || 'root',
    days: param.days,
    page: param.pageNum || 1,
    rows: param.pageSize || 20,
    sort: '接收时间',
    taskType: '',
    order: param.order
  }
  return OldSystemGet('/Api/Task.ashx', requestParamObject)
}
// 未结任务详情列表
export function getWjDetailList(param) {
  param = param || {}
  var requestParamObject = {
    action: 'GetNoEndTask',
    akId: param.akId,
    biCode: param.biCode || '',
    biSame: param.biSame || '',
    bizzType: param.bizzType || '',
    condition: param.condition || '',
    id: param.id || '',
    isStagView: param.isStagView,
    node: param.node || 'root',
    order: '',
    page: param.pageNum || 1,
    rows: param.pageSize || 20,
    sort: param.sort,
    taskType: ''
  }
  return OldSystemGet('/Api/Task.ashx', requestParamObject)
}
// 拟稿部门和文号信息
export function getNgbmAndWhxx() {
  const params = {
    action: 'GetPublishOrgWithDocNoInfo',
    type: 3
  }
  return OldSystemGet('/Api/PublishDocument.ashx', params)
}
// 取回列表
export function getQuhuiList(pageNum) {
  const params = {
    action: 'GetBackTaskList',
    order: 'desc',
    page: pageNum,
    rows: 10,
    sort: '发送时间',
    strSQL: ''
  }
  return OldSystemGet('/Api/Task.ashx', params)
}
// 修改用户信息
export function updatePersonSettingApi(param) {
  return request({
    method: 'post',
    url: baseURL + '/baseapi/user/uodateUser',
    data: {
      account: param.account,
      email: param.email,
      name: param.userName,
      phone: param.phone,
      qq: param.qqnumber,
      remark: param.remark,
      gender: param.sex,
      userId: param.userId
    }
  })
}
// 修改用户密码
export function updatePersonPasswordApi(param) {
  const params = {
    userId: param.userId,
    newPassword: param.newpassword,
    oldPassword: param.oldpassword
  }
  return request({
    method: 'post',
    url: baseURL + '/baseapi/user/changePassword',
    data: params
  })
}

// 取回操作
export function quHuiOperate(row) {
  const params = {
    action: 'GetGetBackTask',
    strBiCode: row.BiCode,
    intAkId: row.AkId
  }
  return OldSystemGet('/Api/Task.ashx', params)
}

// 获取所有application
export function getAllApplication() {
  // const params = {
  //   action: 'GetUserIndexMenu'
  // }
  // return OldSystemGet('/Api/Resources.ashx', params)
  return request({
    method: 'get',
    url: homeURL + '/widget/getUserIndexMenu'
  })
}

// 获取application
export function getApplicationApi() {
  return request({
    method: 'get',
    url: baseURL + '/indexDB/icon/'
  })
}
// 获取个人信息
export function getPersonInfoApi(userId) {
  return request({
    method: 'get',
    url: baseURL + '/baseapi/user/userInfo?userId=' + userId
  })
}

// 保存application设置
export function saveAppSettingApi(saveData) {
  return request({
    method: 'post',
    url: baseURL + '/indexDB/func/addNormalFun',
    data: saveData
  })
}

// 意见反馈
export function getYjfk(param) {
  const params = {
    bTime: param.bTime,
    eTime: param.eTime,
    replyCount: param.ReplyCount,
    type: param.type,
    current: param.pageNum || 1,
    size: param.limit,
    sortType: param.sortType || '',
    sortField: param.sortField || ''
  }
  return request({
    method: 'post',
    // url: 'http://23.36.71.228:8025' + '/opinion/getOpinion',
    url: baseURL + '/indexDB/opinion/getOpinion',
    params
  })
}
// 通知查询
export function searchTzApi(params) {
  return OldSystemGet('/Api/PublishDocument.ashx', params)
}

// 任务发送下个环节
export function taskSendNextStep(akId, biCode, opinion) {
  const params = {
    action: 'SendNextStep',
    AkId: akId,
    BiCode: biCode,
    Opinion: opinion || ''
  }
  return OldSystemGet('/Api/Task.ashx', params)
}

// 老平台 配置项数据
export function getResources() {
  return OldSystemGet('/Api/Resources.ashx', { action: 'GetListWidget' })
}

// 保存用户的主页拖拽配置
export function bindWidgetList(data) {
  return request({
    method: 'post',
    url: baseURL + '/indexDB/widget/bindWidgetList',
    data
  })
}

// 获得用户的主页拖拽配置
export function getTheWidgetList() {
  return request({
    method: 'get',
    url: baseURL + '/indexDB/widget/getWidgetList'
  })
}
// 通知标题
export function tableTile(classType, requestType) {
  const params = {
    request: classType,
    type: requestType
  }
  return request({
    method: 'post',
    url: baseURL + '/indexDB/title/getTitle',
    params
  })
}

// 问答
export function question(key, category) {
  var searchObj = {
    Server: '小信聚合检索',
    PageIndex: 1,
    pageSize: 10,
    DataLength: 150,
    IsHighlighter: true,
    Occur: 'MUST',
    Mode: '强分词',
    Like: {
      Content: key
    },
    Filter: [
      {
        Field: 'Tag1',
        Start: category,
        End: category
      }]
  }
  return axios({
    method: 'get',
    url: window.config.SearchApi + '/Api/Search.ashx?action=Search',
    params: { s: JSON.stringify(searchObj), uid: localStorage.uid, uname: localStorage.uname }
  })
}
// 配置模板-获取模板
export function getconfigList() {
  return request({
    method: 'get',
    url: baseURL + '/indexDB/template/getTemplate'
  })
}
// 配置模板-添加模板
export function addTemplate(data) {
  return request({
    method: 'post',
    url: baseURL + '/indexDB/template/addTemplate',
    data
  })
}
// 配置模板-修改模板
export function editTemplate(data) {
  return request({
    method: 'post',
    url: baseURL + '/indexDB/template/editTemplate',
    data
  })
}// 删除模板
export function deleteTemplate(rlKey) {
  const params = {
    rlKey: rlKey
  }
  return request({
    method: 'delete',
    url: baseURL + '/indexDB/template/delTemplate',
    params
  })
}
// 配置模板-获取模板
export function getTemplateResources(rlKey) {
  const params = {
    rlKey: rlKey
  }
  return request({
    method: 'get',
    url: baseURL + '/indexDB/template/getTemplateResources',
    params
  })
}

// 首页获取用户引导状态
// export function getUserGuideState(userId) {
//   const params = {
//     userId: userId
//   }
//   return request({
//     method: 'get',
//     url: baseURL + '/indexladb/guide/getData',
//     params
//   })
// }

// 首页改变用户引导状态
export function editUserGuideState(userId) {
  const params = {
    userId: userId
  }
  return request({
    method: 'get',
    url: homeURL + '/guide/saveOrUpdate',
    params
  })
}
// 获取用户guide
export function getGuide(userId, address) {
  const params = {
    userId: userId,
    address: address
  }
  return request({
    method: 'get',
    url: homeURL + '/guide/getData',
    params
  })
}
// 获取首页配置
export function getConfig(guideId) {
  const params = {
    guideId: guideId
  }
  return request({
    method: 'get',
    url: homeURL + '/guide/getConfig',
    params
  })
}
// 首页改变用户引导状态
export function editGuide(address, userId) {
  const params = {
    address: address,
    userId: userId
  }
  return request({
    method: 'get',
    url: homeURL + '/guide/saveOrUpdate',
    params
  })
}

export function getPopUpNotice() {
  const params = {
    ticket: localStorage.ticket,
    uip: localStorage.ip,
    action: 'GetCurrentUserLastUnReadNotice',
    types: '3,8,55'
  }
  const ulr = window.config.NetMicroService + '/Notice.ashx'
  return axios({
    method: 'get',
    url: ulr,
    params
  })
}

export function markPopUpNotice() {
  const params = {
    ticket: localStorage.ticket,
    uip: localStorage.ip,
    action: 'MarkUnReadNotice',
    ids: ''
  }
  const ulr = window.config.NetMicroService + '/Notice.ashx'
  return axios({
    method: 'post',
    url: ulr,
    params
  })
}
