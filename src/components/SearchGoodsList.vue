<template>
  <div class="outerWrapper">
    <div class="searchInput">
      <p>
        <i class="fa fa-search" aria-hidden="true"></i>{{ keyword }}</p>
    </div>
    <div class="contition">
      <span class="item active changeParamButton" @click.stop="changeParams(0)">综合</span>
      <span class="item changeParamButton" @click.stop="changeParams(1)">价格
        <i class="sortArrow"></i>
      </span>
    </div>
    <div class="goodsWrapper" v-if="serachAnswer.length">
      <good-info v-for="good in serachAnswer" :key="good.id" :good="good" class="goodItem"></good-info>
    </div>
  </div>
</template>

<script>
import searchAPI from '../service/homeOther'
import GoodInfo from '../views/home/GoodInfo'
export default {
  components: {
    GoodInfo
  },
  data() {
    return {
      keyword: '',
      params: {
        keyword: '',
        sortType: 0,
        descSorted: true,
        categoryId: 0,
        matchType: 0,
        floorPrice: -1,
        upperPrice: -1,
        size: 40,
        itemId: 0,
        stillSearch: false,
        _stat_search: 'userhand'
      },
      serachAnswer: []
    }
  },
  mounted() {
    this.keyword = this.$route.params.keyword
    this.params.keyword = this.$route.params.keyword
    this.refresh()
  },
  methods: {
    refresh() {
      searchAPI.searchGoodsByStr(this.params).then(res => {
        console.log(res.data)
        if (res.data.errcode) {
          console.log(res.data)
        } else {
          this.serachAnswer = res.data.data.data.directlyList
          if (res.data.data.data.hasMore) {
            this.params.itemId = this.serachAnswer[this.serachAnswer.length - 1].id
          } else {
            this.params.itemId = 0
          }
        }
      })
    },
    changeParams(type) {
    }
  }
}
</script>

<style lang="stylus" scoped>
.outerWrapper
  min-height 100vh
.searchInput
  display block
  box-sizing border-box
  text-align left
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
.contition
  border-top 1px solid #efefef
  border-bottom 1px solid #efefef
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
      left 210px
      top 2px
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-648460126c.png')
    &.active i.up
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-f22085ade1.png')
    &.active i.down
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-a40f8bd193.png')
.goodsWrapper
  background #fff
  padding-top 30px
  .goodItem
    vertical-align top
    &:nth-child(even)
      padding 0 10px 33px 20px
    &:nth-child(odd)
      padding 0 20px 33px 10px
</style>
