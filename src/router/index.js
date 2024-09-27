import { createRouter, createWebHistory } from 'vue-router'
import ChristmasPromo from '@/views/ChristmasPromo.vue'
import HomeView from '@/views/HomeView.vue'
import DadJokes from '@/views/DadJokes.vue'
import ChallengeLayout from '@/layouts/ChallengeLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/challenges',
      name: 'challenges',
      component: ChallengeLayout,
      children: [
        {
          path: 'christmas-promo',
          name: 'christmas promo',
          component: ChristmasPromo
        },
        {
          path: 'dad-jokes',
          name: 'dad jokes',
          component: DadJokes
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
