import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/home/Home.vue'),
      redirect: 'Recommend',
      children: [
        {
          path: 'recommend',
          name: 'Recommend',
          component: () => import('../views/home/recommend/Recommend.vue')
        }
      ]
    },
    {
      path: '/hello',
      name: 'Hello',
      component: () => import('../components/HelloWorld.vue')
    }
  ]
})
