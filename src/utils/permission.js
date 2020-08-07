import store from '@/store'
import router from '@/router'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/demo/permission/directive.vue
 */
export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

/**
 * 无权跳转
 */
export function NoPower() {
  var to = router.currentRoute
  store.dispatch('tagsView/delVisitedView', to)
  router.push({ name: 'Page401' })
}
