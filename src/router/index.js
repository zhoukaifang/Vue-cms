import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import member from '@/pages/member'
import search from '@/pages/search'
import shopcar from '@/pages/shopcar'
import newsList from '@/pages/newsList'
import newsInfo from '@/pages/newsInfo'
import photoList from '@/pages/photoList'
import photoInfo from '@/pages/photoInfo'
import goodsList from '@/pages/goodsList'
import goodsInfo from '@/pages/goodsInfo'
import goodsComment from '@/pages/goodsComment'
import goodsDesc from '@/pages/goodsDesc'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: home
  }, {
    path: '/member',
    component: member
  }, {
    path: '/search',
    component: search
  }, {
    path: '/shopcar',
    component: shopcar
  }, {
    path: '/home/newsList',
    component: newsList
  }, {
    path: '/home/newsInfo/:id',
    component: newsInfo
  }, {
    path: '/home/photoList',
    component: photoList
  }, {
    path: '/home/photoInfo/:id',
    component: photoInfo
  }, {
    path: '/home/goodsList',
    component: goodsList
  }, {
    path: '/home/goodsInfo/:id',
    component: goodsInfo
  }, {
    path: '/home/goodsComment/:id',
    component: goodsComment
  }, {
    path: '/home/goodsDesc/:id',
    component: goodsDesc
  }],
  linkActiveClass: 'mui-active'
})
