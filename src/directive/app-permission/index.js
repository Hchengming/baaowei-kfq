import { default as appPermission } from './permission'

const install = function(Vue) {
  Vue.directive('app-permission', appPermission)
}

if (window.Vue) {
  window['app-permission'] = appPermission
  Vue.use(install) // eslint-disable-line
}

appPermission.install = install
export default appPermission
