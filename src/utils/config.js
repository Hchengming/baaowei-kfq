// 是否是vpn访问
export const IsVPN = window.config.IsVPN

// TODO:以下地址待完善,需全部加入配置文件

// 分布式文件接口
export const FBSFileApi = window.config.FBSFileApi

// 基础配置接口
export const BaseConfigApi = window.config.BaseConfigApi
// 老系统地址
export const OldSystemApi = window.config.OldSystemApi
// 邮件系统地址
export const EmailSystemApi = window.config.EmailSystemApi
// 会议系统地址
export const MeetingSystemApi = window.config.MeetingSystemApi

// 获取基础配置页面访问地址
export function getBaseConfigUrlBy(pathAndQuery) {
  const ticket = localStorage.ticket || '{ticket}'
  return BaseConfigApi + `/login.xip?LoginMethod=ssologin&Ticket=${ticket}&ReturnUrl=` + encodeURIComponent(pathAndQuery)
}
// 获取老平台访问地址
export function getOldSystemUrlBy(pathAndQuery) {
  const ticket = localStorage.ticket || '{ticket}'
  return OldSystemApi + `/login.xip?LoginMethod=ssologin&Ticket=${ticket}&UserIP=${localStorage.ip}&ReturnUrl=` + encodeURIComponent(pathAndQuery)
}
