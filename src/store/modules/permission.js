import { asyncRoutes, constantRoutes } from '@/router'
// import Layout from '@/layout'
import { setRoutes } from '@/utils/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  roles: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ROLE: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },

  generatemyRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let myRoutes = null
      let dynamicRoutes = []
      if (localStorage.dynamicRoutes && localStorage.dynamicRoutes.length > 0) {
        dynamicRoutes = JSON.parse(localStorage.dynamicRoutes)
      }
      const menu = JSON.parse(localStorage.menu)
      if (dynamicRoutes.length > 0) {
        myRoutes = setRoutes([...dynamicRoutes, ...menu])
      } else {
        myRoutes = setRoutes(menu)
      }
      const accessedRoutes = filterAsyncRoutes(myRoutes, roles)

      commit('SET_ROUTES', accessedRoutes)
      commit('SET_ROLE', roles)

      resolve(accessedRoutes)
    }, reject => {
      console.log('reject:', reject)
    })
  },

  setRoles({ commit }, roles) {
    return new Promise(resolve => {
      commit('SET_ROLE', roles)

      resolve()
    }, reject => {
      console.log('reject:', reject)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
