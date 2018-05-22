<template>
  <div class="shopcart">
    <header>
      购物车
      <!-- <span class="edit" v-if="cartList.length > 0">编辑</span> -->
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
      <div v-if="cartList.length > 0" key="hasGoods">
        <transition-group name="deleteGoodsItem" tag="ul" class="cartList">
          <li v-for="(goodsItem, index) in cartList" :key="`${goodsItem.goodsId}${index}`" @touchstart="touchStartHandler(index)" @touchmove="touchmoveHandler(index)" class="goodsItem" ref="goodsItem">
            <i class="checkoutBox" :class="goodsItem.checked ? 'checked' : ''" @click="toggleChecked(goodsItem, index)" ref="goodsItemCheckBox"></i>
            <img v-lazy="goodsItem.picUrl + '?imageView&thumbnail=160x0&quality=75'">
            <div class="info">
              <p class="name">{{ goodsItem.goodsName }}</p>
              <p class="kind" v-for="sku in goodsItem.skumap" :key="sku.specValue">{{ sku.specValue }}</p>
              <p class="price">&yen;{{ goodsItem.price | formatPrice }}</p>
              <number-picker :number="goodsItem.number" class="numberPicker" @minus="minusGoodsNum(goodsItem, index)" @add="addGoodsNum(goodsItem, index)"></number-picker>
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
            <span class="price">&yen;{{ totalCost | formatPrice }}</span>
            <button class="takeOrder" :class="totalCount > 0 ? 'canTakeOrder' : ''" :disabled="totalCount > 0 ? false : true" @click.stop="goTakeOrder">下单</button>
          </div>
        </div>
      </div>
      <div v-else key="noGoods" class="noGoods"></div>
    </transition>
    <cube-popup type="my-popup" ref="myPopup" :mask="false">
      不能再少啦！
    </cube-popup>
  </div>
</template>

<script>
import NumberPicker from '../../components/NumberPicker'
import { mapGetters, mapMutations } from 'vuex'
import { saveUser, getUser } from '../../utils/cache'

export default {
  components: {
    NumberPicker
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartList']),
    totalCount() {
      let i = 0
      this.cartList.forEach(item => {
        if (item.checked) {
          i++
        }
      })
      return i
    },
    totalCost() {
      let totalCost = 0
      this.cartList.forEach(item => {
        if (item.checked) {
          totalCost += item.price * item.number
        }
      })
      return totalCost
    },
    checkedAll() {
      return this.totalCount === this.cartList.length && this.totalCount !== 0
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
      let temp = this.cartList
        .slice(0, index)
        .concat(this.cartList.slice(index + 1))
      let userInfo = getUser()
      userInfo.cartList = temp
      saveUser(userInfo)
      this.setCartList(temp)
    },
    toggleChecked(goods, index) {
      let temp = {
        ...this.cartList[index]
      }
      temp.checked = !temp.checked
      let userInfo = getUser()
      userInfo.cartList[index] = temp
      saveUser(userInfo)
      this.setCartList(
        this.cartList
          .slice(0, index)
          .concat(temp, this.cartList.slice(index + 1))
      )
    },
    checkedALL() {
      let temp = []
      this.cartList.forEach(item => {
        temp.push({
          ...item
        })
      })
      if (this.totalCount === this.cartList.length) {
        temp.forEach(item => {
          item.checked = false
        })
      } else {
        temp.forEach(item => {
          item.checked = true
        })
      }
      let userInfo = getUser()
      userInfo.cartList = temp
      saveUser(userInfo)
      this.setCartList(temp)
    },
    minusGoodsNum(goodsItem, index) {
      if (this.cartList[index].number > 1) {
        let temp = {
          ...this.cartList[index]
        }
        temp.number--
        this.setCartList(
          this.cartList
            .slice(0, index)
            .concat(temp, this.cartList.slice(index + 1))
        )
        let userInfo = getUser()
        userInfo.cartList[index] = temp
        saveUser(userInfo)
      } else {
        this.showPopup('myPopup')
      }
    },
    addGoodsNum(goodsItem, index) {
      let temp = {
        ...this.cartList[index]
      }
      temp.number++
      this.setCartList(
        this.cartList
          .slice(0, index)
          .concat(temp, this.cartList.slice(index + 1))
      )
      let userInfo = getUser()
      userInfo.cartList[index] = temp
      saveUser(userInfo)
    },
    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    },
    goTakeOrder() {
      this.$router.push({
        name: 'TakeOrder',
        params: {
          goodsList: this.cartList.filter(item => item.checked)
        }
      })
    },
    ...mapMutations({
      setCartList: 'SET_CARTLIST'
    })
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
.cartList
  margin-bottom 196px
  .goodsItem
    display flex
    background white
    padding 0 30px 0 90px
    box-sizing border-box
    position relative
    align-items center
    height 208px
    transition all 0.4s
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
        display inline-block
        margin-right 20px
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
      .numberPicker
        position absolute
        height 52px
        width 235px
        right 30px
        top 121px
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
  transition all 0.4s
.deleteGoodsItem-leave-active
  position absolute !important
.fade-enter-active, .fade-leave-active
  transition all 0.2s
.fade-enter, .fade-leave-to
  opacity 0
.cube-my-popup
  top 50%
  left 50%
  padding-left 20px
  background rgba(0, 0, 0, 0.5)
  color #eee
  width 280px
  height 100px
  border-radius 8px
  transform translate3d(-140px, -50px, 0)
  text-align center
  box-sizing border-box
</style>
