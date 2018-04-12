<template>
  <div class="wrapper">
    <header>手机号注册</header>
    <form>
      <p>
        <input type="text" class="phone" placeholder="请输入手机号码" v-model="phone">
        <i class="iconfont icon-guanbi1" @click="phone = ''"></i>
      </p>
      <p class="errFlag" v-if="!validatePhone">手机格式有误!</p>
      <p>
        <input type="text" class="code" placeholder="请输入验证码" v-model="code">
        <i class="mesgBtn">
          <send-msg :allowClick="allowClick" @onClick="SendMesg"></send-msg>
        </i>
      </p>
      <p>
        <input :type="showPwd ? 'text' : 'password'" class="password" placeholder="请输入密码" ref="pwd">
        <i class="iconfont" :class="showPwd ?  'icon-dakai' : 'icon-guanbi'" @click="showPwd = !showPwd"></i>
      </p>
    </form>
    <button class="register" @click.stop.prevent="register">注册</button>
    <cube-popup type="my-popup" ref="myPopup" :mask="false">
      {{ tip }}
    </cube-popup>
  </div>
</template>

<script>
import SendMsg from '../../components/Yanzhengbutton'
import UserAPI from '../../service/user'
export default {
  components: {
    SendMsg
  },
  data() {
    return {
      phone: '',
      code: '',
      showPwd: false,
      tip: '请确认输入！'
    }
  },
  computed: {
    validatePhone() {
      if (this.phone.length <= 0) {
        return true
      }
      var regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      return regex.test(this.phone)
    },
    allowClick() {
      var regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      return regex.test(this.phone)
    }
  },
  methods: {
    SendMesg() {
      console.log('短息')
    },
    register() {
      const pwd = this.$refs.pwd.value
      if (!this.allowClick || !pwd || !this.code) {
        this.tip = '请确认输入!'
        this.showPopup('myPopup')
        return
      }
      UserAPI.registe({
        phone: this.phone,
        password: pwd,
        code: this.code
      }).then(res => {
        if (res.data.errcode) {
          this.tip = res.data.message
          this.showPopup('myPopup')
        } else {
          console.log(res.data)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    }
  },
  activated() {
    document.querySelectorAll('.navbar')[0].style.bottom = '-98px'
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  min-height 100vh
  box-sizing border-box
  background white
  padding 56px 40px
  header
    text-align center
    letter-spacing 4px
    font-size 36px
    color #333
  form
    margin-top 80px
    p
      position relative
    .errFlag
      font-size 24px
      color rgb(180, 40, 45)
      margin 0
      padding-left 40px
    input
      display block
      box-sizing border-box
      margin 40px auto
      width 100%
      padding 30px 40px
      outline none
      border none
      border-bottom 1px solid #ccc
      font-size 32px
      color #333
      &::-webkit-input-placeholder
        color #ccc
    .iconfont
      position absolute
      right 0
      top 50%
      transform translate3d(-16px, -16px, 0)
    .icon-guanbi1
      display none
    .phone:focus + .icon-guanbi1
      display block
    .mesgBtn
      position absolute
      display inline-block
      height 60px
      top 50%
      right 0
      transform translate3d(0, -30px , 0)
  .register
    display block
    width 100%
    height 90px
    margin 40px auto
    background rgb(180, 40, 45)
    color white
    font-size 30px
    line-height 90px
    text-align center
    outline none
    border none
.cube-my-popup
  top 50%
  left 50%
  padding-left 20px
  background rgba(0, 0, 0, 0.5)
  color #eee
  width 280px
  height 100px
  border-radius 8px
  transform translate3d(-140px,-50px,0)
  text-align center
  box-sizing border-box
</style>
