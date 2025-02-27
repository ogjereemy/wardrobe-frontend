import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ClothingItems from '../views/ClothingItems.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/clothing-items', name: 'ClothingItems', component: ClothingItems },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
