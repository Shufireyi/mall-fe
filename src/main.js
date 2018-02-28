// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Cube from 'cube-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'

import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueLazyload, {
  // loading: require('./assets/default.jpg'),
  // error: require('./assets/default.jpg')
})
Vue.use(VueAwesomeSwiper)
Vue.use(Cube)
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
