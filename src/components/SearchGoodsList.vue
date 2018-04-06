<template>
  <scroll class="outerWrapper" ref="scroll" :data="serachAnswer" :pullup="true" @scrollToEnd="onPullingUp">
    <div>
      <div class="searchInput">
        <router-link tag="p" :to="{name: 'SearchPage'}">
          <i class="fa fa-search" aria-hidden="true"></i>
          {{ keyword }}
        </router-link>
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
  </scroll>
</template>

<script>
import searchAPI from '../service/homeOther'
import GoodInfo from '../views/home/GoodInfo'
import Scroll from '../components/Scroll'
export default {
  components: {
    GoodInfo,
    Scroll
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
  watch: {
    '$route': 'reFresh',
    'params.sortType': 'reFresh',
    'params.descSorted': 'reFresh'
  },
  mounted() {
    this.reFresh()
  },
  methods: {
    reFresh() {
      if (!this.$route.params.keyword) {
        this.serachAnswer = []
        return
      }
      this.keyword = this.$route.params.keyword
      this.params.keyword = this.$route.params.keyword
      searchAPI.searchGoodsByStr(this.params).then(res => {
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
      const buttonList = document.querySelectorAll('.changeParamButton')
      buttonList.forEach(element => {
        element.classList.remove('active')
      })
      buttonList[type].classList.add('active')
      switch (type) {
        case 0:
          this.params.sortType = 0
          break
        case 1:
          if (this.params.sortType === 1) {
            this.params.descSorted = !this.params.descSorted
            const temp1 = document.querySelectorAll('.sortArrow')[0]
            temp1.classList.remove('down')
            temp1.classList.remove('up')
            if (this.params.descSorted) {
              temp1.classList.add('down')
            } else {
              temp1.classList.add('up')
            }
          } else {
            this.params.sortType = 1
            this.params.descSorted = true
            const temp2 = document.querySelectorAll('.sortArrow')[0]
            temp2.classList.add('down')
          }
          break
        default:
          break
      }
    },
    onPullingUp() {
      console.log('asdvads')
    }
  }
}
</script>

<style lang="stylus" scoped>
.outerWrapper
  height 100vh
  background-color #fff
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
  padding-bottom  100px
  .goodItem
    vertical-align top
    &:nth-child(even)
      padding 0 10px 33px 20px
    &:nth-child(odd)
      padding 0 20px 33px 10px
</style>
