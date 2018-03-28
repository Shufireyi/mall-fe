<template>
  <b-scroll class="brandDetailWrapper" :data="goodsList">
    <div>
      <header v-if="appListPicUrl">
        <img v-lazy="appListPicUrl + '?imageView&quality=65'">
        <div class="info">
          <p class="name">{{ name }}</p>
          <p class="desc" v-for="(line, index) in simpleDesc.split(/\n/)" :key="index">
            {{line}}
          </p>
        </div>
      </header>
      <div class="contition">
        <span class="item">综合</span>
        <span class="item">上新
          <i></i>
        </span>
        <span class="item">价格
          <i></i>
        </span>
      </div>
      <div class="goodsWrapper" v-if="goodsList.length">
        <good-info v-for="goodItem in goodsList" :key="goodItem.id" :good="goodItem" class="goodItem"></good-info>
      </div>
    </div>
  </b-scroll>
</template>

<script>
import BrandAPI from '../../../../service/homeOther'
import BScroll from '../../../../components/Scroll'
import GoodInfo from '../../GoodInfo'
export default {
  components: {
    BScroll,
    GoodInfo
  },
  data() {
    return {
      params: {
        tagId: 0,
        page: 1,
        size: 100,
        sortType: 0,
        descSorted: true,
        categoryId: 0
      },
      appListPicUrl: null,
      name: null,
      simpleDesc: null,
      goodsList: []
    }
  },
  watch: {
    '$route': 'reFresh'
  },
  mounted() {
    this.reFresh()
  },
  methods: {
    reFresh() {
      if (!this.$route.params.id) {
        return
      }
      this.params.tagId = this.$route.params.id
      this.appListPicUrl = this.$route.query.appListPicUrl
      this.name = this.$route.query.name
      this.simpleDesc = this.$route.query.simpleDesc
      BrandAPI.getBrandDetail(this.params).then(res => {
        console.log(res.data)
        this.goodsList = res.data.data.result.result
      })
    }
  },
  beforeRouteEnter(to, form, next) {
    window.scrollTo(0, 0)
    next()
  }
}
</script>

<style lang="stylus" scoped>
.brandDetailWrapper
  height 100vh
header
  background-color white
  border-bottom 20px solid #f4f4f4
  img
    width 100%
    height 400px
  .info
    background-color white
    margin-top 19px
    padding 0 30px 36px 30px
    .name
      color #333
      font-weight bold
      line-height 56px
      height 56px
      font-size 36px
    .desc
      margin-top 12px
      color #666
      font-size 28px
      line-height 42px
.contition
  height 81px
  width 100%
  background white
  display flex
  align-items center
  justify-content space-between
  .item
    flex-grow 1
    display inline-block
    text-align center
    color #333
    font-size 28px
    position relative
    &.active
      color #b4282d
    i
      display inline-block
      width 15px
      height 21px
      margin-left 8px
      background-position center center
      background-repeat no-repeat
      background-size 15px 21px
      position absolute
      left 160px
      top 2px
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-648460126c.png')
    i.up
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-f22085ade1.png')
    i.down
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-a40f8bd193.png')
.goodsWrapper
  background #fff
  padding-bottom 100px
  .goodItem
    vertical-align top
    &:nth-child(even)
      padding 0 10px 33px 20px
    &:nth-child(odd)
      padding 0 20px 33px 10px
</style>
