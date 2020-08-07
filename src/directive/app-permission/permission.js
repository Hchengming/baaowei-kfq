import Vue from 'vue'

const hasPermissions = value => {
  if (localStorage.appPermissions) {
    const permissions = JSON.parse(localStorage.appPermissions)

    if (value && value instanceof Array && value.length > 0) {
      return permissions.some(permission => {
        return value.includes(permission)
      })
    }
  }
  return false
}

export default {
  // 指令权限
  // v-app-permission="['guid1','guid2']"
  // eslint-disable-next-line no-unused-vars
  inserted(el, binding, vnode) {
    const { value } = binding

    if (!hasPermissions(value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  },

  has(value, redirect = false) {
    if (hasPermissions(value)) {
      return true
    }

    redirect && Vue.prototype.NoPower()

    return false
  }
}
