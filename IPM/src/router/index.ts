import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStorage } from '@/stores/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Services',
      component: () => import('../views/ServicesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/services/:id',
      name: 'Service',
      component: () => import('../views/ServiceView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const session = useSessionStorage()

  if (to.meta.requiresAuth) {
    if (session.isLoggedIn) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
