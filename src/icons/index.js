import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// eslint-disable-next-line no-undef
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
