<template>
  <div class="category" v-if="totalGoodsNum">
    <div class="searchInput">
      <p>
        <i class="fa fa-search" aria-hidden="true"></i>搜索商品, 共{{totalGoodsNum}}款好物</p>
    </div>
    <div class="mainViewport">
      <scroll :data="mainCate" @finish="activeFirst">
        <ul class="cateScroll">
          <li v-for="(item, index) in mainCate" :key="index" ref="sublink" class="sublink" @click="changeSub(item, index)">
            {{ item.name }}
          </li>
        </ul>
      </scroll>
      <div class="subViweport">
        <loading v-if="!sublinks.length"></loading>
        <scroll :data="sublinks" v-if="sublinks.length > 0" style="height:100%">
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
              <div v-for="(item, index) in sublinks" :key="item.name + index" class="subLinkItem">
                <img v-lazy=" item.wapBannerUrl + '?imageView&quality=85&thumbnail=144x144'">
                <div class="title">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryAPI from '../../service/category'
import GoodsAPI from '../../service/goods'
import Scroll from '../../components/Scroll'
import Loading from '../../components/Loading'
export default {
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      mainCate: [],
      totalGoodsNum: 0,
      sublinks: [],
      bannerURL: '',
      name: ''
    }
  },
  mounted() {
    CategoryAPI.getMailCategory().then(res => {
      if (res.errcode) {
        console.log(res.message)
      } else {
        this.mainCate = res.data.data
      }
    })
    GoodsAPI.getAllGoodsNum().then(res => {
      this.totalGoodsNum = res.data.data
    })
  },
  methods: {
    activeFirst() {
      this.$nextTick(() => {
        this.changeSub(this.mainCate[0], 0)
      })
    },
    changeSub(item, index) {
      if (!item) {
        return
      }
      this._activeLink(index)
      this.bannerURL = item.wapBannerUrl + '?imageView&thumbnail=0x196&quality=75'
      this.name = item.name
      if (item.subCateList && item.subCateList.length === 0) {
        CategoryAPI.getSubCategory(item.id).then(res => {
          this.sublinks = res.data.data
        })
      } else {
        this.sublinks = item.subCateList
      }
    },
    _activeLink(index) {
      this.$refs.sublink.forEach(element => {
        element.classList.remove('router-link-active')
      })
      this.$refs.sublink[index].classList.add('router-link-active')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../utils/stylus/mixin.styl'

.category
  width 100%
  min-height 100vh
  background white

.searchInput
  display block
  box-sizing border-box
  text-align center
  width 100%
  height 88px
  outline none
  padding 16px 30px
  border-1px(#d9d9d9)
  p
    border-radius 5px
    background #eee
    font-size 28px
    line-height 56px
    height 56px
    color #666
  .fa-search
    font-size 26px
    margin 0 10px
    position relative
    top -1px
.mainViewport
  position fixed
  top 88px
  bottom 98px
  width 100%
  overflow hidden
  display flex
  .cateScroll
    width 162px
    display inline-block
    padding 40px 0
    overflow hidden
    box-sizing border-box
    li
      display block
      box-sizing border-box
      width 162px
      height 50px
      margin 40px 0 0 0
      font-size 28px
      line-height 50px
      color #333
      text-align center
      &:first-child
        margin 0
      &.router-link-active
        border-left 4px solid #ab2b2b
        color #ab2b2b
        font-size 32px
  .subViweport
    flex 1
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
        vertical-align top
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
