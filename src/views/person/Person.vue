<template>
  <div class="person">
    <header>
      <img src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" alt="avatar" class="avatar">
      <div class="info">
        <p class="name">{{ nickName }}</p>
        <p class="userType">{{ userLevel === '1' ? '普通用户' : '黄金会员' }}</p>
      </div>
    </header>
    <div class="mainbody">
      <ul class="fList">
        <li v-for="(item, index) in  fItem" :key="index" class="fItem">
          <div class="icon" :class="item.iconClass"></div>
          <p class="title">{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <footer>
      <p class="logout" @click="Logout">退出登录</p>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUser } from '../../utils/cache'
const fItem = [
  {
    iconClass: 'icon_dingdan',
    title: '我的订单',
    link: ''
  }, {
    iconClass: 'icon_youhui',
    title: '优惠券',
    link: ''
  }, {
    iconClass: 'icon_dizhi',
    title: '地址管理',
    link: ''
  }, {
    iconClass: 'icon_safe',
    title: '账号安全',
    link: ''
  }, {
    iconClass: 'icon_help',
    title: '帮助中心',
    link: ''
  }, {
    iconClass: 'icon_yijian',
    title: '意见反馈',
    link: ''
  }, {
    iconClass: 'icon_shouhou',
    title: '售后服务',
    link: ''
  }
]
export default {
  data() {
    return {
      fItem
    }
  },
  computed: {
    ...mapGetters([
      'nickName',
      'avatar',
      'userLevel'
    ])
  },
  methods: {
    Logout() {
      localStorage.clear()
      this.$router.push({ name: 'Home' })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!getUser().phone) {
      window.location.href = '/login'
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus" scoped>
.person
  width 100%
  min-height 100vh
header
  height 270px
  padding  0 30px
  box-sizing border-box
  display flex
  align-items center
  background-image url('http://yanxuan.nosdn.127.net/6ae93353e95b3450a2710bb43f925a63.jpg')
  background-color #1e1e1e
  .avatar
    width 142px
    height 142px
    border-radius 50%
  .info
    margin-left 30px
    .login
      color white
      letter-spacing 2px
      padding 10px 0
    .name
      color white
      font-family PingFangSC-Light,helvetica,'Heiti SC'
      font-size 42px
      margin-bottom 10px
    .userType
      color #7f7f7f
      font-size 28px
.mainbody
  .icon
    height 50px
    width 50px
    background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-s8cc1e6a564-d2ed4e8078.png')
    background-repeat no-repeat
    background-size 50px 882px
    margin 0 auto
    margin-bottom 16px
  .fList
    background white
    position relative
  .fItem
    display inline-block
    width 33.33333%
    border-right 1px solid rgba(0,0,0,.15)
    border-bottom 1px solid rgba(0,0,0,.15)
    box-sizing border-box
    height 180px
    padding-top 45px
    text-align center
    &:nth-child(3n+0)
      border-right none
    &:last-child
      border-bottom none
    .title
      color #333
      font-size 24px
footer
  margin-top 40px
  height 96px
  background white
  .logout
    color #333
    text-align center
    line-height 96px
.icon_dingdan
  background-position 0 -480px
.icon_yijian
  background-position 0 -180px
.icon_youhui
  background-position 0 -120px
.icon_dizhi
  background-position 0 0
.icon_safe
  background-position 0 -830px
.icon_help
  background-position 0 -300px
.icon_shouhou
  background-position 0 -60px
</style>
