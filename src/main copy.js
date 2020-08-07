import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

Vue.prototype.$axios = axios
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import elDragDialog from './directive/el-drag-dialog/index'
import * as filters from './filters' // global filters
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { openPage } from '@/utils/router'
import { NoPower } from '@/utils/permission'
Vue.prototype.OpenPage = openPage
Vue.prototype.NoPower = NoPower

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'development') {
//   mockXHR()
// }

Vue.prototype.$driver = new Driver({
  className: 'scoped-class', // className to wrap driver.js popover
  animate: true, // Animate while changing highlighted element
  opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
  padding: 10, // Distance of element from around the edges
  allowClose: false, // Whether clicking on overlay should close or not
  overlayClickNext: true, // Should it move to next step on overlay click
  doneBtnText: '完成', // Text on the final button
  closeBtnText: '关闭', // Text on the close button for this step
  nextBtnText: '下一步', // Next button text for this step
  prevBtnText: '上一步' // Previous button text for this step
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})
// 全局注册可拖动Dialog指令
Vue.use(elDragDialog)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  /* el: '#app',*/
  store,
  router,
  render: h => h(App)
}).$mount('#app')
