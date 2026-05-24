import { createRouter, createWebHistory } from 'vue-router'

const HelloWorld = () => import('../components/HelloWorld.vue')
const ShipCity = () => import('../components/ShipCity.vue')
const ShipCityRegister = () => import('../components/Register.vue')

const CITIES = {
  london: { code: 'LDN', label: 'London', date: '2026-06-17' },
  berlin: { code: 'BER', label: 'Berlin', date: '2026-06-25' },
  nyc: { code: 'NYC', label: 'New York City', date: '2026-06-30' },
  sydney: { code: 'SYD', label: 'Sydney', date: '2026-07-30' },
  sf: { code: 'SF', label: 'San Francisco', date: '2026-10-15' },
}

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