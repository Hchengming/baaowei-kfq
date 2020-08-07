import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/flowview'] // no redirect whitelist:工作流查看加入白名单

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  const ticket = localStorage.ticket
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
    // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = (store.getters.roles && store.getters.roles.length > 0)
      if (hasRoles) {
        next()
      } else {
        try {
          var roles = []
          // 防止cookies存在,localStorage不存在的情况
          if (localStorage.userInfo && localStorage.userInfo.length > 0) {
            roles = JSON.parse(localStorage.userInfo).roles
            const accessRoutes = await store.dispatch('permission/generatemyRoutes', roles)
            // 动态添加路由
            router.addRoutes(accessRoutes)
          } else {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            next(`/login?redirect=${to.path.replace('{ticket}', ticket)}`)
            NProgress.done()
          }
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')

          next(`/login?redirect=${to.path.replace('{ticket}', ticket)}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1 || whiteList.indexOf('/' + (to.path.split('/')[1])) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path.replace('{ticket}', ticket)}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
