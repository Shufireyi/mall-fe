<template>
  <div class="puterWrapper">
    <img src="http://yanxuan.nosdn.127.net/4dfa65f3d16bd006bb93eabea21f1c7b.jpg?imageView&amp;thumbnail=750x0&amp;quality=75">
    <loading v-if="!tableList.length"></loading>
    <div class="popularType" v-if="tableList.length">
      <span v-for="(item, index) in popularTypeList" :key="index" @click="changePopularType(index)" ref="popularTypeItem">
        {{ item }}
      </span>
      <i class="greyLine"></i>
    </div>
    <div class="goodsWrapper" v-if="tableList.length">
      <good-info v-for="good in tableList[activeIndex].itemList" :key="good.id" :good="good" class="goodItem"></good-info>
    </div>
  </div>
</template>

<script>
import PopularAPI from '../../../../service/homeOther'
import GoodInfo from '../../GoodInfo'
import Loading from '../../../../components/Loading'
export default {
  components: {
    GoodInfo,
    Loading
  },
  data() {
    return {
      popularTypeList: [],
      tableList: [],
      activeIndex: 0
    }
  },
  mounted() {
    PopularAPI.getPopularRecommendGoods().then(res => {
      if (res.data.errcode) {
        console.log(res.data)
      } else {
        let temppopularTypeList = []
        res.data.data.tabList.forEach((element) => {
          temppopularTypeList.push(element.name)
        })
        this.popularTypeList = temppopularTypeList
        this.tableList = res.data.data.tabList
        this.$nextTick(() => {
          this.$refs.popularTypeItem[0].classList.add('active')
        })
      }
    })
  },
  methods: {
    changePopularType(index) {
      this.activeIndex = index
      const array = this.$refs.popularTypeItem
      array.forEach(element => {
        element.classList.remove('active')
      })
      array[index].classList.add('active')
    }
  }
}
</script>

<style lang="stylus" scoped>
.puterWrapper
  width 100%
  min-height 100vh
  font-size 0
  &>img
    width 100%
.popularType
  display flex
  justify-content space-between
  align-items center
  padding 0 30px
  background #fff
  position relative
  span
    padding 0 16px
    font-size 28px
    line-height 76px
    height 80px
    box-sizing border-box
    color #333
    &.active
      color rgb(180, 40, 45)
      border-bottom 4px solid rgb(180, 40, 45)
  .greyLine
    position absolute
    height 1px
    width 100%
    background-color rgba(51, 51, 51, 0.22)
    bottom 0
    left 0
.goodsWrapper
  padding-top 20px
  padding-bottom 100px
  background #fff
  .goodItem
    background #fff
    &:nth-child(even)
      padding 0 10px 33px 20px
    &:nth-child(odd)
      padding 0 20px 33px 10px
</style>
