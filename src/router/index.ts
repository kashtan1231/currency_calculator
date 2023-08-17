import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)
store.commit('initialiseStore')

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/made-exchanges',
    name: 'MadeExchangesPage',
    component: () => import('@/views/MadeExchangesPage.vue')
  },
  {
    path: '*',
    redirect: { name: 'HomePage' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
