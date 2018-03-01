<template>
  <div v-if="limitSale" class="limitSale">
    <div class="time">
      <div class="title">严选限时购</div>
      <div class="clock">
        <span class="h">{{ remainTime.h }}</span>
        <span class="dot">:</span>
        <span class="m">{{ remainTime.m }}</span>
        <span class="dot">:</span>
        <span class="s">{{ remainTime.s }}</span>
      </div>
      <div class="next">下一场<span>{{ nextTime }}</span>开始</div>
    </div>
    <div class="img">
      <img v-lazy="limitSale.primaryPicUrl+'?imageView&quality=85&thumbnail=330x330'">
      <div class="price">
        <p class="activityPrive"><span class="char">&yen;</span>{{limitSale.activityPrice}}</p>
        <p class="originPrice"><span class="char">&yen;</span>{{limitSale.originPrice}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import HomeAPI from '../../../service/home'
import { getTimeFromSeconds, formatTime } from '../../../utils/time'

export default {
  data () {
    return {
      limitSale: null,
      nextTime: '00:00'
    }
  },
  computed: {
    remainTime () {
      if (!this.limitSale) {
        return
      }
      if (this.limitSale.remainTime) {
        return getTimeFromSeconds(this.limitSale.remainTime)
      }
      return getTimeFromSeconds(0)
    }
  },
  mounted () {
    HomeAPI.getLimitTimeSale().then(res => {
      if (res.errcode) {
        console.log(res.message)
      } else {
        this.limitSale = res.data.data
        this.nextTime = formatTime(this.limitSale.nextStartTime, 'hh:mm')
        this.timer = setInterval(() => {
          if (this.limitSale.remainTime <= 0) {
            this.limitSale.remainTime = 0
            clearInterval(this.timer)
          } else {
            this.limitSale.remainTime -= 1000
          }
        }, 1000)
      }
    })
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="stylus" scoped>
.limitSale
  padding 30px 40px 30px 56px
  margin 0 0 20px 0
  background white
  display flex
  justify-content space-between
  .time
    flex 1
    display flex
    flex-direction column
    justify-content center
    .title
      margin-bottom 24px
      height 36px
      font-size 36px
      color #333
      letter-spacing 12px
    .clock
      height 56px
      font-size 0
      .h,.m,.s
        display inline-block
        width 62px
        height 56px
        font-size 32px
        line-height 56px
        text-align center
        color white
        background-color #444
        border-radius 4px
      .dot
        display inline-block
        width 20px
        height 56px
        font-size 32px
        line-height 56px
        text-align center
        color #333333
    .next
      margin-top 40px
      height 24px
      font-size 24px
      span
        margin 0 6px
  .img
    width 320px
    height 320px
    position relative
    img
      width 100%
      heihgt 100%
  .price
    position absolute
    right 20px
    bottom 36px
    background rgba(244,143,24,.95)
    color white
    font-size 0
    width 96px
    height 96px
    border-radius 50%
    text-align center
    padding 16px 0
    box-sizing border-box
    .activityPrive, .originPrice
      font-size 28px
      line-height 32px
      position relative
      box-sizing border-box
    .originPrice
      text-decoration line-through
    .char
      font-size 24px
</style>
