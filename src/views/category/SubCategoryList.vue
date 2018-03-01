<template>
  <scroll :data="sublinks">
    <div class="wrapper">
      <div class="imgWrapper">
        <img v-lazy="bannerURL">
      </div>
      <p class="title">
        <span class="before"></span>
        {{name}}分类
        <span class="after"></span>
      </p>
      <div class="subWrapper" v-if="sublinks.length">
        <div v-for="(item, index) in sublinks" :key="index">
          <img v-lazy=" item.wapBannerUrl + '?imageView&quality=85&thumbnail=144x144'">
          <div class="title">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import CategoryAPI from '../../service/category'
import Scroll from '../../components/Scroll'

export default {
  components: {
    Scroll
  },
  data () {
    return {
      sublinks: []
    }
  },
  mounted () {
    this._initSubCate()
  },
  computed: {
    bannerURL () {
      return `${this.$route.params.banner}?imageView&thumbnail=0x196&quality=75`
    },
    name () {
      return this.$route.params.name
    }
  },
  watch: {
    '$route' () {
      this._initSubCate()
    }
  },
  methods: {
    _initSubCate () {
      if (!this.$route.params.subcate) {
        return
      }
      if (this.$route.params.subcate.length === 0) {
        console.log(this.$route.params.id)
        CategoryAPI.getSubCategory(this.$route.params.id).then(res => {
          this.sublinks = res.data.data
        })
      } else {
        this.sublinks = this.$route.params.subcate
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!from.name) {
      window.location.href = '/categories'
    }
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../utils/stylus/mixin.styl'

.wrapper
  width 100%
  overflow hidden
  padding 30px 30px 21px 30px
  box-sizing border-box
.imgWrapper
  width 100%
  height 192px
  overflow hidden
  border-radius 8px
  img
    width 100%
    height 100%
.title
  width 100%
  height 108px
  font-size 24px
  line-height 108px
  color #333
  text-align center
  position relative
  .before,.after
    display inline-block
    box-sizing border-box
    width 40px
    height 2px
    background #d9d9d9
    vertical-align middle
  .before
    margin-right 14px
  .after
    margin-left 14px
.subWrapper
  div
    display inline-block
    height 216px
    width 144px
    overflow hidden
    margin 0 34px 0 0
    &:nth-child(3n+0)
      margin 0
    img
      width 144px
      height 144px
    .title
      font-size 24px
      line-height 28px
      color #333
      text-align center
</style>
