import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import ShipCity from '../components/ShipCity.vue'

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/ship/london', component: ShipCity },
  { path: '/ship/berlin', component: ShipCity },
  { path: '/ship/nyc', component: ShipCity },
  { path: '/ship/sydney', component: ShipCity },
  { path: '/ship/sf', component: ShipCity },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router