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
        },
        {
          path: 'jujia',
          name: 'Jujia',
          component: () => import('../views/home/categoryView/Jujia.vue')
        },
        {
          path: 'canchu',
          name: 'Canchu',
          component: () => import('../views/home/categoryView/Canchu.vue')
        },
        {
          path: 'dianqi',
          name: 'Dianqi',
          component: () => import('../views/home/categoryView/Dianqi.vue')
        },
        {
          path: 'fuzhuang',
          name: 'Fuzhuang',
          component: () => import('../views/home/categoryView/Fuzhuang.vue')
        },
        {
          path: 'peijian',
          name: 'Peijian',
          component: () => import('../views/home/categoryView/Peijian.vue')
        },
        {
          path: 'tese',
          name: 'Tese',
          component: () => import('../views/home/categoryView/Tese.vue')
        },
        {
          path: 'wenti',
          name: 'Wenti',
          component: () => import('../views/home/categoryView/Wenti.vue')
        },
        {
          path: 'xihu',
          name: 'Xihu',
          component: () => import('../views/home/categoryView/Xihu.vue')
        },
        {
          path: 'yingtong',
          name: 'Yingtong',
          component: () => import('../views/home/categoryView/Yingtong.vue')
        },
        {
          path: 'yinshi',
          name: 'Yinshi',
          component: () => import('../views/home/categoryView/Yinshi.vue')
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
