<template>
  <div id="app">
    <router-view/>
    <transition name='fadeIn'>
      <div class="goTop" @click.stop.prevent="scrollToTop" v-if="showGoTop">
        <i class="fa fa-angle-top"></i>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      showGoTop: false
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let yScroll = 0
        if (self.pageYOffset) {
          yScroll = self.pageYOffset
        } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
          yScroll = document.documentElement.scrollTop
        } else if (document.body) {
          yScroll = document.body.scrollTop
        }
        console.log(yScroll)
        this.showGoTop = window.innerHeight < yScroll
      }, 50)
    })
  },
  methods: {
    scrollToTop (scrollDuration) {
      scrollDuration = 600
      let cosParameter = window.scrollY / 2
      let scrollCount = 0
      let oldTimestamp = performance.now()
      function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
        if (scrollCount >= Math.PI) window.scrollTo(0, 0)
        if (window.scrollY === 0) return
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)))
        oldTimestamp = newTimestamp
        window.requestAnimationFrame(step)
      }
      window.requestAnimationFrame(step)
    }
  }
}
</script>

<style lang="stylus">
@import './utils/stylus/base.styl'
* {
  padding 0
  margin 0
}

img {
  content normal !important
}

.swiper-pagination-bullet
  width 18px
  height 18px
  display inline-block
  border-radius 50%
  background #000
  opacity .2
.swiper-pagination-bullet-active
  background-color white
  opacity .7

#app
  width 100%
  overflow hidden

.goTop
  position fixed
  bottom 120px
  right 23px
  width 80px
  height 80px
  border-radius 50%
  background-image url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/goToTop-7a19216f77.png')
  background-size 80px 80px
  background-repeat no-repeat

.fadeIn-enter-active,
.fadeIn-leave-active
  transition  all .5s

.fadeIn-enter,
.fadeIn-leave-to
  opacity 0
</style>
