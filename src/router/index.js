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

export default router
