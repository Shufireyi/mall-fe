import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/home/Home.vue'),
      redirect: '/home/recommend',
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
      path: '/shiwu',
      name: 'Shiwu',
      component: () => import('../views/shiwu/Shiwu.vue')
    },
    {
      path: '/categories',
      name: 'Category',
      component: () => import('../views/category/Category.vue')
    },
    {
      path: '/shopcart',
      name: 'ShopCart',
      component: () => import('../views/shopCart/ShopCart.vue')
    },
    {
      path: '/person',
      name: 'Person',
      component: () => import('../views/person/Person.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/person/Login.vue')
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../views/person/Logout.vue')
    },
    {
      path: '/forgetPwd',
      name: 'ForgetPwd',
      component: () => import('../views/person/ForgetPwd.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/person/Registe.vue')
    },
    {
      path: '/brand',
      name: 'Brand',
      component: () => import('../views/home/recommend/subView/Brand.vue')
    },
    {
      path: '/brand/:id',
      name: 'BrandDetail',
      component: () => import('../views/home/recommend/subView/BrandDetail.vue')
    },
    {
      path: '/goodsdetail/:id',
      name: 'GoodsDetail',
      component: () => import('../components/GoodsDetail.vue')
    },
    {
      path: '/goodscomment/:id',
      name: 'GoodsComment',
      component: () => import('../components/GoodsComment.vue')
    },
    {
      path: '/newgoodssale',
      name: 'NewGoodsSale',
      component: () =>
        import('../views/home/recommend/subView/NewGoodsSale.vue')
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: () => import('../components/SerchPage.vue')
    },
    {
      path: '/searchresult/:keyword',
      name: 'SearchResultList',
      component: () => import('../components/SearchGoodsList.vue')
    },
    {
      path: '/populargoods',
      name: 'PopularGoods',
      component: () =>
        import('../views/home/recommend/subView/PopularGoods.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
