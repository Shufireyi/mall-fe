<template>
  <div class="wrapper">
    <loading v-if="!bannerData.length"></loading>
    <transition name="fadeIn">
      <div v-if="bannerData.length > 0">
      <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
      <swiper-slide  v-for="(item, index) in bannerData" class="swiper-slide content" :key="index">
        <router-link  :to="{name: 'Home'}" tag="p">
          <img class="adaptHeightImg" :src="item.picUrl + '?imageView&thumbnail=750x0&quality=75'" alt="">
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <div class="adv">
      <div class="item"><i class="icon"></i>网易自营品牌</div>
      <div class="item"><i class="icon"></i>30天无忧退货</div>
      <div class="item"><i class="icon"></i>48小时快速退款</div>
    </div>
    <div class="tagList">
      <p class="title">品牌制造商直供<i class="fa fa-angle-right"></i></p>
      <div class="tabItem" v-for="(item, index) in tagListFour" :key="index">
        <p class="name">{{item.name}}</p>
        <p class="price">{{item.floorPrice}}元起</p>
        <p class="new" v-if="item.newOnShelf"></p>
        <img v-lazy="item.picUrl + '?imageView&amp;thumbnail=355x0&amp;quality=65'">
      </div>
    </div>
    <div class="newGoods">
      <div class="header">
        <a href="#">
          <p>周一周四 · 新品首发</p>
          <button disabled="disabled">查看全部<i class="fa fa-angle-right"></i></button>
        </a>
        <span class="angle"></span>
      </div>
      <horizontal-scroll :data="newGoods" class="localscrollWrapper">
        <ul class="newgoodsList" ref="newgoodsList">
          <li v-for="(item,index) in newGoods" :key="index" class="newgoodsItem">
            <img v-lazy="item.listPicUrl + '?imageView&quality=65&thumbnail=330x330'">
            <div class="name">{{item.name}}</div>
            <div class="desc">{{item.simpleDesc}}</div>
            <div class="price">￥{{item.retailPrice}}</div>
            <div class="choice" v-if="item.productPlace !== ''">
              <span v-for="(char, index) in _String2Array(item.productPlace)" :key="index">{{ char }}</span>
            </div>
            <div class="choice" v-if=" item.productPlace === '' && item.colorNum">
              <span>{{ item.colorNum }}</span>
              <span>色</span>
              <span>可</span>
              <span>选</span>
            </div>
          </li>
          <li class="lookAll">
            <p>查看全部</p>
          </li>
        </ul>
      </horizontal-scroll>
    </div>
    <div class="rcmGoods newGoods">
      <div class="header">
        <a href="#">
          <p>人气推荐 · 好物精选</p>
          <button disabled="disabled">查看全部<i class="fa fa-angle-right"></i></button>
        </a>
        <span class="angle"></span>
      </div>
      <horizontal-scroll :data="popularGoods" class="localscrollWrapper">
        <ul class="newgoodsList" ref="populargoodsList">
          <li v-for="(item,index) in popularGoods" :key="index" class="populargoodsItem">
            <img v-lazy="item.listPicUrl + '?imageView&quality=65&thumbnail=330x330'">
            <div class="taglist" v-if="item.itemTagList.length > 0">
              <span v-for="(i, j) in item.itemTagList" :key="j" :class="i.name === '爆品' ? 'red' : 'orange' ">{{i.name}}</span>
            </div>
            <div class="name">{{item.name}}</div>
            <div class="desc">{{item.simpleDesc}}</div>
            <div class="price">￥{{item.retailPrice}}</div>
            <div class="choice" v-if="item.productPlace !== ''">
              <span v-for="(char, index) in _String2Array(item.productPlace)" :key="index">{{ char }}</span>
            </div>
            <div class="choice" v-if=" item.productPlace === '' && item.colorNum">
              <span>{{ item.colorNum }}</span>
              <span>色</span>
              <span>可</span>
              <span>选</span>
            </div>
          </li>
          <li class="lookAll">
            <p>查看全部</p>
          </li>
        </ul>
      </horizontal-scroll>
    </div>
    <limit-time-sale></limit-time-sale>
    <fuli-she></fuli-she>
    <div class="diffGoodSale">
      <div v-for="(cate, index) in diffCateSale" :key="index" class="diffcate">
        <div class="title">{{ cate.name }}好物</div>
        <good-info v-for="(good, i) in cate.itemList" :key="i" :good="good" class="goodItem"></good-info>
        <a class="more" href="#">
          <span>更多{{ cate.name }}好物</span><i></i>
        </a>
      </div>
    </div>
    <footer>
      <p>XX公司版权所有&nbsp;&copy;&nbsp;1999-2018</p>
      <p>经营许可证： JY13301080111111</p>
      <p>All Rights Reserved. 备案号：苏ICP备11111111号-1</p>
    </footer>
    </div>
    </transition>
  </div>
</template>

<script>
import HomeAPI from '../../../service/home'
import horizontalScroll from '../../../components/HorizontalScroll'
import LimitTimeSale from './LimitTime'
import FuliShe from './Fulishe'
import GoodInfo from '../../home/GoodInfo'
import Loading from '../../../components/Loading'
export default {
  components: {
    horizontalScroll,
    LimitTimeSale,
    FuliShe,
    GoodInfo,
    Loading
  },
  data () {
    return {
      bannerData: [],
      tagListFour: [],
      newGoods: [],
      popularGoods: [],
      diffCateSale: [],
      swiperOption: {
        notNextTick: true,
        loop: true,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        centeredSlides: true,
        paginationClickable: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2,
          loadOnTransitionStart: true
        }
      }
    }
  },
  watch: {
    bannerData () {
      this.adjustImage()
    },
    newGoods () {
      this._initnewgoodsList()
    },
    popularGoods () {
      this._initpopulargoodsList()
    }
  },
  mounted () {
    HomeAPI.getBannerData().then((res) => {
      if (res.errcode) {
        console.log(res.message)
      } else {
        this.bannerData = res.data.data
      }
    })
    HomeAPI.getTaglistfour().then((res) => {
      if (res.errcode) {
        console.log(res.message)
      } else {
        this.tagListFour = res.data.data
        // console.log(this.tagListFour)
      }
    })
    HomeAPI.getNewGoods().then(res => {
      if (res.errcode) {
        console.log(res.message)
      } else {
        this.newGoods = res.data.data
        // console.log(this.newGoods)
      }
    })
    HomeAPI.getPopularGoods().then(res => {
      if (res.errcode) {
        console.log(res.message)
      } else {
        this.popularGoods = res.data.data
        // console.log(this.popularGoods)
      }
    })
    HomeAPI.getDiffCateSale().then(res => {
      if (res.errcode) {
        console.log(res.message)
      } else {
        this.diffCateSale = res.data.data
        // console.log(this.diffCateSale)
      }
    })
  },
  methods: {
    adjustImage () {
      setTimeout(() => {
        let arr = document.querySelectorAll('.adaptHeightImg')
        let height = Math.floor(arr[0].clientWidth / 1.875)
        for (let index = 0; index < arr.length; index++) {
          arr[index].style.height = height + 'px'
        }
      }, 20)
    },
    _initnewgoodsList () {
      if (this.newGoods.length > 0) {
        this.$nextTick(() => {
          const arr = document.querySelectorAll('.newgoodsItem')
          const li = arr[0]
          if (!li) {
            return
          }
          let ulwidth = li.clientWidth * (arr.length + 2)
          this.$refs.newgoodsList.style.width = `${ulwidth + 10}px`
        })
      }
    },
    _initpopulargoodsList () {
      if (this.popularGoods.length > 0) {
        this.$nextTick(() => {
          const arr = document.querySelectorAll('.populargoodsItem')
          const li = arr[0]
          if (!li) {
            return
          }
          let ulwidth = li.clientWidth * (arr.length + 2)
          this.$refs.populargoodsList.style.width = `${ulwidth + 10}px`
        })
      }
    },
    _String2Array (string) {
      return [...string]
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  background #f4f4f4
.swiper-box
  width 100%
  overflow hidden
  position relative
  min-height 300px
  .swiper-slide
    img
      width 100%
      height 400px
.adv
  width 100%
  height 72px
  display flex
  justify-content space-around
  margin-bottom 20px
  background white
  .item
    display inline-block
    height 72px
    line-height 72px
    font-size 24px
  .icon
    display inline-block
    vertical-align sub
    width 32px
    height 32px
    background-image url(http://yanxuan.nosdn.127.net/cae45612b8aae577d8bd73338e2fc02c.png)
    background-size 32px 32px
    background-repeat no-repeat
    background-position center center
.tagList
  margin-bottom 20px
  background-color white
  padding 0 16px
  .title
    height 110px
    line-height 110px
    text-align center
    .fa-angle-right
      margin-left 20px
  .tabItem
    width 355px
    height 236px
    position relative
    display inline-block
    box-sizing border-box
    overflow hidden
    background-color #f4f4f4
    margin-bottom 8px
    padding 20px 0 0 20px
    vertical-align top
    &:nth-child(even)
      margin-right 8px
    p
      font-size 28px
      line-height 32px
      margin-bottom 6px
    .new
      height 32px
      background-image url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/new-5e42f2db1f.png')
      background-repeat no-repeat
      background-size 64px 32px
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
.newGoods
  width 100%
  background-color white
  margin-bottom 20px
  .header
    position relative
    display flex
    justify-content center
    align-items center
    text-align center
    height 260px
    margin-bottom 32px
    background url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/bitmap-d4f7b37e32.png")
    overflow hidden
    a
      display block
      height 125px
    p
      color #8BA0B6
      font-size 36px
    button
      margin 16px 45px 0 45px
      height 56px
      width 240px
      background #D8E5F1
      color #8BA0B6
      outline none
      border none
    .angle
      position absolute
      bottom -10px
      left 50%
      display block
      width 20px
      height 20px
      background white
      transform translate(-14.14px) rotate(45deg)
  .localscrollWrapper
    background-color white
  .newgoodsList
    width 100%
    height 480px
    overflow hidden
    white-space nowrap
    font-size 0
  .newgoodsItem,.populargoodsItem
    display inline-block
    overflow hidden
    width 280px
    margin 0 0 0 30px
    vertical-align top
    position relative
    img
      background #f4f4f4
      width 100%
    .taglist
      margin 10px 0 16px 0
      padding 0 0 0 10px
      span
        display inline-block
        height 30px
        line-height 30px
        font-size 20px
        margin 0 0 1px 12px
        padding 0 16px
        color white
        &.red
          background-color #e5686d
        &.orange
          background-color #f48f18
    .name
      margin 10px auto
      padding 0 10px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      font-size 28px
      line-height  36px
      height 36px
      color #333
    .desc
      margin 0 0 14px 0
      padding 0 10px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      font-size 24px
      line-height 30px
      line-height 30px
      color #7f7f7f
    .price
      padding 0 10px
      font-size 28px
      color #b4282d
      line-height 40px
      line-height 40px
    .choice
      position absolute
      top 0
      left 0
      width 30px
      font-size 20px
      line-height 24px
      border 1px solid #b4a078
      margin 10px 0 0 10px
      padding 12px 0
      color #b4a078
      display flex
      flex-direction column
      text-align center
  .lookAll
    display inline-block
    box-sizing border-box
    overflow hidden
    width 280px
    height 280px
    margin 0 30px
    border 8px solid #f4f4f4
    vertical-align top
    p
      height 280px
      line-height 280px
      font-size 28px
      text-align center
.rcmGoods
  .header
    background url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/bitmap2-d626e0b52a.png')
    p
      color #B4A078
    button
      background-color #F4E9CB
      color #B4A078
.diffGoodSale
  .diffcate
    background white
    margin 0 0 20px 0
  .title
    height 120px
    line-height 120px
    text-align center
    font-size 28px
    color #333
  .goodItem
    &:nth-child(even)
      padding 0 10px 33px 20px
    &:nth-child(odd)
      padding 0 20px 33px 10px
    &:last-of-type
      display none
  .more
    width 345px
    height 417px
    vertical-align top
    display inline-block
    background-color #f4f4f4
    text-align center
    padding 128px 0 129px 0
    box-sizing border-box
    span
      display block
      margin 0 0 60px 0
      height 32px
      font-size 32px
      line-height 32px
      color #333
    i
      display block
      width 67px
      height 67px
      margin 0 auto
      background-image url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/goodGridMore-233aaf669a.png')
      background-position center center
      background-repeat no-repeat
      background-size 67px 67px
footer
  background #414141
  color #999
  font-size 20px
  text-align center
  padding 20px 0
  // margin-bottom 98px
  p
    line-height 28px
    margin 12px

.fadeIn-enter-active,.fadeIn-leave-active
  transition opacity  .5s
.fadeIn-enter,.fadeIn-leave-to
  opacity 0
</style>
