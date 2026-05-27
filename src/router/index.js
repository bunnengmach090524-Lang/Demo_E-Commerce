import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/products',
    name: 'Shop',
    component: () => import('@/pages/Shop.vue')
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/pages/ProductDetail.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/pages/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/pages/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/pages/Contact.vue')
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/pages/Wishlist.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && auth.isLoggedIn) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
