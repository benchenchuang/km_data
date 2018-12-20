import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index'
import Error from '@/pages/error'
import Search from '@/pages/search'
import KolDetail from '@/pages/kol'
import Person from '@/pages/person'
import Login from '@/pages/login'
import Focus from '@/pages/focus'
import User from '@/pages/user'

Vue.use(Router)

export default new Router({
  mode:'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title:"可梦数据排行榜",
        certify:true,
      }
    },
    {
      path: '/kol/:id',
      name: 'KolDetail',
      component: KolDetail,
      meta:{
        title:"红人详情"
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta:{
        title:"搜索"
      }
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta:{
        title:"个人中心"
      }
    },
    {
      path: '/focus',
      name: 'Focus',
      component: Focus,
      meta:{
        title:"关注红人"
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta:{
        title:"个人信息"
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        title:"登录",
        certify:true,
      }
    },
    {
      path:'*',
      name:'Error',
      component:Error,
      certify:true,
      meta:{
        title:"页面错误"
      }
    }
  ]
})
