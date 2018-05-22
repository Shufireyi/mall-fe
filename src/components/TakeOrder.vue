<template>
  <div class="wrapper">
    <div class="headBg"></div>
    <div class="addressItem" v-if="delicverInfo" @click.stop="showAddress">
      <div class="name">
        <p class="uname">{{ delicverInfo.deliverMan }}</p>
        <p v-if="delicverInfo.default" class="defalutFlag">默认</p>
      </div>
      <div class="detail">
        <p class="phone">{{ delicverInfo.deliverPhone }}</p>
        <p class="address">{{ delicverInfo.deliverAddressZone }}{{ delicverInfo.deliverAddress }}</p>
      </div>
      <div class="rightArrow">
        <i class="iconfont icon-xiangyou"></i>
      </div>
    </div>
    <div v-if="goodsList" v-for="goodsItem in goodsList" :key="goodsItem.goodsId" class="goodsItem">
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
        <span>&yen;{{ totalPrice(goodsList) }}</span>
      </p>
    </div>
    <p class="fixedBottom">
      应付:&yen;{{ totalPrice(goodsList) }}
      <button class="wantToPay" @click.stop="wantToPay">去付款</button>
    </p>
    <transition name="slidRight">
      <div v-if="showAddressList" class="listWrapper">
        <div class="headBg"></div>
        <ul class="addressList">
          <li class="addressItem" v-for="item in deliverAddressList" :key="item.id" @click.stop="chooseAddress(item)">
            <div class="name">
              <p class="uname">{{ item.deliverMan }}</p>
              <p v-if="item.default" class="defalutFlag">默认</p>
            </div>
            <div class="detail">
              <p class="phone">{{ item.deliverPhone }}</p>
              <p class="address">{{ item.deliverAddressZone }}{{ item.deliverAddress }}</p>
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { saveUser, getUser } from '../utils/cache'
import UserAPI from '../service/user.js'
export default {
  data() {
    return {
      delicverInfo: null,
      goodsList: null,
      showAddressList: false
    }
  },
  computed: {
    ...mapGetters(['deliverAddressList', 'orderList'])
  },
  activated() {
    if (!this.$route.params.goodsList) {
      window.history.back()
      return
    }
    this.goodsList = this.$route.params.goodsList
    this.delicverInfo = this.deliverAddressList.filter(item => item.default)[0]
    document.querySelectorAll('.navbar')[0].style.bottom = '-98px'
  },
  beforeRouteLeave(to, from, next) {
    next()
    document.querySelectorAll('.navbar')[0].style.bottom = '0'
  },
  methods: {
    ...mapMutations({
      setOrderList: 'SET_ORDERLIST'
    }),
    showAddress() {
      this.showAddressList = true
    },
    chooseAddress(address) {
      this.delicverInfo = address
      this.showAddressList = false
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
    },
    wantToPay() {
      if (!this.goodsList) {
        return
      }
      UserAPI.newOrder({
        amount: this.totalPrice(this.goodsList),
        goodsList: JSON.stringify(this.goodsList),
        deliverId: this.delicverInfo.id
      })
        .then(res => {
          //
          let temp = [...this.orderList]
          temp = temp.concat(res.data.data.orderInfo)
          let userInfo = getUser()
          userInfo.orderList = temp
          saveUser(userInfo)
          this.setOrderList(temp)

          UserAPI.payOrder(res.data.data.payInfo)
            .then(res => {
              window.location.href = res.data.data.url
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  min-height 100vh
.headBg
  width 100%
  height 10px
  background url('//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png') repeat-x
.addressItem
  display flex
  justify-content space-between
  align-items center
  box-sizing border-box
  padding 40px 0 40px 30px
  border-bottom 1px solid rgb(217, 217, 217)
  background #fff
  margin-bottom 20px
  .name
    width 120px
    .uname
      font-size 28px
      line-height 42px
      color rgb(51, 51, 51)
      margin-bottom 5px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .defalutFlag
      box-sizing border-box
      display inline-block
      width 60px
      height 32px
      border 2px solid rgb(180, 40, 45)
      font-size 20px
      line-height 28px
      color rgb(180, 40, 45)
      text-align center
  .detail
    flex-grow 1
    .phone
      font-size 28px
      line-height 28px
      color rgb(51, 51, 51)
      margin-bottom 6px
    .address
      font-size 24px
      line-height 36px
      color rgb(102, 102, 102)
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  .rightArrow
    padding-right 30px
.goodsItem
  display flex
  justify-content space-between
  align-items center
  box-sizing border-box
  padding 25px 0
  background #fff
  padding-left 30px
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
  background #fff
  p
    text-align right
    font-size 32px
    line-height 42px
    color rgb(51, 51, 51)
    font-family PingFangSC-Light
.fixedBottom
  position fixed
  bottom 0
  height 96px
  width 100%
  background #fff
  box-sizing border-box
  padding-left 30px
  font-size 32px
  line-height 96px
  color rgb(180, 40, 45)
  font-family PingFangSC-Light
  .wantToPay
    float right
    display inline-block
    width 225px
    height 96px
    font-size 28px
    line-height 96px
    box-sizing border-box
    outline none
    border 1px solid rgb(180, 40, 45)
    background rgb(180, 40, 45)
    color #fff
.listWrapper
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  background white
.slidRight-enter, .slidRight-leave-to
  opacity 0
  left 100%
.slidRight-enter-active, .slidRight-leave-active
  transition all 0.4s
</style>
