import Mock from 'mockjs'

const TitleData = []
const SubTitleData = [[], []]
const PrincipalList = []
const SubTitleAll = []

const Title = [
  { id: 'fileName', label: '文件名称' },
  { id: 'department', label: '管理部门' },
  { id: 'fileUserId', label: '负责人' },
  { id: 'fileAbbreviation', label: '文件说明' },
  { id: 'fileDate', label: '录入日期' },
  { id: 'sxzs', label: '事项总数' },
  { id: 'zbsx', label: '在办事项' },
  { id: 'bjsx', label: '办结事项' },
  { id: 'cqsx', label: '超期事项' },
  { id: 'jybjsx', label: '建议办结事项' }
]

for (let i = 0; i < 5; i++) {
  const item = Mock.mock({
    fileId: '@guid',
    fileName: '@ctitle(10)',
    department: '@ctitle(6)',
    fileUserId: '@ctitle(3)',
    fileAbbreviation: '@ctitle(15)',
    fileDate: '@datetime',
    sxzs: '@integer(1,30)',
    zbsx: '@ctitle(10)',
    bjsx: '@ctitle(10)',
    cqsx: '@ctitle(10)',
    jybjsx: '@ctitle(10)',
    'type|1': [1, 2]
  })
  TitleData.push(item)
}

const SubTitle = [
  [
    { id: 'field1', label: '项目名称', type: 0 },
    { id: 'field2', label: '建设起止年限', type: 0 },
    { id: 'field3', label: '建设性质', type: 0 },
    { id: 'field4', label: '用途分类', type: 0 },
    { id: 'field5', label: '主要建设内容及规模', type: 0 },
    { id: 'field6', label: '年度工作目标', type: 0 },
    { id: 'field7', label: '牵头单位', type: 0 },
    { id: 'field8', label: '所在区县', type: 0 },
    { id: 'field9', label: '是否涉及新增建设用地（使用集体土地）', type: 0 },
    { id: 'field10', label: '用地总面积', type: 0 },
    { id: 'field11', label: '新增建设用地面积', type: 1 },
    {
      id: 'field12',
      label: '先行用地面积',
      type: 1,
      children: [
        { id: 'field12_1', label: '是否需要先行用地', type: 1 },
        { id: 'field12_2', label: '先行用地面积', type: 1 },
        { id: 'field12_3', label: '是否取得批复', type: 1 }
      ]
    },
    {
      id: 'field13',
      label: '占用永久基本农田情况',
      type: 1,
      children: [
        { id: 'field13_1', label: '占用面积', type: 1 },
        { id: 'field13_2', label: '是否完成', type: 1 }
      ]
    },
    {
      id: 'field14',
      label: '占用生态红线情况',
      type: 1,
      children: [
        { id: 'field14_1', label: '占用面积', type: 1 },
        { id: 'field14_2', label: '是否论证通过', type: 1 }
      ]
    },
    {
      id: 'field15',
      label: '占用自然保护区情况',
      type: 1,
      children: [
        { id: 'field15_1', label: '占用面积', type: 1 },
        { id: 'field15_2', label: '是否取得同意意见', type: 1 }
      ]
    },
    {
      id: 'field16',
      label: '占用林地情况',
      type: 1,
      children: [
        { id: 'field16_1', label: '占用面积', type: 1 },
        { id: 'field16_2', label: '是否取得林地手续', type: 1 }
      ]
    },
    { id: 'field17', label: '是否通过预审（含重新预审）', type: 1 },
    { id: 'field18', label: '是否取得可研批复', type: 1 },
    { id: 'field19', label: '是否取得初设批复', type: 1 },
    { id: 'field20', label: '发布拟征地公告时间（填具体时间或“未发布”）', type: 1 },
    { id: 'field21', label: '区县政府请示用地时间（填具体时间或“未发布”）', type: 1 },
    {
      id: 'field22',
      label: '农用地转用和土地征收市局受理时间（填具体时间或“未受理”）'
    },
    { id: 'field23', label: '未完成会签的处室（填具体处室或“已完成会签”）', type: 1 },
    {
      id: 'field24',
      label: '农用地转用和土地征收批复时间（填具体时间或“未批复”）'
    },
    { id: 'field25', label: '取件时间（填具体时间或“未取件”）', type: 1 },
    { id: 'field26', label: '难点卡点问题', type: 1 },
    { id: 'field27', label: '备注', type: 1 }
  ],
  [
    { id: 'field30', label: '项目名称', type: 0 },
    { id: 'field31', label: '区县', type: 0 },
    { id: 'field32', label: '申报类型（填单选或批次）', type: 0 },
    { id: 'field33', label: '用地面积', type: 0 },
    {
      id: 'field34',
      label: '用途分类面积',
      type: 1,
      children: [
        { id: 'field34_1', label: '商服', type: 1 },
        { id: 'field34_2', label: '住宅', type: 1 },
        { id: 'field34_3', label: '工矿仓储', type: 1 },
        { id: 'field34_4', label: '公共管理与公共服务', type: 1 },
        { id: 'field34_5', label: '公用设施', type: 1 },
        { id: 'field34_6', label: '交通运输', type: 1 },
        { id: 'field34_7', label: '水域及水利设施', type: 1 },
        { id: 'field34_8', label: '特殊用地', type: 1 },
        { id: 'field34_9', label: '其他', type: 1 }
      ]
    },
    { id: 'field35', label: '拟征地公告时间（填具体时间或“未请示”)', type: 1 },
    { id: 'field36', label: '区县请示时间', type: 1 },
    { id: 'field37', label: '农用地转用和土地征收市局受理时间（填具体时间或“未受理”）', type: 1 },
    { id: 'field38', label: '未完成会签得处室（填具体处室或“已完成会签”）', type: 1 },
    { id: 'field39', label: '农用地转用和土地征收批复时间（填具体时间或“未批复”）', type: 1 },
    { id: 'field40', label: '取件时间（填具体时间或“未取件”）', type: 1 }
  ]
]

for (let i = 0; i < 2; i++) {
  const item = Mock.mock({
    id: '@guid',
    field1: '@ctitle(10)',
    field2: '@date("yyyy-MM-dd")',
    field3: '@ctitle(6)',
    field4: '@ctitle(6)',
    field5: '@ctitle(6)',
    field6: '@ctitle(6)',
    field7: '@ctitle(6)',
    field8: '@ctitle(6)',
    'field9|1': ['是', '否'],
    field10: '@integer(60, 100)',
    field11: '@integer(60, 100)',
    field12: '@ctitle(6)',
    field12_2: '@integer(60, 100)',
    'field12_3|1': ['是', '否'],
    'field12_1|1': ['是', '否'],
    field13: '@ctitle(6)',
    field13_1: '@integer(60, 100)',
    'field13_2|1': ['是', '否'],
    field14: '@ctitle(6)',
    'field14_1|1': ['是', '否'],
    field14_2: '@integer(60, 100)',
    field15: '@ctitle(6)',
    'field15_2|1': ['是', '否'],
    field15_1: '@integer(60, 100)',
    field16: '@ctitle(6)',
    'field16_2|1': ['是', '否'],
    field16_1: '@integer(60, 100)',
    'field17|1': ['是', '否'],
    'field18|1': ['是', '否'],
    'field19|1': ['是', '否'],
    'field20|1': ['@datetime', '未发布'],
    'field21|1': ['@datetime', '未发布'],
    'field22|1': ['@datetime', '未受理'],
    'field23|1': ['@datetime', '未批复'],
    'field24|1': ['@ctitle(6)', '已完成会签'],
    'field25|1': ['@datetime', '未取件'],
    field26: '@ctitle(6)',
    field27: '@ctitle(6)'
  })
  const item2 = Mock.mock({
    id: '@guid',
    field30: '@ctitle(10)',
    field31: '@ctitle(6)',
    field32: '@ctitle(6)',
    field33: '@integer(60, 100)',
    field34: '@ctitle(6)',
    field34_1: '@ctitle(6)',
    field34_2: '@ctitle(6)',
    field34_3: '@ctitle(6)',
    field34_4: '@ctitle(6)',
    field34_5: '@ctitle(6)',
    field34_6: '@ctitle(6)',
    field34_7: '@ctitle(6)',
    'field34_8|1': ['是', '否'],
    field34_9: '@ctitle(6)',
    'field35|1': ['@datetime', '未请示'],
    field36: '@datetime',
    'field37|1': ['@datetime', '未受理'],
    'field38|1': ['@ctitle(6)', '已完成会签'],
    'field39|1': ['@datetime', '未批复'],
    'field40|1': ['@datetime', '未取件']
  })
  SubTitleData[0].push(item)
  SubTitleData[1].push(item2)
}

for (let i = 0; i < 20; i++) {
  const item = Mock.mock({
    id: '@increment',
    name: '@cname'
  })
  PrincipalList.push(item)
}

for (let i = 0; i < 20; i++) {
  const item = Mock.mock({
    titleId: '@guid',
    titleName: '@ctitle(5)'
  })
  SubTitleAll.push(item)
}

export default [
  {
    url: '/majorProject/title',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: Title
      }
    }
  },

  {
    url: '/v1/file/selectFile',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: TitleData
      }
    }
  },

  {
    url: '/v1/file/selectTitles',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: SubTitle[0]
      }
    }
  },

  {
    url: '/v1/fileObject/selectFileObject',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: SubTitleData[0]
      }
    }
  },

  {
    url: '/majorProject/find',
    type: 'get',
    response: (config) => {
      const { id } = config.query

      for (const item of TitleData) {
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
    url: '/v1/file/insertFile',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/majorProject/update',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/majorProject/delete',
    type: 'delete',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/principal/list',
    type: 'get',
    response: (_) => {
      return {
        code: 20000,
        data: PrincipalList
      }
    }
  },

  {
    url: '/v1/config/selectTitle',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: SubTitleAll
      }
    }
  },

  {
    url: '/v1/config/insertTitle',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/v1/config/deleteTitle',
    type: 'post',
    response: (_) => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
