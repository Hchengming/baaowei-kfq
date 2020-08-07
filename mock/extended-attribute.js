const attrs = [
  {
    Label: '兼容属性',
    Name: 'field1',
    Comm: 'SelectList',
    Data: {
      op1: 'v1',
      op2: 'v2',
      op3: 'v3'
    },
    Active: ''
  },
  {
    Label: '区域简称',
    Name: 'field2',
    Comm: 'Text',
    Data: {}
  },
  {
    Label: '测试',
    Name: 'field3',
    Comm: 'Text',
    Data: {},
    Active: ''
  },
  {
    Label: '法人单位字号',
    Name: 'field4',
    Comm: 'TextArea',
    Data: {},
    Active: ''
  },
  {
    Label: '法人单位电话',
    Name: 'field5',
    Comm: 'Text',
    Data: {},
    Active: ''
  }
]

export default [
  {
    url: '/extended_attribute/detail',
    type: 'get',
    response: config => {
      // const { id } = config.query
      return {
        code: 20000,
        data: attrs
      }
    }
  },

  {
    url: '/extended_attribute/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
