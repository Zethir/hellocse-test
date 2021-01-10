import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Stars from '@/views/Stars.vue'
import BackOffice from '@/views/BackOffice.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Stars',
    component: Stars,
    meta: {
      title: 'Stars'
    }
  },
  {
    path: '/back-office',
    name: 'BackOffice',
    component: BackOffice,
    meta: {
      title: 'Back Office'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
