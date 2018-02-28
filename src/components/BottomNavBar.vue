<template>
  <div class="navbar">
    <a href="#"
      v-for="(link, index) in links"
      :key="index"
      class="navbar-link-item"
      :class="link.class"
      @click="changeNav(index)">
      <div class="icon"></div>
      <span class="name">{{ link.name }}</span>
    </a>
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
        name: '购物'
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
    changeNav (index) {
      const allLink = document.querySelectorAll('.navbar-link-item')
      allLink.forEach(element => {
        element.classList.remove('active')
      })
      allLink[index].classList.add('active')
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
  &.active
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
  &.shouye.active .icon
    background-position 0 -200px
  &.shiwu .icon
    background-position 0 -350px
  &.shiwu.active .icon
    background-position 0 -300px
  &.fenlei .icon
    background-position 0 -150px
  &.fenlei.active .icon
    background-position 0 -100px
  &.gouwu .icon
    background-position 0 -50px
  &.gouwu.active .icon
    background-position 0 0
  &.geren .icon
    background-position 0 -450px
  &.geren.active .icon
    background-position 0 -400px
</style>
