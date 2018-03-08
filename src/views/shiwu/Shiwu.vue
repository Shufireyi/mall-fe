<template>
  <div class="shiwu" v-if="banner.length > 0">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
      <swiper-slide  v-for="(item, index) in banner" class="swiper-slide content" :key="index">
        <router-link  :to="{name: 'Home'}" tag="p">
          <img class="adaptHeightImg" :src="item.picUrl + '?imageView&thumbnail=750x0&quality=75'" alt="">
          <div class="info" v-if="item.color">
            <div class="cate"><span class="before"></span>{{ item.subTitle }}<span class="after"></span></div>
            <div class="title">{{ item.title }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
    <horizontal-scroll :data="column" class="localscrollWrapper">
      <ul class="columnList" ref="columnList">
        <li v-for="(item,index) in column" :key="index" class="columnItem">
          <img v-lazy="item.picUrl + '?imageView&quality=65&thumbnail=330x330'">
          <div class="title">{{item.title}}</div>
          <div class="articlecount">{{ item.articleCount }}</div>
        </li>
      </ul>
    </horizontal-scroll>
    <div class="recommendForyou">
      <header>为你推荐</header>
      <div v-for="(item, index) in recommend.slice(0,1)" :key="'1' + index" class="first">
        <div class="imgWrapper">
          <img v-lazy="item.picUrl + '?imageView&quality=75'" alt="">
          <div class="typename">{{ item.typeName }}</div>
        </div>
        <div class="info">
          <div>
            <span class="title">{{ item.title }}</span>
            <span class="price">{{ item.priceInfo }}元起</span>
          </div>
          <p class="subtitle">{{ item.subTitle }}</p>
        </div>
      </div>
      <div v-for="(item, index) in recommend.slice(1)" :key="'2' + index" class="other">
        <div class="info">
          <div class="name">
            <img v-lazy="item.avatar + '?imageView&amp;quality=75&amp;thumbnail=48y48'" alt="avator">
            {{ item.nickname }}
          </div>
          <p class="title">{{ item.title }}</p>
          <p class="subTitle">{{ item.subTitle }}</p>
        </div>
        <div class="image">
          <img v-lazy="item.picUrl + '?imageView&amp;quality=75'" alt="">
          <div class="typename">{{ item.typeName }}</div>
        </div>
      </div>
    </div>
    <div class="recommendForyou zhen">
      <header>严选甄品</header>
      <div v-for="(item, index) in zhen.slice(0,1)" :key="'21' + index" class="first">
        <div class="imgWrapper">
          <img v-lazy="item.picUrl + '?imageView&quality=75'" alt="">
          <div class="typename">{{ item.typeName }}</div>
        </div>
        <div class="info">
          <div>
            <span class="title">{{ item.title }}</span>
            <span class="price">{{ item.priceInfo }}元起</span>
          </div>
          <p class="subtitle">{{ item.subTitle }}</p>
        </div>
      </div>
      <div v-for="(item, index) in zhen.slice(1)" :key="'22' + index" class="other">
        <div class="info">
          <div class="name">
            <img v-lazy="item.avatar + '?imageView&amp;quality=75&amp;thumbnail=48y48'" alt="avator">
            {{ item.nickname }}
          </div>
          <p class="title">{{ item.title }}</p>
          <p class="subTitle">{{ item.subTitle }}</p>
        </div>
        <div class="image">
          <img v-lazy="item.picUrl + '?imageView&amp;quality=75'" alt="">
          <div class="typename">{{ item.typeName }}</div>
        </div>
      </div>
    </div>
    <div class="yxLook" v-if="yxLook">
      <header>严选LOOK</header>
      <img v-lazy="yxLook.picUrl + '?imageView&amp;quality=75'">
      <div class="info">
        <div class="user">
          <img v-lazy="yxLook.avatar + '?imageView&amp;quality=75&amp;thumbnail=48y48'" class="avator">
          {{ yxLook.nickname }}
        </div>
        <div class="content">{{ yxLook.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalScroll from '../../components/HorizontalScroll'
import ShiwuAPI from '../../service/shiwu'
export default {
  components: {
    HorizontalScroll
  },
  data () {
    return {
      banner: [],
      column: [],
      recommend: [],
      zhen: [],
      yxLook: null,
      tenfifteen: [],
      findmore: [],
      hasmore: false,
      swiperOption: {
        notNextTick: true,
        loop: true,
        loopAdditionalSlides: 1,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        centeredSlides: true,
        effect: 'coverflow',
        slidesPerView: 1.1,
        coverflowEffect: {
          rotate: 0,
          stretch: -4,
          depth: 0,
          modifier: 2,
          slideShadows: false
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
    column () {
      this._initColumnList()
    }
  },
  mounted () {
    ShiwuAPI.getShiwuIndex().then(res => {
      if (res.data.errcode) {
        console.log(res.data.message)
      } else {
        this.banner = res.data.data.banner
        this.column = res.data.data.column
        this.recommend = [res.data.data.recommendOne, res.data.data.recommendTwo, res.data.data.recommendThree]
        this.zhen = [res.data.data.zhenOne, res.data.data.zhenTwo, res.data.data.zhenThree]
        this.yxLook = res.data.data.yxLook
        this.tenfifteen = res.data.data.tenfifteen
        console.log(this.yxLook)
      }
    })
  },
  methods: {
    _initColumnList () {
      if (this.column.length > 0) {
        this.$nextTick(() => {
          const arr = document.querySelectorAll('.columnItem')
          if (!arr.length) {
            return
          }
          const li = arr[0]
          let ulwidth = li.clientWidth * (arr.length + 1)
          this.$refs.columnList.style.width = `${ulwidth + 32}px`
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.shiwu
  width 100%
  min-height 100vh
  margin-bottom 98px
.swiper-box
  width 100%
  height 433px
  overflow hidden
  background white
.swiper-slide
  padding 24px 0
  height 433px
  width 100%
  box-sizing border-box
  p
    position relative
    width 100%
    height 100%
    box-sizing border-box
  img
    border-radius 8px
    width 100%
    height 100%
  .info
    position absolute
    top 94px
    left 112px
    width 466px
    height 198px
    background rgba(255,255,255,.9)
    .cate
      margin-top 30px
      font-size 20px
      color #7f7f7f
      text-align center
      .before,.after
        display inline-block
        width 20px
        height 2px
        background #7f7f7f
        vertical-align middle
      .before
        margin-right 8px
      .after
        margin-left 4px
    .title
      margin-top 30px
      height 48px
      font-size 32px
      font-weight bold
      color #333
      text-align center
    .desc
      margin-top 4px
      text-align center
      color #333
      font-size 20px
.localscrollWrapper
  width 100%
  height 286px
  overflow hidden
  padding 32px 30px 28px 30px
  margin-bottom 20px
  box-sizing border-box
  background white
  .columnList
    display block
    white-space nowrap
  .columnItem
    display inline-block
    width 164px
    height 210px
    margin-right 24px
    overflow hidden
    position relative
    img
      width 164px
      height 164px
      margin-bottom 20px
      border-radius 6px
    .title
      text-align center
      font-size 20px
      color #333333
    .articlecount
      position absolute
      top 0
      right 0
      color white
      font-size 20px
      line-height 32px
      text-align right
      min-width 116px
      background-image url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/rbGradient-049c62dfb5.png')
      background-repeat no-repeat
      background-size 100% 100%
      background-position center right
.recommendForyou
  margin 0 0 20px 0
  padding 0 30px 40px 30px
  box-sizing border-box
  width 100%
  background white
  header
    height 120px
    text-align center
    line-height 120px
    font-size 32px
    color #333
  .first
    border 1px solid #d9d9d9
    border-radius 8px
    overflow hidden
    box-sizing border-box
    margin-bottom 30px
    .imgWrapper
      width 100%
      overflow hidden
      position relative
      img
        width 100%
      .typename
        position absolute
        top 20px
        left 20px
        height 36px
        background white
        border 1px solid #d9d9d9
        border-radius 18px
        font-size 24px
        line-height 36px
        padding 0 16px
        box-sizing border-box
    .info
      padding 24px 20px 67px 20px
      box-sizing border-box
      width 100%
      height 184px
      &>div
        margin-bottom 19px
      .title,.price
        font-size 36px
        line-height 42px
        color #333
      .price
        float right
      .subtitle
        font-size 28px
        line-height 32px
        color #7f7f7f
  .other
    border 1px solid #d9d9d9
    border-radius 8px
    overflow hidden
    box-sizing border-box
    margin-bottom 30px
    display flex
    height 278px
    .info
      flex 1
      padding 0 30px 0 20px
      display flex
      flex-direction column
      justify-content center
      .name
        height 48px
        margin 0  0 25px 0
        font-size 20px
        line-height 48px
        color #333
        img
          border-radius 50%
          width 44px
          height 44px
          vertical-align top
          margin-top 2px
      .title
        height 38px
        margin-bottom 14px
        font-size 32px
        line-height 38px
        color #333333
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        max-width 326px
      .subTitle
        height 70px
        color #7f7f7f
        font-size 22px
        overflow hidden
        text-overflow ellipsis
        line-height 35px
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 2
    .image
      width 280px
      overflow hidden
      position relative
      img
        width 100%
      .typename
        position absolute
        top 10px
        left 10px
        height 36px
        background white
        border 1px solid #d9d9d9
        border-radius 18px
        font-size 24px
        line-height 36px
        padding 0 16px
        box-sizing border-box
.yxLook
  background white
  width 100%
  overflow hidden
  header
    height 120px
    text-align center
    line-height 120px
    font-size 32px
    color #333
  &>img
    width 100%
  .info
    padding 24px 30px 46px 30px
  .user
    height 48px
    margin 0  0 24px 0
    font-size 20px
    line-height 48px
    color #333
    img
      border-radius 50%
      width 44px
      height 44px
      vertical-align top
      margin-top 2px
      margin-right 10px
  .content
    font-size 28px
    color #7f7f7f
    line-height 44px
</style>
