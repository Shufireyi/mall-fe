<template>
  <div class="navbar">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      class="navbar-link-item"
      :class="link.class"
      :to="{name:routerName(link)}">
      <div class="icon"></div>
      <span class="name">{{ link.name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      links: [{
        class: 'shouye',
        name: '首页'
      }, {
        class: 'shiwu',
        name: '识物'
      }, {
        class: 'fenlei',
        name: '分类'
      }, {
        class: 'gouwu',
        name: '购物车'
      }, {
        class: 'geren',
        name: '个人'
      }]
    }
  },
  mounted () {
    document.querySelectorAll('.navbar-link-item')[0].classList.add('active')
  },
  methods: {
    routerName (item) {
      switch (item.name) {
        case '识物':
          return 'Shiwu'
        case '分类':
          return 'Category'
        case '购物车':
          return 'ShopCart'
        case '个人':
          return 'Person'
        default:
          return 'Home'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar
  position fixed
  bottom 0
  left 0
  width 100%
  overflow hidden
  height 98px
  background-color #fafafa
  border-top 2px solid #d9d9d9
  display flex
  flex-flow row nowrap
  align-items center
  justify-content space-around
.navbar-link-item
  display inline-block
  vertical-align middle
  height 72px
  text-align center
  &.router-link-active
    color #b4282d
  .name
    margin 7px 0 0 0
    font-size 24px
  .icon
    width 40px
    height 40px
    background-repeat no-repeat
    background-size 40px 490px
    background-image url('http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/tabBar-s73fb615cb3-195f39fd2b.png')
    overflow hidden
    margin  0 auto
  &.shouye .icon
    background-position 0 -250px
  &.shouye.router-link-active .icon
    background-position 0 -200px
  &.shiwu .icon
    background-position 0 -350px
  &.shiwu.router-link-active .icon
    background-position 0 -300px
  &.fenlei .icon
    background-position 0 -150px
  &.fenlei.router-link-active .icon
    background-position 0 -100px
  &.gouwu .icon
    background-position 0 -50px
  &.gouwu.router-link-active .icon
    background-position 0 0
  &.geren .icon
    background-position 0 -450px
  &.geren.router-link-active .icon
    background-position 0 -400px
</style>
