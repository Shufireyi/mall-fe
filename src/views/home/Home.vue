<template>
  <div class="wrapper"  v-if="totalGoodsNum">
    <div class="header">
      <div class="logo">
        <img src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/indexLogo-11d65342f9.png" alt="">
        <div class="searchInput" @click="searchEvent">
          <p><i class="fa fa-search" aria-hidden="true"></i>搜索商品,共{{totalGoodsNum}}款好物</p>
        </div>
      </div>
      <slider-link  v-if="categoryLinks.length" :links="categoryLinks" @clickLink="clickLink"></slider-link>
    </div>
    <transition name="fadeIn">
      <keep-alive>
        <router-view class="marginBottom"></router-view>
      </keep-alive>
    </transition>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import HomeAPI from '../../service/home'
import GoodsAPI from '../../service/goods'
import SliderLink from '../../components/SlideLink'
import NavBar from '../../components/BottomNavBar'

export default {
  components: {
    SliderLink,
    NavBar
  },
  data () {
    return {
      categoryLinks: [],
      totalGoodsNum: 0
    }
  },
  mounted () {
    HomeAPI.getCategory().then((res) => {
      this.categoryLinks = [{
        name: '推荐'
      }, ...res.data.data]
    })
    GoodsAPI.getAllGoodsNum().then(res => {
      this.totalGoodsNum = res.data.data
    })
  },
  methods: {
    clickLink (item) {
      console.log(item)
    },
    searchEvent () {
      console.log('进入搜索页')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../utils/stylus/mixin.styl'
.wrapper
  width 100%
  padding-top 75px
  background-color #f4f4f4
.header
  border-bottom 1px solid #d9d9d9
  position fixed
  top 0
  left 0
  width 100%
  z-index 99
  background white
.logo
  box-sizing border-box
  height 88px
  padding 16px 30px
  img
    width 138px
    height 40px
    margin 8px auto
    margin-right 20px
  .searchInput
    text-align center
    width 532px
    height 56px
    float right
    background #eee
    border-radius 5px
    outline none
    color #666
    p
      font-size 28px
      line-height 56px
      color #333
    .fa-search
      font-size 26px
      margin 0 10px
      position relative
      top -1px
.marginBottom
  margin-bottom  98px
  min-height 100vh

.fadeIn-enter-active,
.fadeIn-leave-active
  transition  opacity .3s
.fadeIn-enter,
.fadeIn-leave-to
  opacity 0
</style>
