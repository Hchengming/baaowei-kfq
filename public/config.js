// 是否是vpn访问
var IsVPN = window.location.hostname.search('10.0.0.') > -1
const BaseApi = 'http://23.36.123.128/api'
// 文件上传API
const UploadApi = 'http://23.36.123.128/zuul/api'
window.config = {
  version: '开发测试版',
  // 是否是vpn访问
  IsVPN,
  //分布式文件接口
  FBSFileApi: IsVPN ? 'http://10.0.0.13:9527/TestFBS': 'http://23.36.123.101:9527/TestFBS',
  //基础配置接口
  BaseConfigApi: IsVPN ? 'http://10.0.0.19:8066': 'http://23.36.250.116:8066',
  //老系统地址
  OldSystemApi: IsVPN ? 'http://10.0.0.19:8091': 'http://23.36.120.46:8091',
  //邮件系统地址
  EmailSystemApi: IsVPN ? '': 'http://23.36.250.116:81',
  //会议系统地址
  MeetingSystemApi: IsVPN ? '': 'http://23.36.250.236:801',
  //微服务
  NetMicroService: IsVPN ? '': 'http://23.36.2.160:1334',
  // 显示那些菜单大类
  ShowTopLevMenus: '自然资源调查监测与测绘，自然资源确权登记，自然资源所有者权益，国土空间规划管理，国土空间用途管制，自然资源开发利用，生态修复与耕地保护，自然资源监管，防灾减灾，综合支撑，智能中枢',
  // 基本api
  BaseApi: BaseApi,
  HomeApi: BaseApi + '/indexDB',
  // 基础应用
  BaseApi_Api: BaseApi + '/baseapi',
  // 应用中心Api
  AppApi: BaseApi + '/applicationcenter',
  // 用户api
  UserApi: BaseApi + '/authserver',
  // 重大项目api
  MajorApi: 'http://23.36.75.228:8081',
  // 网关API
  GetWayApi: BaseApi + '/kong',
  // 网关缓存Api
  CacheApi: 'http://47.108.93.198:8001',
  // 流程Api
  FlowApi: 'http://23.36.250.116:8066/BusWorkFlow/Program',
  // 业务Api
  BusinessApi:  'http://23.36.250.116:8066/BusWorkFlow/Program',
  // map api
  MapApi: 'http://23.36.2.131:488',
  // 数据视图
  DataViewApi: BaseApi + '/.DataView',
  // 服务编排
  ServiceApi: BaseApi + '/servicesort',
  // 数据Api
  DataApi: 'http://127.0.0.1:8088',
  DataShareApi: 'http://127.0.0.1:8089',
  DATA_UPLOAD_API: 'http://127.0.0.1:8088',
  DataJsApiBase: 'http://gis01.leechg.com/jsapi/4.15/',
  // 监控中心
  AppMonitor: 'http://23.36.74.221:8889',
  // 共享中心
  ShareApi: BaseApi + '/shareservice/',
  // 村镇管理系统
  VillageInfoApi: 'http://23.36.123.60',
  // 搜索服务
  SearchApi: 'http://23.36.250.116:8030',
  // 模板配置
  ConfigurstionApi: 'http://23.36.71.228:8025',
  // 新增耕地Api
  NewLandApi: 'http://23.36.71.206:8025',
  // 村镇系统
  CunZhenApi: BaseApi + '/cunzhen',
  // 村镇系统(文件上传)
  CunZhenUploadApi: UploadApi + '/cunzhen'
  

}
