<template>
  <b-scroll ref="scroll" :data="brandList" :pullup="true" @scrollToEnd="onPullingUp" class="wrapper">
    <div>
      <div v-for="item in brandList" :key="item.id" class="brandItem">
        <div class="imgWrapper">
          <img v-lazy="item.appListPicUrl + '?imageView&quality=65'">
        </div>
        <div class="info">
          <div class="name">{{ item.name }}
            <span class="price">{{ item.floorPrice }}元起</span>
          </div>
          <div class="desc">{{ item.simpleDesc }}</div>
        </div>
        <div class="imgItem">
          <span v-for="img in item.showItemList" :key="img.id">
            <img v-lazy="img.listPicUrl + '?imageView&quality=65'">
          </span>
        </div>
      </div>
      <div class="hasMore" v-if="hasMore && firstShow">上拉加载...</div>
      <div class="hasMore" v-if="!hasMore && firstShow">没有数据啦^_^</div>
      <loading v-if="loading" class="loading"></loading>
    </div>
  </b-scroll>
</template>

<script>
import BrandAPI from '../../../../service/homeOther'
import BScroll from '../../../../components/Scroll'
import Loading from '../../../../components/Loading'
export default {
  components: {
    BScroll,
    Loading
  },
  data() {
    return {
      brandList: [],
      itemIndex: 0,
      hasMore: false,
      firstShow: false,
      loading: true
    }
  },
  mounted() {
    document.querySelectorAll('.navbar')[0].style.display = 'none'
    BrandAPI.getBrandList({
      limitOffset: 0,
      limitSize: 20
    }).then(res => {
      if (res.errcode) {
        console.log(res.data)
      } else {
        this.brandList = this.brandList.concat(res.data.data)
        if (this.brandList.length >= 20) {
          this.hasMore = true
        }
        this.firstShow = true
      }
      this.loading = false
    })
  },
  methods: {
    onPullingUp() {
      if (!this.hasMore) {
        return
      }
      // 更新数据
      this.loading = true
      BrandAPI.getBrandList({
        limitOffset: this.brandList.length,
        limitSize: 20
      }).then(res => {
        this.loading = false
        if (res.errcode) {
          console.log(res.data)
          this.hasMore = false
        } else {
          if (res.data.data.length > 0) {
            this.brandList = this.brandList.concat(res.data.data)
          } else {
            this.hasMore = false
          }
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
    document.querySelectorAll('.navbar')[0].style.display = 'flex'
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  height 100vh
  width 100vw
  overflow hidden
.brandItem
  width 100%
  overflow hidden
  height 724px
  background white
  margin-bottom 20px
  .imgWrapper
    width 100%
    height 320px
    img
      width 100%
      height 100%
  .info
    padding 34px 30px 0 30px
    background-color white
    .name
      height 40px
      margin-bottom 20px
      font-size 36px
      line-height 40px
      color #000
      font-weight 700
      span
        float right
        color #B4282D
        font-size 28px
        line-height 40px
    .desc
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      line-height 24px
      font-size 24px
      color #333
      margin-bottom 20px
  .imgItem
    display flex
    justify-content space-between
    padding-bottom 16px
    span
      display inline-block
      width 250px
      height 250px
    img
      width 100%
      height 100%
.hasMore
  color #333
  font-size 24px
  text-align center
  height 60px
  line-height 40px
.loading
  margin-top 30px!important
  padding-bottom 20px
</style>
