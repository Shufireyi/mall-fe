<template>
  <div class="layout" v-if="data">
    <div class="banner">
      <img v-lazy="data.currentCategory.bannerUrl + '?quality=85&thumbnail=750x0&imageView'">
    </div>
    <div class="cateWrapper" v-for="(cate, index) in data.categoryItemList" :key="index">
      <div class="title">{{ cate.category.name }}</div>
      <good-info v-for="(good, i) in cate.itemList" :key="i" :good="good" class="goodItem"></good-info>
    </div>
  </div>
</template>

<script>
import GoodInfo from './GoodInfo'
export default {
  props: {
    data: {
      expected: Object,
      default: null
    }
  },
  components: {
    GoodInfo
  },
  watch: {
    data () {
      console.log(this.data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner
  width 100%
  height 420px
  margin-bottom 20px
  img
    width 100%
    height 420px
.cateWrapper
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
</style>
