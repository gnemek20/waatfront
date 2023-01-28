import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/sign/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/sign/SignUp.vue')
  },
  {
    path: '/inferencepage',
    name: 'inferencepage',
    component: () => import('@/views/inference/InferencePage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const axios = require('axios')
  const VueSession = require('vue-session')
  const Vuex = require('@/store/index')

  const store = Vuex.default.state.user

  if (!store.id) {
    const session = JSON.parse(window.localStorage.getItem(VueSession.key)) || {};

    if (session['id']) {
      axios.post('/api/users/user', {
        user: { id: session['id'] }
      }).then((res) => {
        Vuex.default.state.user = res.data.user
        Vue.prototype.$auth = true
      })
    }
    else {
      Vuex.default.state.user = {}
      Vue.prototype.$auth = false
    }
  }

  next()
})

export default router
