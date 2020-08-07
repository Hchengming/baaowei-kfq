import Vue from 'vue'
import moment from 'moment'

import '@/styles/Kong/app.styl'

Vue.prototype.$moment = moment

// kong table components
import xTable from '@/views/kong/components/x-table.vue'
Vue.component('xTable', xTable)

