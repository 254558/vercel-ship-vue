import { createRouter, createWebHistory } from 'vue-router'
import { CITIES } from '@/constants/cities'

const HelloWorld = () => import('../components/HelloWorld.vue')
const ShipCity = () => import('../components/ShipCity.vue')
const ShipCityRegister = () => import('../components/Register.vue')

const routes = [
  { path: '/', component: HelloWorld },
  ...Object.entries(CITIES).map(([slug, meta]) => ({
    path: `/ship/${slug}`,
    component: ShipCity,
    meta,
  })),
  ...Object.entries(CITIES).map(([slug, meta]) => ({
    path: `/ship/${slug}/register`,
    component: ShipCityRegister,
    meta,
  })),
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
export { CITIES }
