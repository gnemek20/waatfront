import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$api = axios

import VueSession from 'vue-session'
let sessionOptions = { persist: true }
Vue.use(VueSession, sessionOptions)

import DefaultUI from '@/css/default.scss'
Vue.use(DefaultUI)

import { Divider, Section, WaatBox, WaatButton, WaatHeader, WaatInput } from './components/index'
Vue.component('Section', Section)
Vue.component('Divider', Divider)
Vue.component('WaatHeader', WaatHeader)
Vue.component('WaatInput', WaatInput)
Vue.component('WaatButton', WaatButton)
Vue.component('WaatBox', WaatBox)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
