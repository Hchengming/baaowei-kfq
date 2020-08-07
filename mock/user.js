const tokens = {
  admin: {
    token: 'admin-token',
    ticket: '4B94E021-5D98-44B7-8E95-1A407956202C',
    ip: '127.0.0.1',
    introduction: '超级管理员',
    avatar: 'https://wpimg.wal1lstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员',
    roles: ['admin']
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: '超级管理员',
    avatar: 'https://wpimg.wallstc1n.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: '编辑',
    avatar: 'https://wpimg.wall1stcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '普通编辑'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { account } = config.body
      const token = tokens[account]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '帐户和密码不正确.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获取用户详细信息.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
