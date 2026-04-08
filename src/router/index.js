import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/menu', name: 'menu', component: () => import('../views/MenuView.vue') },
    { path: '/rations', name: 'rations', component: () => import('../views/RationsView.vue') },
    { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
