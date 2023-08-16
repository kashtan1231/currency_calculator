import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/all-currencies',
    name: 'AllCurrencies',
    component: () => import('@/views/AllCurrencies.vue'),
  },
  {
    path: '*',
    redirect: { name: 'HomePage' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
