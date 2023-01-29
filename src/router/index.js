import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const checkAuth = (sign) => (to, from, next) => {
  const VueSession = require('vue-session')
  const session = JSON.parse(window.localStorage.getItem(VueSession.key)) || {};
  const auth = session['id'] == undefined ? false : true

  if (sign == auth) next()
  else next(sign ? '/' : '/workspace')
}

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
    beforeEnter: checkAuth(false)
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/sign/SignIn.vue'),
    beforeEnter: checkAuth(false)
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/sign/SignUp.vue'),
    beforeEnter: checkAuth(false)
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: () => import('@/views/WorkSpace.vue'),
    beforeEnter: checkAuth(true)
  },
  {
    path: '/inferencepage',
    name: 'inferencepage',
    component: () => import('@/views/inference/InferencePage.vue'),
    beforeEnter: checkAuth(true)
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
