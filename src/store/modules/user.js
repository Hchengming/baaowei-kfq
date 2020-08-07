import { userLogin, getInfo } from '@/api/ApiUser'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { asyncRoutes } from 'mock/router'

import store from '@/store'
import { filterAsyncRoutes } from '@/store/modules/permission'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  menu: [],
  roles: [],
  layout: 1,
  drawer: false,
  drawerfeedback: false,
  tel: false,
  layoutwidth: '10px',
  emailurl: '',
  searchurl: '',
  applicationData: [],
  resolution: true,
  // 常用功能
  cygn: [],
  application: [],
  allMenus: [],
  quhui: false
}

const mutations = {
  /**
   * 分辨率
   */
  SET_RESOLUTION: (state, resolution) => {
    state.resolution = resolution
  },
  /**
   * 分辨率
   */
  SET_CYGN: (state, cygn) => {
    state.cygn = cygn
  },
  SET_APPLICATION: (state, application) => {
    state.application = application
  },
  /**
   * 一张图地址
   */
  SET_YZTURL: (state, yzturl) => {
    state.yzturl = yzturl
  },
  /* 切换意见反馈显示*/
  SET_DRAWERFEEDBACK: (state, drawerfeedback) => {
    state.drawerfeedback = drawerfeedback
  },
  /* 切换通讯录显示*/
  SET_TEL: (state, tel) => {
    state.tel = tel
  },
  /* 切换取回显示*/
  SET_QUHUI: (state, quhui) => {
    state.quhui = quhui
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password, ticket } = userInfo
    return new Promise((resolve, reject) => {
      userLogin({ account: (account || '').trim(), password: password, ticket: ticket }).then(response => {
        const { data } = response
        setToken(data.token)

        localStorage.ticket = data.ticket
        localStorage.ip = data.ip
        localStorage.uid = data.userId
        localStorage.uname = data.urName

        // TODO:为了登录跳转暂时固定写死
        let roles = ['editor']
        if (data.isAdmin === 1) {
          roles = ['admin']
        }

        data.roles = roles
        localStorage.userInfo = JSON.stringify(data)
        localStorage.menu = JSON.stringify(filterAsyncRoutes(asyncRoutes, roles))
        commit('SET_TOKEN', data.token)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败,请重新登录.')
        }

        const { roles, name, avatar, introduction, menu } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('角色信息缺失,请重新登录!')
        }

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_MENU', menu)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出
  // eslint-disable-next-line no-unused-vars
  logout({ commit, state, dispatch }) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      // TODO:不需要调用登录接口
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')

      resetRouter()

      localStorage.clear()

      removeToken()

      // 重置角色
      store.dispatch('permission/setRoles', '')

      // 重置访问过的标签
      store.dispatch('tagsView/delAllViews', null, { root: true })

      // 删除所有Iframe
      store.dispatch('Iframe/delAllIframe')

      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // 移除TOKEN
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      localStorage.clear()
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 动态修改权限
  changeRoles({
    commit,
    dispatch
  }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)

      setToken(token)
      const {
        roles
      } = await dispatch('getInfo')

      resetRouter()

      // 根据角色生成路由
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // 动态添加可访问路由
      router.addRoutes(accessRoutes)

      // 重置访问过的标签
      dispatch('tagsView/delAllViews', null, {
        root: true
      })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
