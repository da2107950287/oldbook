import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import xiang from '../views/xiangqing.vue'
import Self from '../views/Self.vue'
import Cart from '../views/Cart'
import search from '../views/search'
import shop from '../views/shop'
import order from '../views/Order'
import Category from '../views/Category'
import Setpass from '../views/Setpass'
import Reg from '../views/Reg'
import AccountUser from '../views/AccountUser'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/self',
    component: Self,
  },
  {
    path: '/Cart',
    name:"Cart",
    component: Cart,
  },
  {
    path: '/search',
    name:"search",
    component: search,
  },
  {
    path: '/shop',
    name:"shop",
    component: shop,
  },
  {
    path: '/order',
    name:"order",
    component: order,
  },
  {
    path: '/xiang',
    component: xiang,
    name:'xiang'
  },
  {
    path: '/category',
    component: Category,
    name:'category'
  },
  {
    path:'/setpass',
    component:Setpass,
    name:'setpass'
  },{
    path:'/reg',
    component:Reg,
    name:'reg'
  },{
    path:'/accountuser',
    component:AccountUser,
    name:'accountuser',
  }
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
