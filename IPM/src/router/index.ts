import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/services/:id',
      name: 'Service',
      meta: { title: 'Service' },
      component: () => import('../views/ServiceView.vue')
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('../views/HistoryView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

export default router
