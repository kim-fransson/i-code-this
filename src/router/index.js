import { createRouter, createWebHistory } from 'vue-router'
import ChristmasPromo from '@/views/ChristmasPromo.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/christmas-promo',
      name: 'christmas promo',
      component: ChristmasPromo
    }
  ]
})

export default router
