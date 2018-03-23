<template>
  <div class="shopcart">
    <header>
      购物车
      <span class="edit" v-if="goodsList.length > 0">编辑</span>
    </header>
    <div class="ad" v-if="totalCost < 88">
      <span class="adItem">
        <i class="dot"></i>30天无忧退货</span>
      <span class="adItem">
        <i class="dot"></i>48小时快速退款</span>
      <span class="adItem">
        <i class="dot"></i>满88元免邮费</span>
    </div>
    <div class="baoyou" v-if="totalCost >= 88">
      已满足免邮条件
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="goodsList.length > 0" key="hasGoods">
        <transition-group name="deleteGoodsItem" tag="ul" class="goodsList">
          <li v-for="(goodsItem, index) in goodsList" :key="goodsItem.itemId" @touchstart="touchStartHandler(index)" @touchmove="touchmoveHandler(index)" class="goodsItem" ref="goodsItem">
            <i class="checkoutBox" :class="goodsItem.checked ? 'checked' : ''" @click="toggleChecked(goodsItem, index)" ref="goodsItemCheckBox"></i>
            <img v-lazy="goodsItem.pic + '?imageView&thumbnail=160x0&quality=75'">
            <div class="info">
              <p class="name">{{ goodsItem.itemName }}</p>
              <p class="kind">{{ goodsItem.specList[0].specValue }}</p>
              <p class="price">&yen;{{ goodsItem.actualPrice }}</p>
            </div>
            <div class="deleteItem" @click="deleteGoodItem(goodsItem, index)">
              <i></i>
            </div>
            <div class="bottomLine"></div>
          </li>
        </transition-group>
        <div class="primaryInfo">
          <i :class="checkedAll ? 'checked' : ''" @click="checkedALL"></i>
          <span class="selectedNum">已选({{ totalCount }})</span>
          <div>
            <span class="price">&yen;{{ totalCost }}</span>
            <button class="takeOrder" :class="totalCount > 0 ? 'canTakeOrder' : ''" :disabled="totalCount > 0 ? false : true">下单</button>
          </div>
        </div>
      </div>
      <div v-else key="noGoods" class="noGoods"></div>
    </transition>
  </div>
</template>

<script>
const goodsList = [
  {
    actualPrice: 1599,
    itemId: 1497001,
    itemName: '智能马桶盖',
    limitPurchaseCount: 0,
    limitPurchaseFlag: false,
    pic: 'http://yanxuan.nosdn.127.net/e1d26a4afb53d3eb0827f76fb13bdade.png',
    specList: [{ specName: '颜色', specValue: '白色' }],
    checked: true,
    cnt: 1
  }, {
    actualPrice: 249,
    itemId: 1113019,
    itemName: '20寸PC膜拉链登机箱',
    limitPurchaseCount: 0,
    limitPurchaseFlag: false,
    pic: 'http://yanxuan.nosdn.127.net/cbe1741ac4ade4e39572e03027329747.png',
    specList: [{ specName: '颜色', specValue: '红色' }],
    checked: true,
    cnt: 1
  },
  {
    actualPrice: 1599,
    itemId: 149700,
    itemName: '智能马桶盖',
    limitPurchaseCount: 0,
    limitPurchaseFlag: false,
    pic: 'http://yanxuan.nosdn.127.net/e1d26a4afb53d3eb0827f76fb13bdade.png',
    specList: [{ specName: '颜色', specValue: '白色' }],
    checked: true,
    cnt: 1
  }
]
export default {
  data() {
    return {
      goodsList
    }
  },
  computed: {
    totalCount() {
      let i = 0
      this.goodsList.forEach(item => {
        if (item.checked) {
          i++
        }
      })
      return i
    },
    totalCost() {
      let totalCost = 0
      this.goodsList.forEach(item => {
        if (item.checked) {
          totalCost += item.actualPrice * item.cnt
        }
      })
      return totalCost
    },
    checkedAll() {
      return this.totalCount === this.goodsList.length && this.totalCount !== 0
    }
  },
  methods: {
    touchStartHandler(index) {
      if (this.$refs.goodsItem[index].style.transform) {
        this.$refs.goodsItem[index].style.transform = ''
      }
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
    },
    touchmoveHandler(index) {
      this.endX = event.touches[0].clientX
      this.endY = event.touches[0].clientY
      let deltaX = this.endX - this.startX
      if (deltaX < 0 && Math.abs(deltaX) > 30) {
        this.$refs.goodsItem.forEach(function(element) {
          element.style.transform = ''
        })
        this.$refs.goodsItem[index].style.transform = `translate3d(-70px, 0, 0)`
      } else if (deltaX > 0 && Math.abs(deltaX) > 80) {
        this.$refs.goodsItem[index].style.transform = ''
      }
    },
    deleteGoodItem(goods, index) {
      this.goodsList.splice(index, 1)
    },
    toggleChecked(goods, index) {
      this.goodsList[index].checked = !this.goodsList[index].checked
    },
    checkedALL() {
      if (this.totalCount === this.goodsList.length) {
        this.goodsList.forEach(item => {
          item.checked = false
        })
      } else {
        this.goodsList.forEach(item => {
          item.checked = true
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.shopcart
  width 100%
  min-height 100vh
  overflow hidden
header
  height 88px
  padding 0 30px
  line-height 88px
  color #333
  background white
  text-align center
  position relative
  .edit
    position absolute
    right 30px
.ad
  height 70px
  display flex
  justify-content space-between
  padding 0 30px
  box-sizing border-box
  .adItem
    color #666
    font-size 24px
    line-height 70px
  .dot
    display inline-block
    width 10px
    height 10px
    margin-right 6px
    vertical-align middle
    background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/servicePolicy-1d7541974f.png')
    background-size 10px 10px
    background-repeat no-repeat
.baoyou
  height 70px
  padding 0 30px
  background #fff8d8
  color #f48f18
  line-height 70px
  font-size 28px
.goodsList
  margin-bottom 196px
  .goodsItem
    display flex
    background white
    padding 0 30px 0 90px
    box-sizing border-box
    position relative
    align-items center
    height 208px
    transition all .4s
    .bottomLine
      position absolute
      height 1px
      background-color #d9d9d9
      width 200%
      bottom 0
      left 90px
      transform translate3d(0, 50%, 0)
    &:last-of-type .bottomLine
      display none
    .checkoutBox
      display inline-block
      position absolute
      width 38px
      height 38px
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png')
      background-repeat no-repeat
      background-size 38px 486px
      background-position 0 -145px
      left 26px
      &.checked
        background-position 0 -193px
    img
      width 160px
      height 160px
      background-color #f4f4f4
      margin-right 20px
    .info
      height 160px
      .name
        height 32px
        margin-bottom 10px
        color #333
        font-size 28px
        line-height 32px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .kind
        height 27px
        margin-bottom 28px
        color #666
        line-height 27px
        font-size 24px
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
      .price
        height 32px
        color #333
        line-height 32px
        font-size 28px
        text-overflow ellipsis
        white-space nowrap
        overflow hidden
    .deleteItem
      background #e83a3a
      width 140px
      height 208px
      position absolute
      left 100vw
      display flex
      align-items center
      justify-content center
      i
        display inline-block
        width 42px
        height 42px
        background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/trash-e0e4f39c2b.png')
        background-repeat no-repeat
        background-size 42px 42px
.primaryInfo
  height 96px
  width 100%
  background-color white
  position fixed
  bottom 100px
  display flex
  align-items center
  justify-content space-between
  padding-left 90px
  box-sizing border-box
  i
    display inline-block
    position absolute
    width 38px
    height 38px
    background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png')
    background-repeat no-repeat
    background-size 38px 486px
    background-position 0 -145px
    left 26px
    &.checked
      background-position 0 -193px
  .selectedNum
    color #333
    font-size 28px
  .price
    color #b4282d
    margin-right 30px
    font-size 28px
  .takeOrder
    outline none
    border none
    color white
    background #ccc
    width 226px
    height 96px
    font-size 28px
    letter-spacing 4px
  .canTakeOrder
    background-color #b4282d
.noGoods
  width 100%
  height 500px
  background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-a8fe3f12e5.png')
  background-repeat no-repeat
  background-position center center
  background-size 300px
.deleteGoodsItem-leave-to
  opacity 0
  transform translate3d(100vw, 0, 0)
.deleteGoodsItemt-move
  transition all .4s
.deleteGoodsItem-leave-active
  position absolute!important
.fade-enter-active, .fade-leave-active
  transition all .2s
.fade-enter, .fade-leave-to
  opacity 0
</style>
