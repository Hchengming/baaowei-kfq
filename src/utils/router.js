import Layout from '@/layout'
import store from '@/store'
import router, { resetRouter } from '@/router'
import { componentsMap } from '@/router/routers'
import { getOldSystemUrlBy } from '@/utils/config'

/**
 * 递归设置路由
 * @param routes asyncRoutes
 * @param path
 */
export function setRoutes(routes, path = '') {
  const res = []
  if (routes) {
    routes.forEach(route => {
      const tmp = {
        path: path + '/' + route.path,
        // component: path === '' ? Layout : (resolve) => require([`../../views/${route.component}.vue`], resolve),
        component: path === '' ? Layout : componentsMap[route.routename],
        // com ponent: path === '' ? Layout : () => import(`@/${route.component}`),
        name: route.name,
        meta: route.meta,
        hidden: !!route.hidden,
        activeMenu: route.activeMenu ? route.activeMenu : '',
        redirect: route.redirect ? route.redirect : '',
        alwaysShow: !!route.alwaysShow
      }
      if (route.children) {
        tmp.children = setRoutes(route.children, tmp.path)
      }
      res.push(tmp)
    })
  }
  return res
}

/**
 * 动态添加路由
 * @param router router
 * @param name name
 * @param path path
 */
export async function dynamicIframeRoutes(title, routerName, path = '', url = '') {
  // 清除路由
  resetRouter()
  const routerItem = {
    path: path || title,
    component: '/components/Iframe/index',
    routename: 'iframe_index',
    name: routerName,
    meta: { title: routerName, iframeUrl: url }
  }

  let dynamicRoutes = [{
    path: 'dynamic',
    meta: { title: '动态路由' },
    children: []
  }]
  if (localStorage.dynamicRoutes && localStorage.dynamicRoutes.length > 0) {
    dynamicRoutes = JSON.parse(localStorage.dynamicRoutes)
  }
  if (dynamicRoutes[0].children.filter(c => c.name === routerName).length > 0) {
    dynamicRoutes[0].children.splice(dynamicRoutes[0].children.findIndex(c => c.name === routerName), 1)
  }
  dynamicRoutes[0].children.push(routerItem)
  await store.dispatch('Iframe/addIframe', routerItem)

  localStorage.dynamicRoutes = JSON.stringify(dynamicRoutes)
  const roles = JSON.parse(localStorage.userInfo).roles
  const accessRoutes = await store.dispatch('permission/generatemyRoutes', roles)
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    router.addRoutes(accessRoutes)
    resolve(routerItem)
  })
}

/**
 * 动态添加路由
 * @param router router
 * @param name name
 * @param path path
 */
export function dynamicRoutes(routerName, path = '') {
  routerName = routerName.trim()
  path = path.trim()
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    const newRouter = [{
      path: `/dynamic/${path}`,
      component: () => import('@/components/Iframe/index'),
      name: routerName
    }]
    router.addRoutes(newRouter)
    resolve(newRouter[0].children[0])
  })
}

export function replaceUrlUserParams(url) {
  var user = JSON.parse(localStorage.userInfo)
  url = url.replace(/{UrId}|{userid}|{uid}/g, user.userId)
  url = url.replace(/{ip}|{userip}/g, user.ip)
  url = url.replace(/{ticket}/g, user.ticket)
  url = url.replace(/{telno}/g, user.phone)
  return url
}

// 打开个页面，自动识别地址
export function openPage(title, path, tagName) {
  path = replaceUrlUserParams(path).replace(/#$/g, '')

  if (path.toLowerCase().indexOf('bisp') === 0) {
    window.open(path, '_self')
    return
  }
  if (path.toLowerCase().indexOf('newwindow=newwindow') > -1) {
    window.open(path, title)
    return
  }
  if (path.toLowerCase().indexOf('/modules/') === 0 || path.toLowerCase().indexOf('/nmodules/') === 0) {
    dynamicIframeRoutes(title, tagName || title, title, getOldSystemUrlBy(path)).then(res => {
      // const { name } = this.$router.currentRoute
      // // 重新跳转
      // if (name === res.name) {
      //   this.$router.replace({
      //     path: '/redirect' + '/dynamic/' + res.path
      //   })
      // } else {
      router.push({
        name: res.name
      }).catch(err => { err })
      // }
    })
    return
  }
  //, query: { plan: title }
  if (path.toLowerCase().indexOf('/') === 0 || path.toLowerCase().indexOf('/#/') === 0) {
    var routerInfo = ({ path: path.replace(/^\/#/, '') })
    store.dispatch('tagsView/addTitle', title)
    router.push(routerInfo)
    return
  }
  dynamicIframeRoutes(title, title, title, path).then(res => {
    router.push({ name: res.name })
  })
}

// TODO:特殊处理兼容以前老平台的连接方式
window.OpenNewForm = function(path, title) {
  openPage(title, path)
}
// TODO:特殊处理兼容以前老平台的连接方式
window.OpenOldForm = function(tagName, path, title) {
  if (title === '待办任务') {
    openPage('待办事项', '/home/dbsxdetail')
    return
  }
  openPage(title, path, tagName)
}
