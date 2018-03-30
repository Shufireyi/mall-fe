<template>
  <transition name="goodInfofadeIn" mode="out-in">
    <router-link v-if="good" class="wrapper" tag="div" :to="{ name: 'GoodsDetail', params: { id: good.id }}">
      <div class="img">
        <img v-lazy="good.listPicUrl + '?imageView&amp;quality=65&amp;thumbnail=330x330'" alt="">
        <div class="desc">{{ good.simpleDesc }}</div>
        <div class="choice" v-if="good.productPlace !== ''">
          <span v-for="(char, index) in _String2Array(good.productPlace)" :key="index">{{ char }}</span>
        </div>
        <div class="choice" v-if=" good.productPlace === '' && good.colorNum">
          <span>{{ good.colorNum }}</span>
          <span>色</span>
          <span>可</span>
          <span>选</span>
        </div>
      </div>
      <div class="info">
        <div class="tag" v-if="good.itemTagList.length > 0">
          <span v-for="(tag,index) in good.itemTagList" :key="index" :class="tag.name === '爆品' ? 'red' : 'orange'">{{ tag.name }}</span>
        </div>
        <div class="name">{{ good.name }}</div>
        <div class="price">&yen;{{ good.retailPrice }}</div>
      </div>
    </router-link>
  </transition>
</template>

<script>
export default {
  props: {
    good: {
      expected: Object,
      default: null
    }
  },
  methods: {
    _String2Array(string) {
      return [...string]
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 345px
  vertical-align top
  display inline-block
  background white
  .img
    width 100%
    background-color #f4f4f4
    position relative
    img
      width 100%
      height 345px
    .desc
      background #f1ece2
      color #9F8A60
      letter-spacing 0
      height 68px
      padding 20px 10px
      font-size 24px
      line-height 28px
      box-sizing border-box
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
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
  .info
    .tag
      box-sizing border-box
      margin 20px 0 0 4px
      padding 0 0 0 10px
      height 30px
      span
        display inline-block
        padding 5px 16px
        font-size 20px
        line-height 20px
        height 20px
        color white
        vertical-align top
        margin-left 12px
        &.red
          background-color #e5686d
        &.orange
          background-color #f48f18
        &:first-child
          margin-left 0
    .name
      box-sizing border-box
      margin 10px 0 0 0
      padding 0 10px
      height 48px
      font-size 28px
      line-height 48px
      color #333
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .price
      padding 0 10px
      margin 0
      height 32px
      line-height 32px
      font-size 32px
      color #b4282d
.goodInfofadeIn-enter-active,
.goodInfofadeIn-leave-active
  transition  opacity  .5s

.goodInfofadeIn-enter,
.goodInfofadeIn-leave-to
  opacity 0
</style>
