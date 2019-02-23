import Vue from 'vue'
import App from './App'
import router from './router'
import MinUI from 'mint-ui'
import moment from 'moment'
import '@/style/common.css'
import '@/lib/mui/css/mui.min.css'
import '@/lib/mui/css/icons-extra.css'
import 'mint-ui/lib/style.css'
import VueResource from 'vue-resource'
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)
Vue.use(VueResource)
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/';
Vue.http.options.emulateJSON = true;
Vue.use(MinUI)
import 'mint-ui/lib/style.css'

Vue.filter('dataFormat', function (datastr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(datastr).format(pattern)
})
Vue.config.productionTip = false
import comment from './components/comment.vue'
Vue.component("comment", comment)
import swipe from './components/swipe.vue'
Vue.component("swipe", swipe)

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import Vuex from 'vuex'

Vue.use(Vuex)
/* eslint-disable no-new */
let car = JSON.parse(localStorage.getItem("car") || '[]')
let store = new Vuex.Store({
  state: {
    car
  },
  mutations: {
    addToCar(state, goodsInfo) {
      let index = state.car.findIndex(item => item.id === goodsInfo.id)
      if (index === -1) {
        state.car.push(goodsInfo)
      } else {
        state.car[index].count += parseInt(goodsInfo.count)
      }
      localStorage.setItem("car", JSON.stringify(state.car))
    },
    updateSelected(state, goodsInfo) {
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.selected = !goodsInfo.selected
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateCount(state, goodsInfo) {
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.count = goodsInfo.count
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    totalCount(state) {
      let sum = 0;
      state.car.forEach(item => sum += item.count)
      return sum
    },
    goodsCount(state) {
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    goodsSelected(state) {
      let o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    goodsCountAndAmount(state) {
      let o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
