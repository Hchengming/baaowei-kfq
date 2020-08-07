import Mock from 'mockjs'

const List = []
const Pages = []
const Roles = []
const Auths = {
  pageList: [],
  funcList: [],
  func99List: [],
  serviceList: [],
  bizzList: [],
  mapList: [48767, 48804, 48905, 49926]
}
const Features = []
const ServiceInterface = []
const Workflow = []
const Form = []
const Business = []
const Status = []
const Activity = []
const Report = []
const Messages = []
const DataView = []
const count = 20

// 应用信息
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    apeKey: '@guid',
    apName: '@ctitle(18)',
    apTDKey: '123456',
    apCode: '@integer(5)',
    apOrder: '@integer(2)',
    apDiscription: '@ctitle(100)',
    'apState|1': [0, 1],
    'apOGKey|1': [2, 1]
  }))
}

// 页面
for (let i = 0; i < count; i++) {
  const item = Mock.mock({
    apeKey: '@guid',
    apeCode: '@string(3)',
    apeIsPermissionCtrl: 1,
    apeName: '@ctitle(5)', // 页面名称
    apeOrder: '@integer(1,3)',
    apeState: 0,
    apeType: 1,
    apepDiscription: '@ctitle(50)',
    apepOpenMode: 0,
    // apepOrder: 0,
    apepParm: '',
    apepResolutino: '@integer(1,4)',
    apepTitle: '@ctitle(10)',
    apepType: 0,
    apepUrl: '@url',
    apepthumbnail: '@img("420x270")',
    apepClient: '1,2,3'
  })
  Pages.push(item)
  if (i % 3 === 0) {
    Auths.pageList.push(item.apeKey)
  }
}

// 角色
for (let i = 0; i < count; i++) {
  Roles.push(Mock.mock({
    rlId: '@increment',
    rlName: '@ctitle(5)', // 角色名称
    rlRemark: '@ctitle(20)', // 备注
    'rlCategoryid|1': [1, 2, 3],
    'rlIsSystemDefault|1': [1, 2, 3]
  }))
}

// 功能
for (let i = 0; i < count; i++) {
  const item = Mock.mock({
    apeName: '@ctitle(10)',
    apeKey: '@guid', // 主键
    apeAPKey: '@guid', // 从属元素主键
    apefDiscription: '@ctitle(20)', // 描述
    'apefType|1': [0, 1], // 类型
    apefScript: '@string(100)', // 脚本
    apefRemark: '@ctitle(100)', // 备注
    apeOrder: '@integer(1, 3)', // 序号
    apeType: 2, // 修改人
    apeCode: '@string(3)',
    apeCreateDateTime: '@datetime'
  })
  Features.push(item)
  if (i % 4 === 0) {
    Auths.funcList.push(item.apeKey)
  }
  if (i % 2 === 0) {
    Auths.func99List.push(item.apeKey)
  }
}

// 服务接口
for (let i = 0; i < count; i++) {
  const item = Mock.mock({
    apeKey: '@guid', // 主键
    apeAPKey: '@guid',
    apeCode: '@string("lower", 3)',
    apeName: '@ctitle(8)', // 从属元素主键
    apesDiscription: '@ctitle(20)', // 描述
    'apesRequestMode|1': ['GET', 'PUT', 'DELETE', 'POST'], // 请求方式
    apesUrl: '@url',
    apesRequestPath: '@url',
    apesParm: { p1: ['v1'], p2: ['v2'] }, //
    apeOrder: '@integer(1,3)',
    apeCreateUserKey: '@cname', // 修改人
    apeCreateDateTime: '@datetime', // 修改时间
    apeIsPermissionCtrl: 1,
    'apeState|1': [0, 1],
    apesRequestModel: '请求示例',
    apesResponseModel: '响应示例',
    parm: ['k1', 'k2', 'k3', 'k4']
  })
  ServiceInterface.push(item)
  if (i % 4 === 0) {
    Auths.serviceList.push(item.apeKey)
  }
}

// 消息
for (let i = 0; i < count; i++) {
  const item = Mock.mock({
    id: '@guid',
    title: '@ctitle(8)',
    'type|1': [1, 2],
    body: [
      { keywordValue: '标题', keyword: 'keyword1', keywordExample: '你好，你已刷卡成功', del: false },
      { keywordValue: '银行卡号', keyword: 'keyword2', keywordExample: '尾号0449', del: true },
      { keywordValue: '消费金额', keyword: 'keyword3', keywordExample: '220元', del: true },
      { keywordValue: '时间', keyword: 'keyword4', keywordExample: '@datetime', del: true }
    ]
  })
  Messages.push(item)
}

// 数据视图
for (let i = 0; i < count; i++) {
  const item = Mock.mock({
    id: '@guid',
    viewName: '@ctitle(8)',
    viewDescribe: '@ctitle(20)',
    viewSql: '@string(30)'
  })
  DataView.push(item)
}

// 工作流
for (let i = 0; i < count; i++) {
  Workflow.push(Mock.mock({
    id: '@increment',
    workName: '@ctitle(10)',
    wfOrder: '@integer(100,300)',
    discription: '@ctitle(20)',
    operation: '@ctitle(3)',
    updateDate: '@datetime'
  }))
}

// 表单
for (let i = 0; i < count; i++) {
  Form.push(Mock.mock({
    id: '@increment',
    fromName: '@ctitle(10)',
    bfOrder: '@integer(100,300)',
    discription: '@ctitle(20)',
    operation: '@ctitle(3)',
    updateDate: '@datetime'
  }))
}

// 状态
for (let i = 0; i < count; i++) {
  Status.push(Mock.mock({
    id: '@increment',
    stateName: '@ctitle(10)',
    bsOrder: '@integer(100,300)',
    discription: '@ctitle(20)',
    operation: '@ctitle(3)',
    updateDate: '@datetime',
    stateCode: '@string("lower", 3)'
  }))
}

// 打印报表
for (let i = 0; i < count; i++) {
  Report.push(Mock.mock({
    id: '@increment',
    outFormName: '@ctitle(10)',
    rsOrder: '@integer(100,300)',
    discription: '@ctitle(20)',
    operation: '@ctitle(3)',
    updateDate: '@datetime'
  }))
}

// 业务
for (let i = 0; i < count; i++) {
  const item = Mock.mock({
    bzID: '@increment',
    bzName: '@ctitle(10)',
    shortName: '@ctitle(3)',
    remark: '@ctitle(20)',
    bzCode: '@string(3)',
    bzSameCounter: '',
    bzGraphicalConfiguration: '@string(10)'
  })
  Business.push(item)
  if (i % 6 === 0) {
    Auths.bizzList.push(item.bzID)
  }
}

// 树结构
const nodes = [{
  id: 'app-1',
  label: '监管决策',
  icon: 'el-icon-menu',
  children: [{
    id: 'app-1-1',
    label: '违建清理',
    icon: 'el-icon-delete'
  }, {
    id: 'app-1-2',
    label: '地票专项清理核查',
    icon: 'el-icon-circle-check'
  }]
}, {
  id: 'app-2',
  label: '自然资源',
  icon: 'el-icon-menu'
}]

const nodesAuth = [
  'app-1-1-应用-读写',
  'app-1-1-应用-服务接口-读写',
  'app-1-1-应用-服务接口-只读',
  'app-1-1-应用-地图服务-读写',
  'app-1-1-应用-地图服务-只读',
  'app-1-1-应用-功能-读写',
  'app-1-1-应用-功能-只读',
  'app-1-1-应用-计数器-读写',
  'app-1-1-应用-计数器-只读',
  'app-1-1-应用-角色-读写',
  'app-1-1-应用-角色-只读',
  'app-1-1-应用-授权组织-读写',
  'app-1-1-应用-授权组织-只读',
  'app-1-1-应用-业务-读写',
  'app-1-1-应用-业务-只读',
  'app-1-1-应用-页面-读写',
  'app-1-1-应用-页面-只读',
  'app-1-1-应用-只读',
  'app-1-2-应用-只读',
  // 'app-2-应用-读写',
  // 'app-2-应用-服务接口-读写',
  'app-2-应用-服务接口-只读',
  // 'app-2-应用-地图服务-读写',
  'app-2-应用-地图服务-只读',
  // 'app-2-应用-功能-读写',
  'app-2-应用-功能-只读',
  // 'app-2-应用-计数器-读写',
  'app-2-应用-计数器-只读',
  // 'app-2-应用-角色-读写',
  'app-2-应用-角色-只读',
  // 'app-2-应用-授权组织-读写',
  'app-2-应用-授权组织-只读',
  // 'app-2-应用-业务-读写',
  'app-2-应用-业务-只读',
  // 'app-2-应用-页面-读写',
  'app-2-应用-页面-只读',
  'app-2-应用-只读'
]

const businessNodes = [{
  id: 381,
  label: '探矿权',
  ver: 1
}, {
  id: 382,
  label: '采矿权',
  ver: 1
}]

export default [
  // tree menu
  {
    url: '/app/getAppMenuList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: nodes
      }
    }
  },

  {
    url: '/app/getAppMenuNodeList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: nodesAuth
      }
    }
  },

  {
    url: '/app/save',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'app-2'
      }
    }
  },

  {
    url: '/app/updateSysApp',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/page/query',
    type: 'get',
    response: config => {
      const { apekey } = config.query
      const apepFunctions = []
      Features.forEach((item, index) => {
        if (index % 3 === 0) {
          apepFunctions.push(item.apeKey)
        }
      })
      for (const item of Pages) {
        if (item.apeKey.indexOf(apekey) > -1) {
          item.apepFunctions = apepFunctions
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },

  {
    url: '/page/findAll',
    type: 'get',
    response: config => {
      const { current = 1, size = 20 } = config.query

      const res = Pages.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          list: res,
          total: Pages.length
        }
      }
    }
  },

  {
    url: '/page/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/page/save',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'page-' + Date.parse(new Date())
      }
    }
  },

  {
    url: '/busRole/findAll',
    type: 'get',
    response: config => {
      const { current = 1, size = 20 } = config.query

      const res = Roles.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          list: res,
          total: Roles.length
        }
      }
    }
  },

  {
    url: '/busRole/save',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/busRole/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/busRole/findAuthorize',
    type: 'post',
    response: config => {
      // const { roleId, appId } = config.query
      return {
        code: 20000,
        data: Auths
      }
    }
  },

  {
    url: '/busRole/findRoleById',
    type: 'get',
    response: config => {
      const { rlId } = config.query
      for (const item of Roles) {
        if (item.rlId === +rlId) {
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },

  {
    url: '/function/findAll',
    type: 'get',
    response: config => {
      const { current = 1, size = 20 } = config.query

      const res = Features.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          list: res,
          total: Features.length
        }
      }
    }
  },

  {
    url: '/function/save',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'features-' + Date.parse(new Date())
      }
    }
  },

  {
    url: '/function/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/function/query',
    type: 'get',
    response: config => {
      const { apeKey } = config.query
      for (const item of Features) {
        if (item.apeKey.indexOf(apeKey) > -1) {
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },

  {
    url: '/service/queryList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: ServiceInterface
      }
    }
  },

  {
    url: '/service/save',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/service/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/service/query',
    type: 'post',
    response: config => {
      const { apeKey } = config.query
      for (const item of ServiceInterface) {
        if (item.apeKey.indexOf(apeKey) > -1) {
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },

  {
    url: '/appmanage/workflow/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Workflow
      }
    }
  },

  {
    url: '/appmanage/form/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Form
      }
    }
  },

  {
    url: '/app/findBizList',
    type: 'get',
    response: config => {
      const { current = 1, size = 20 } = config.query

      const res = Business.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          list: res,
          total: Business.length
        }
      }
    }
  },

  {
    url: '/app/findBizById',
    type: 'get',
    response: config => {
      const { bzId } = config.query
      for (const item of Business) {
        if (item.bzID === +bzId) {
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },

  {
    url: '/app/saveBiz',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/app/updateBiz',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/appmanage/BusinessStatus/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Status
      }
    }
  },

  {
    url: '/appmanage/BusinessActivity/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Activity
      }
    }
  },

  {
    url: '/appmanage/BusinessReport/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Report
      }
    }
  },

  {
    url: '/app/getBizList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: businessNodes
      }
    }
  },

  {
    url: '/sysOrgApp/selectOrgList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: [{
          ogID: 1,
          label: '市局'
        }, {
          ogID: 2,
          label: '区县'
        }]
      }
    }
  },

  {
    url: '/app/getTypeDetailList',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: [{
          tdKey: '123456',
          tdName: '通用应用'
        }]
      }
    }
  },

  {
    url: '/busbzform/findState',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Status
      }
    }
  },

  {
    url: '/busbzform/findForm',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Form
      }
    }
  },

  {
    url: '/busbzform/findOutForm',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Report
      }
    }
  },

  {
    url: '/busbzform/findWork',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Workflow
      }
    }
  },

  {
    url: '/app/findAppByKey',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: List[Math.floor(Math.random() * List.length)]
      }
    }
  },

  {
    url: '/app/getTemplateAll',
    type: 'get',
    response: config => {
      const { current = 1, size = 20 } = config.query

      const res = Messages.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          list: res,
          total: Messages.length
        }
      }
    }
  },

  {
    url: '/app/addTemplate',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/app/getTemplateById',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const item of Messages) {
        if (item.id.indexOf(id) > -1) {
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  },

  {
    url: '/app/getDataViewByPage',
    type: 'get',
    response: config => {
      const { current = 1, size = 20 } = config.query

      const res = DataView.filter((item, index) => index < size * current && index >= size * (current - 1))

      return {
        code: 20000,
        data: {
          list: res,
          total: DataView.length
        }
      }
    }
  },

  {
    url: '/app/getDataViewById',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const item of DataView) {
        if (item.id.indexOf(id) > -1) {
          return {
            code: 20000,
            data: item
          }
        }
      }
    }
  }
]
