<template>
  <div class="wrapper">
    <div class="headBg"></div>
    <ul class="addressList">
      <li class="addressItem" v-for="(item, index) in deliverAddressList" :key="item.id">
        <div class="name">
          <p class="uname">{{ item.deliverMan }}</p>
          <p v-if="item.default" class="defalutFlag">默认</p>
        </div>
        <div class="detail">
          <p class="phone">{{ item.deliverPhone }}</p>
          <p class="address">{{ item.deliverAddressZone }}{{ item.deliverAddress }}</p>
        </div>
        <div class="delete" @click.stop="deleteAddressItem(item, index)">
          <img src="//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/del-address-88d6937d73.png">
        </div>
      </li>
    </ul>
    <div class="addNewAddressBtn">
      <router-link tag="p" :to="{ name: 'addDeliverAddresst' }">+&nbsp;&nbsp;新建地址</router-link>
    </div>
  </div>
</template>

<script>
import UserAPI from '../../../service/user'
import { saveUser, getUser } from '../../../utils/cache'
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['deliverAddressList'])
  },
  activated() {
    document.querySelectorAll('.navbar')[0].style.bottom = '-98px'
  },
  beforeRouteLeave(to, from, next) {
    next()
    if (to.name === 'addDeliverAddresst') {
    } else {
      document.querySelectorAll('.navbar')[0].style.bottom = '0'
    }
  },
  methods: {
    ...mapMutations({
      setDeliverAddresssList: 'SET_DELIVERADDRESSLIST'
    }),
    deleteAddressItem(address, index) {
      if (!address) {
        return
      }
      this.$createDialog({
        type: 'confirm',
        title: '确定删除地址?',
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
          UserAPI.deleteAddress(address.id)
            .then(res => {
              if (res.data.errcode) {
                console.log(res.data)
              } else {
                let temp = [...this.deliverAddressList]
                temp.splice(index, 1)
                let userInfo = getUser()
                userInfo.deliverAddressList = temp
                saveUser(userInfo)
                this.setDeliverAddresssList(temp)
              }
            })
            .catch(e => {
              console.log(e)
            })
        }
      }).show()
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  min-height 100vh
  background #fff
  .headBg
    width 100%
    height 10px
    background url('//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png') repeat-x
.addressList
  box-sizing border-box
  padding 0 0 156px 30px
.addressItem
  display flex
  justify-content space-between
  align-items center
  box-sizing border-box
  padding 40px 0
  border-bottom 1px solid rgb(217, 217, 217)
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
  .delete
    width 90px
    text-align center
    img
      width 50px
      height 50px
.addNewAddressBtn
  position fixed
  width 100%
  height 156px
  box-sizing border-box
  bottom 0
  padding 30px
  background white
  p
    padding 0 30px 30px 30px
    box-sizing border-box
    height 96px
    border 1px solid rgb(180, 40, 45)
    background rgb(244, 244, 244)
    color rgb(180, 40, 45)
    text-align center
    line-height 94px
    font-size 18px
</style>
