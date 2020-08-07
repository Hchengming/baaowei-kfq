import Mock from 'mockjs'
import { data1, a, b, p } from './data/index.js'

const List = []
const count = 200
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'ROLEID': '@increment',
    'ROLENAME': '@ctitle(5,10)',
    'ROLEREMARK': '@ctitle(10,30)',
    'RLORDER': '0'
  }))
}

export default [
// Load FlowXML
  {
    url: '/api/bai/_loadFlowXML.aspx',
    type: 'get',
    response: config => {
      const { readtype } = config.query
      var data = data1
      if (readtype === 'flowproperty') {
        data = p
      }
      if (readtype === 'arrowproperty') {
        data = a
      }
      if (readtype === 'tacheproperty') {
        data = b
      }
      return {
        code: 20000,
        data: data
      }
    }
  },

  // Load FlowXML
  {
    url: '/api/bai/_saveFlowXML.aspx',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // Load BzFormInfo
  {
    url: '/NModules/API/WebAPI.ashx',
    type: 'get',
    response: config => {
      const info = {
        BoxFcDocnocode: [
          {
            id: ' 储备项目策划生成业务流水号',
            name: ' 储备项目策划生成业务流水号'
          },
          {
            id: '（停用）基础测绘成果文号',
            name: '（停用）基础测绘成果文号'
          },
          {
            id: 'bug管理项目编号',
            name: 'bug管理项目编号'
          },
          {
            id: 'bug管理项目流水号',
            name: 'bug管理项目流水号'
          },
          {
            id: '巴南车辆管理编号',
            name: '巴南车辆管理编号'
          },
          {
            id: '巴南合同管理编号',
            name: '巴南合同管理编号'
          },
          {
            id: '巴南考察及培训管理编号',
            name: '巴南考察及培训管理编号'
          },
          {
            id: '编制资质通用函复',
            name: '编制资质通用函复'
          }
        ],
        BoxSingleInst: [
          {
            id: '1',
            name: '是'
          },
          {
            id: '0',
            name: '否'
          }
        ],
        BoxFromType: [
          {
            id: '1',
            name: '基础表单类型'
          },
          {
            id: '2',
            name: 'OleContainer 公文表单'
          },
          {
            id: '3',
            name: 'CADContainer GIS表单'
          },
          {
            id: '4',
            name: 'MapContainer CAD表单'
          },
          {
            id: '5',
            name: 'DOTNAT外部扩充表单'
          }
        ],
        msg: '',
        status: 'ok',
        rows: [
          {
            'EncryptBizz': 'BFEC21563D7788F8',
            'BfBizz': '100015',
            'isNew': 'false',
            'BfExtendwindow': '1',
            'BfName': '市政项目规划审查复函',
            'BfCode': '高新区局_市政项目规划审查复函',
            'FcRemark': '',
            'BfStyle': '1',
            'BfSingleinst': '0',
            'BfId': '100750',
            'BfOrder': '0',
            'FcDocnocode': '建设项目工程审查复函',
            'FcDocnofield': '文书编号',
            'FcDocnoparam': '',
            'BfParams': '',
            'BfJsscript': '',
            'Expressions': []
          }
        ]
      }
      return {
        code: 20000,
        data: info
      }
    }
  },

  // Save BzFormInfo
  {
    url: '/NModules/API/WebAPI.ashx',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // Load BzStateInfo
  {
    url: '/NModules/API/WebAPI.ashx',
    type: 'get',
    response: config => {
      const info = {
        'status': 'ok',
        'rows': [
          {
            'ParId': '76A457BC2296B0A1',
            'Id': 'A1AE68A9207B589F05C36283D320DD08',
            'isNew': 'false',
            'BsCode': '高新区局_窗口登记',
            'BsName': '窗口登记状态',
            'BsRemark': '',
            'BsId': '252',
            'BsOrder': '6000',
            'BsBizz': '100017'
          }
        ]
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // Save BzStateInfo
  {
    url: '/NModules/API/WebAPI.ashx',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // Load BzSheetInfo
  {
    url: '/NModules/API/WebAPI.ashx',
    type: 'get',
    response: config => {
      const info = {
        'BoxFormView': [
          {
            'id': '视图 1',
            'name': '视图 1'
          },
          {
            'id': '打印版本 规划申请不予受理复函',
            'name': '打印版本 规划申请不予受理复函'
          },
          {
            'id': '打印版本 规划申请不予受理复函_存根',
            'name': '打印版本 规划申请不予受理复函_存根'
          }
        ],
        'BoxBelongingForm': [
          {
            'id': '1',
            'name': '建设项目报建登记表'
          },
          {
            'id': '3',
            'name': '规划申请受理复函'
          },
          {
            'id': '4',
            'name': '规划申请不予受理复函'
          },
          {
            'id': '5',
            'name': '规划许可办理计时通知no'
          },
          {
            'id': '6',
            'name': '竣工验收复函no'
          },
          {
            'id': '8',
            'name': '报件材料回执单'
          },
          {
            'id': '146',
            'name': '建筑规划管理建设项目会审表_删除'
          },
          {
            'id': '147',
            'name': '建筑规划管理建设项目会审表(删除)'
          },
          {
            'id': '148',
            'name': '建筑规划管理建设项目会审表_上市局'
          },
          {
            'id': '149',
            'name': '建筑规划管理建设项目会审表_分局会'
          },
          {
            'id': '150',
            'name': '建设项目规划管理报建审查复函'
          },
          {
            'id': '151',
            'name': '建筑规划管理建设项目会审表'
          },
          {
            'id': '767',
            'name': '通用复函'
          }
        ],
        'BoxFromType': [
          {
            'id': '1',
            'name': 'MSReport报表类型'
          },
          {
            'id': '2',
            'name': 'InfoPath 报表'
          },
          {
            'id': '3',
            'name': '自定义报表类型'
          }
        ],
        'msg': '',
        'status': 'ok',
        'rows': [
          {
            'isNew': 'false',
            'ParId': '2',
            'EncryptParId': '6D4D5607E2333F3F',
            'RsName': '规划申请不予受理复函（存档）',
            'RsCode': '规划申请不予受理复函（存档）.',
            'RsStyle': '2',
            'RcTable': 'View_行政机构;Tb_规划申请不予受理复函_myFields',
            'RcOrder': '',
            'RsBzform': '4',
            'RsId': '9',
            'numRsOrder': '',
            'RcSql': ';select *,dbo.GetChineseDate(签发日期) as 签发日期中文 from Tb_规划申请不予受理复函_myFields where bi_code=@bi_code',
            'RcRemark': '',
            'RcShow': '是',
            'RcView': '打印版本 规划申请不予受理复函_存根'
          }
        ]
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // Load RelatedRoles
  {
    url: '/NModules/API/WebAPI.ashx',
    type: 'get',
    response: config => {
      const info = {
        'total': 1,
        'page': 1,
        'rows': List.filter((item, index) => index < 5 * 1 && index >= 5 * (1 - 1))
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // Load AllRoles
  {
    url: '/NModules/API/WebAPI.ashx',
    type: 'get',
    response: config => {
      const { keyword, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (keyword && item.ROLENAME.indexOf(keyword) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      const info = {
        total: mockList.length,
        items: pageList
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // Save BzSheetInfo
  {
    url: '/NModules/API/WebAPI.ashx',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
