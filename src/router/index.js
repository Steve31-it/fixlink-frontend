import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { guest: true }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue')
  },
  {
    path: '/services/:id',
    name: 'ServiceDetail',
    component: () => import('../views/ServiceDetail.vue')
  },
  {
    path: '/bookings',
    name: 'Bookings',
    component: () => import('../views/Bookings.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/bookings/new',
    name: 'NewBooking',
    component: () => import('../views/NewBooking.vue'),
    meta: { requiresAuth: true, customerOnly: true }
  },
  {
    path: '/bookings/:id',
    name: 'BookingDetail',
    component: () => import('../views/BookingDetail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/my-services',
    name: 'MyServices',
    component: () => import('../views/MyServices.vue'),
    meta: { requiresAuth: true, providerOnly: true }
  },
  {
    path: '/my-services/new',
    name: 'NewService',
    component: () => import('../views/NewService.vue'),
    meta: { requiresAuth: true, providerOnly: true }
  },
  {
    path: '/my-services/:id/edit',
    name: 'EditService',
    component: () => import('../views/EditService.vue'),
    meta: { requiresAuth: true, providerOnly: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/providers',
    name: 'Providers',
    component: () => import('../views/Providers.vue')
  },
  {
    path: '/providers/:id',
    name: 'ProviderDetail',
    component: () => import('../views/ProviderDetail.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true, adminOnly: true }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import('../views/FAQ.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Check if route is for guests only
  if (to.meta.guest && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  // Check if route requires admin role
  if (to.meta.adminOnly && authStore.user?.role !== 'admin') {
    next('/')
    return
  }
  
  // Check if route requires provider role
  if (to.meta.providerOnly && authStore.user?.role !== 'provider') {
    next('/')
    return
  }
  
  // Check if route requires customer role
  if (to.meta.customerOnly && authStore.user?.role !== 'customer') {
    next('/')
    return
  }
  
  next()
})

export default router 