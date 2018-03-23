<template>
  <div class="category" v-if="totalGoodsNum">
    <div class="searchInput">
      <p><i class="fa fa-search" aria-hidden="true"></i>搜索商品, 共{{totalGoodsNum}}款好物</p>
    </div>
    <div class="mainViewport">
      <scroll :data="mainCate">
        <ul class="cateScroll">
          <router-link
            v-for="(item, index) in mainCate"
            :key="index"
            tag="li"
            :to="{ name: 'SubCategoryList', params: {
              id: item.id,
              name: item.name,
              banner:item.wapBannerUrl,
              subcate:item.subCateList
            }}"
            ref="sublink"
            class="sublink"
            >
            {{ item.name }}
          </router-link>
        </ul>
      </scroll>
      <keep-alive>
        <router-view class="subview"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CategoryAPI from '../../service/category'
import GoodsAPI from '../../service/goods'
import Scroll from '../../components/Scroll'

export default {
  components: {
    Scroll
  },
  data () {
    return {
      mainCate: [],
      totalGoodsNum: 0
    }
  },
  watch: {
    mainCate () {
      this.activeFirst()
    }
  },
  mounted () {
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
  activated () {
    this.activeFirst()
  },
  methods: {
    activeFirst () {
      if (!this.mainCate.length) {
        return
      }
      this.$router.push({name: 'SubCategoryList',
        params: {
          id: this.mainCate[0].id,
          name: this.mainCate[0].name,
          banner: this.mainCate[0].wapBannerUrl,
          subcate: this.mainCate[0].subCateList
        }})
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
  .subview
    flex 1
</style>
