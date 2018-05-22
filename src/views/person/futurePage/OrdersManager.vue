<template>
  <div class="wrapper">
    <ul class="navWrapper">
      <li v-for="(nav, index) in navList" :key="index" :class=" index === activatId ? 'active' : ''" @click.stop="filterOrderList(index)">{{ nav }}</li>
    </ul>
    <ul class="orderswrapper">
      <li v-for="(orderItem, index) in filterList" :key="orderItem.orderId" class="orderItem">
        <p class="orderItem_orderId">
          订单编号：{{ orderItem.orderId }}
          <i class="orderItem_delete" @click.stop="deleteOrderItem(orderItem, index)"></i>
        </p>
        <div v-for="goodsItem in orderItem.goodsList" :key="goodsItem.goodsId" class="goodsItem">
          <img v-lazy="goodsItem.picUrl + '?imageView&thumbnail=160x0&quality=75'">
          <div class="info">
            <p class="name">{{ goodsItem.goodsName }}</p>
            <p class="kind" v-for="sku in goodsItem.skumap" :key="sku.specValue">{{ sku.specValue }}*</p>
            <p class="kind number">{{ goodsItem.number }}</p>
          </div>
          <div class="pricewrapper">
            <p class="price">&yen;{{ goodsItem.price | formatPrice }}</p>
            <p class="number">x{{ goodsItem.number }}</p>
            <p class="pricetotal">&yen;{{ goodsItem.price * goodsItem.number | formatPrice }}</p>
          </div>
        </div>
        <div class="totalPrice">
          <p>
            总价
            <span>&yen;{{ totalPrice(orderItem.goodsList) }}</span>
          </p>
        </div>
        <div class="buttonsWrapper">
          <button v-if="orderItem.orderStatus === orderTypes.ORDER_waitToPay" @click.stop="payOrder(orderItem)">付款</button>
          <button v-if="orderItem.orderStatus === orderTypes.ORDER_waitToConfirm">确认收货</button>
          <button v-if="orderItem.orderStatus === orderTypes.ORDER_waitToComment">评价</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { saveUser, getUser } from '../../../utils/cache'
import orderTypes from './orders-types.js'
import UserAPI from '../../../service/user.js'
const navList = ['全部', '待付款', '待发货', '待收货', '待评价']
export default {
  data() {
    return {
      activatId: 0,
      navList,
      orderTypes
    }
  },
  activated() {
    document.querySelectorAll('.navbar')[0].style.bottom = '-98px'
  },
  beforeRouteLeave(to, from, next) {
    next()
    document.querySelectorAll('.navbar')[0].style.bottom = '0'
  },
  computed: {
    ...mapGetters(['orderList']),
    filterList() {
      if (this.orderList) {
        if (this.activatId === 0) {
          return this.orderList
        }
        let temp = this.orderList.filter(item => {
          return item.orderStatus === this.activatId
        })
        return temp
      }
    }
  },
  methods: {
    ...mapMutations({
      setOrderList: 'SET_ORDERLIST'
    }),
    filterOrderList(index) {
      this.activatId = index
    },
    deleteOrderItem(order, index) {
      if (
        order.orderStatus > orderTypes.ORDER_afterPay &&
        order.orderStatus < orderTypes.ORDER_afterConfirm
      ) {
        const toast = this.$createToast({
          txt: '该订单尚未完成!',
          type: 'warn'
        })
        toast.show()
        return
      }
      this.$createDialog({
        type: 'confirm',
        title: '确定删除订单?',
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          // UserAPI.deleteAddress(address.id)
          //   .then(res => {
          //     if (res.data.errcode) {
          //       console.log(res.data)
          //     } else {
          //       let temp = [...this.orderList]
          //       temp = temp.filter((item, index) => {
          //         return item.orderId !== order.orderId
          //       })
          //       let userInfo = getUser()
          //       userInfo.orderList = temp
          //       saveUser(userInfo)
          //       this.setOrderList(temp)
          //     }
          //   })
          //   .catch(e => {
          //     console.log(e)
          //   })
          let temp = [...this.orderList]
          temp = temp.filter((item, index) => {
            return item.orderId !== order.orderId
          })
          let userInfo = getUser()
          userInfo.orderList = temp
          saveUser(userInfo)
          this.setOrderList(temp)
        }
      }).show()
    },
    payOrder(order) {
      UserAPI.payOrder({
        out_trade_no: order.orderId,
        amount: order.totalPrice,
        name: '商品订单'
      })
        .then(res => {
          console.log(res.data.data.url)
          window.location.href = res.data.data.url
        })
        .catch(e => {
          console.log(e)
        })
    },
    totalPrice(goodsList) {
      if (!goodsList || goodsList.length === 0) {
        return 0
      }
      if (goodsList.length < 2) {
        return goodsList[0].number * goodsList[0].price
      }
      return goodsList.reduce(
        (pre, cur) => pre.number * pre.price + cur.number * cur.price
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  min-height 100vh
  box-sizing border-box
.navWrapper
  display flex
  justify-content space-between
  align-items center
  box-sizing border-box
  padding 0 30px
  height 80px
  background #fff
  position fixed
  width 100%
  top 0
  li
    display inline-block
    height 100%
    box-sizing border-box
    padding 0 16px
    font-size 28px
    line-height 80px
    color rgb(51, 51, 51)
    &.active
      color rgb(180, 40, 45)
      border-bottom 2px solid rgb(180, 40, 45)
.orderswrapper
  box-sizing border-box
  padding-top 80px
  .orderItem
    box-sizing border-box
    padding-left 30px
    background #fff
    margin-top 20px
    .orderItem_orderId
      font-size 28px
      line-height 80px
      color rgb(51, 51, 51)
      border-bottom 1px solid rgba(0, 0, 0, 0.1)
      font-family PingFangSC-Light
      i
        display inline-block
        float right
        height 36px
        width 36px
        margin-top 20px
        margin-right 30px
        background url('//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/icon_delete-264d236b86.png') no-repeat // yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/icon_delete-264d236b86.png) no-repeat
        background-size 36px 36px
    .goodsItem
      display flex
      justify-content space-between
      align-items center
      box-sizing border-box
      padding 25px 0
      &>img
        flex-shrink 0
        width 140px
        height 140px
        background rgb(244, 244, 244)
        margin-right 20px
      .info
        flex-grow 1
        font-family PingFangSC-Light
        .name
          font-size 28px
          line-height 42px
          color rgb(51, 51, 51)
        .kind
          display inline-block
          font-size 24px
          line-height 36px
          color rgb(102, 102, 102)
      .pricewrapper
        flex-shrink 0
        margin-right 30px
        font-family PingFangSC-Light
        color rgb(51, 51, 51)
        .price
          font-size 28px
          line-height 32px
          margin-top 10px
        .number
          font-size 24px
          line-height 30px
          margin-top 10px
          text-align center
        .pricetotal
          font-size 28px
          line-height 32px
          margin-top 10px
    .totalPrice
      border-top 1px solid rgba(0, 0, 0, 0.1)
      box-sizing border-box
      padding 20px
      padding-right 30px
      p
        text-align right
        font-size 32px
        line-height 42px
        color rgb(51, 51, 51)
        font-family PingFangSC-Light
    .buttonsWrapper
      box-sizing border-box
      padding 20px
      padding-right 30px
      text-align right
      button
        display inline-block
        box-sizing border-box
        outline none
        border none
        color white
        background-color #b4282d
        font-size 28px
        line-height 52px
        letter-spacing 4px
        height 52px
        width 160px
</style>
