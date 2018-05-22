<template>
  <div class="wrapper">
    <div class="formField">
      <div class="input zone" @click.stop="showAddressPicker">
        <span v-if="!deliverInfo.deliverAddressZone" class="placeholder">省份、城市、区县</span>
        <span v-else>{{ deliverInfo.deliverAddressZone }}</span>
      </div>
      <input class="input detailAddress" v-model="deliverInfo.deliverAddress" placeholder="详细地址, 如街道、楼盘号等" />
      <input class="input name" v-model="deliverInfo.deliverMan" placeholder="姓名" />
      <input class="input phoneNumber" v-model="deliverInfo.deliverPhone" placeholder="手机号码" />
    </div>
    <div class="setDefault">
      <p @click="deliverInfo.default = !deliverInfo.default">
        <i :class="deliverInfo.default ? 'checked' : ''"></i>设为默认地址</p>
    </div>
    <div class="fixedBtn">
      <p class="cancle" @click.stop="onCancle">取消</p>
      <p class="save" @click.stop="onSave">保存</p>
    </div>
  </div>
</template>

<script>
import addressData from '../../../utils/area'
import UserService from '../../../service/user'
import { saveUser, getUser } from '../../../utils/cache'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      deliverInfo: {
        deliverMan: '',
        deliverAddressZone: '',
        deliverAddress: '',
        deliverPhone: '',
        default: false
      }
    }
  },
  mounted() {
    this.addressPicker = this.$createCascadePicker({
      title: '选择区域',
      data: addressData,
      onSelect: this.selectHandle
    })
  },
  activated() {
    document.querySelectorAll('.navbar')[0].style.bottom = '-98px'
  },
  methods: {
    ...mapMutations({
      setDeliverAddresssList: 'SET_DELIVERADDRESSLIST'
    }),
    onCancle() {
      this.$router.back()
    },
    onSave() {
      UserService.addAddress(this.deliverInfo)
        .then(res => {
          if (res.data.errcode) {
            console.log('Err', res.data)
          } else {
            // 更新localstorage 和 vuex
            const list = res.data.result
            console.log(list)
            this.setDeliverAddresssList(list)
            let userInfo = getUser()
            userInfo.deliverAddressList = list
            saveUser(userInfo)
            this.$router.back()
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    showAddressPicker() {
      this.addressPicker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.deliverInfo.deliverAddressZone = selectedText.join('')
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  min-height 100vh
  background #f4f4f4
.formField
  box-sizing border-box
  background #fff
  padding-left 30px
  .input
    display block
    outline none
    box-sizing border-box
    padding 30px 0
    border-bottom 1px solid rgb(217, 217, 217)
    width 100%
    &::-webkit-input-placeholder
      color rgb(153, 153, 153)
      font-size 28px
  input:last-of-type
    border-bottom none
  .placeholder
    color rgb(153, 153, 153)
    font-size 28px
.setDefault
  box-sizing border-box
  height 94px
  background #fafafa
  border-top 1px solid rgb(217, 217, 217)
  p
    font-size 28px
    line-height 94px
    color rgb(51, 51, 51)
    text-align center
  i
    display inline-block
    width 38px
    height 38px
    margin-right 16px
    background-image url('//yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png') // yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/checkbox-sed825af9d3-a6b8540d42.png)
    background-repeat no-repeat
    background-size 38px auto
    vertical-align text-bottom
    background-position 0 -448px
    &.checked
      background-position 0 -192px
.fixedBtn
  position fixed
  bottom 0
  width 100%
  height 96px
  box-sizing border-box
  font-size 0
  p
    display inline-block
    width 50%
    box-sizing border-box
    text-align center
    font-size 28px
    line-height 96px
    &.cancle
      color #333
      background #fff
    &.save
      color #fff
      background #b4282d
</style>
