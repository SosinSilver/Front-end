import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Country from '../views/Country.vue'
import Community from '../views/Community.vue'
import Tutorial from '../views/Tutorial.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/board',
    name: 'Community',
    component: Community,
  },
  {
    path: '/country/:countryNum',
    name: 'Country',
    component: Country,
  },
  {
    path: '/country/:countryNum',
    name: 'Country',
    component: Country,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
