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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
