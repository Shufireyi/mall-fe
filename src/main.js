// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import formatPrice from './utils/formatPrice'
import { formatTime } from './utils/time'
import 'font-awesome/css/font-awesome.min.css'
import {
  // eslint-disable-next-line
  Style,
  Popup,
  Rate
} from 'cube-ui'
Vue.use(
  VueLazyload,
  {
    // loading: require('./assets/default.jpg'),
    // error: require('./assets/default.jpg')
  }
)
Vue.use(VueAwesomeSwiper)
Vue.use(Popup)
Vue.use(Rate)
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.filter('formatPrice', formatPrice)
Vue.filter('formatTime', formatTime)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
