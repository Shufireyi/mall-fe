<template>
  <div class="wrapper">
    <img :src="Logo" alt="logo" class="logo">
    <form>
      <p>
        <input type="text" class="phone" placeholder="请输入手机号码" v-model="phone">
        <i class="iconfont icon-guanbi1" @click="phone = ''"></i>
      </p>
      <p class="errFlag" v-if="!validatePhone">手机格式有误!</p>
      <p>
        <input :type="showPwd ? 'text' : 'password'" class="password" placeholder="请输入密码" ref="pwd">
        <i class="iconfont" :class="showPwd ?  'icon-dakai' : 'icon-guanbi'" @click="showPwd = !showPwd"></i>
      </p>
    </form>
    <router-link tag="p" :to="{name: 'ForgetPwd'}" class="forgetPwd">忘记密码?</router-link>
    <button class="login" @click="Login">登录</button>
    <router-link tag="p" :to="{name: 'Register'}" class="toRegiste">注册账号
      <i class="iconfont icon-xiangyou"></i>
    </router-link>
    <cube-popup type="my-popup" ref="myPopup" :mask="false">
      {{ reminderText }}
    </cube-popup>
  </div>
</template>

<script>
import Logo from '../../../static/logo.png'
import UserAPI from '../../service/user'
import { saveUser, saveToken } from '../../utils/cache'
import { mapMutations } from 'vuex'
function encode(password) {
  const key = 'yanxuanmall'
  let str = ''
  for (let i = 0; i < password.length; i += 1) {
    str += String.fromCharCode(
      password[i].charCodeAt(0) ^ key[i % key.length].charCodeAt(0)
    )
  }
  return str
}

export default {
  data() {
    return {
      Logo,
      phone: '',
      password: '',
      showPwd: false,
      reminderText: '请确认输入！'
    }
  },
  mounted() {},
  computed: {
    validatePhone() {
      if (this.phone.length <= 0) {
        return true
      }
      var regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      return regex.test(this.phone)
    }
  },
  methods: {
    Login() {
      var regex = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (!regex.test(this.phone)) {
        this.reminderText = '请确认输入'
        this.showPopup('myPopup')
        return
      }
      const pwd = encode(this.$refs.pwd.value)
      UserAPI.login({
        phone: this.phone,
        password: pwd
      })
        .then(res => {
          if (res.data.errcode) {
            console.log(res.data.message)
          } else {
            this.$store.dispatch('updateUser', saveUser(res.data.data.user))
            this.setToken(saveToken(res.data.data.token))
            this.$router.push({
              name: 'Person'
            })
          }
        })
        .catch(e => {
          if (e.data.errcode) {
            console.log(e.data.message)
            this.reminderText = '验证错误！'
            this.showPopup('myPopup')
          }
        })
    },
    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    },
    ...mapMutations({
      setToken: 'SET_TOKEN'
    })
  },
  activated() {
    document.querySelectorAll('.navbar')[0].style.bottom = '-98px'
  },
  beforeRouteLeave(to, from, next) {
    next()
    if (to.name === 'ForgetPwd' || to.name === 'Register') {
    } else {
      document.querySelectorAll('.navbar')[0].style.bottom = '0'
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  min-height 100vh
  background white
  padding 56px 40px
  box-sizing border-box
  .logo
    display block
    width 180px
    margin 0 auto
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
  .forgetPwd
    font-size 28px
    color #aaa
    margin 20px
  .login
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
  .toRegiste
    text-align center
    color #aaa
    margin-top 40px
    i
      font-size 28px
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
