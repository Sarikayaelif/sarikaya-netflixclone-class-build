import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import UserSelect from '../views/UserSelect.vue'
import Home from '../views/Home.vue'
import Homekid from '../views/Homekid.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/UserSelect',
    name: 'UserSelect',
    // component: () => import("../views/UserSelect.vue"), // bu sekilde yazmis
    component: UserSelect,  // Import ettgin yukaridaki ad ile ayni olmali burasi
    params: true
  },
  {
    path: '/Home',
    name: 'UserHome',
    // component: () => import("../views.Home.vue"),
    component: Home,  // Import ettgin yukaridaki ad ile ayni olmali burasi
    params: true
  },
  {
  path: '/Homekid',
  name: 'Homekid',
  component: Homekid,
  params: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
