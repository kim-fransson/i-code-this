import { createRouter, createWebHistory } from 'vue-router'
import ChristmasPromo from '@/views/ChristmasPromo.vue'
import HomeView from '@/views/HomeView.vue'
import DadJokes from '@/views/DadJokes.vue'
import ChallengeLayout from '@/layouts/ChallengeLayout.vue'
import TodoList from '@/views/TodoList.vue'

export const challenges = [
  {
    path: 'christmas-promo',
    name: 'christmas promo',
    component: ChristmasPromo
  },
  {
    path: 'dad-jokes',
    name: 'dad jokes',
    component: DadJokes
  },
  {
    path: 'todo-list',
    name: 'todo list',
    component: TodoList
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/challenges',
      name: 'challenges',
      component: ChallengeLayout,
      children: challenges
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
