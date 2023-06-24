import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },

    {
      path: '/dictionary',
      name: 'Dictionary',
      component: () => import('@/views/Dictionary.vue')
    },

    {
      path: '/find-correct-translation',
      name: 'FindCorrectTranslation',
      component: () => import('@/views/games/FindTranslationsGame.vue')
    },
    {
      path: '/translate-it-rigth',
      name: 'TranslateItRight',
      component: () => import('@/views/games/TranslateItGame.vue')
    }
  ]
})

export default router
