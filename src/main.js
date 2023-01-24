import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$api = axios

import DefaultUI from '@/css/default.scss'
Vue.use(DefaultUI)

import { WaatInput } from './components/index'
Vue.component('WaatInput', WaatInput)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
