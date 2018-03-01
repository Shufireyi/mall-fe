<template>
  <div class="scrollWrapper" ref="scrollWrapper">
    <ul ref="linksWrapper">
      <router-link
        v-for="(item, index) in links"
        :key="index"
        ref="linkItem"
        :to="{name:routerName(item)}"
        @click="clickLink(index, item)"
        tag="li">
        {{ item.name }}
      </router-link>
    </ul>
  </div>
</template>

<script>
import { BetterScroll } from 'cube-ui'

export default {
  props: {
    links: {
      expexted: Array,
      default: []
    }
  },
  data () {
    return {
      // activeIndex: 0
    }
  },
  components: {
    BetterScroll
  },
  mounted () {
    this._initPics()
  },
  methods: {
    clickLink (index, item) {
      this.$emit('clickLink', item)
    },
    routerName (item) {
      switch (item.name) {
        case '居家':
          return 'Jujia'
        case '配件':
          return 'Peijian'
        case '服装':
          return 'Fuzhuang'
        case '电器':
          return 'Dianqi'
        case '洗护':
          return 'Xihu'
        case '饮食':
          return 'Yinshi'
        case '餐厨':
          return 'Canchu'
        case '婴童':
          return 'Yingtong'
        case '文体':
          return 'Wenti'
        case '特色区':
          return 'Tese'
        default:
          return 'Recommend'
      }
    },
    _initPics () {
      if (this.links) {
        let ulPaddingLeft = parseFloat(window.getComputedStyle(this.$refs.linksWrapper).paddingLeft)
        setTimeout(() => {
          let linksW = (parseFloat(window.getComputedStyle(this.$refs.linkItem[0].$el).width) +
                        parseFloat(window.getComputedStyle(this.$refs.linkItem[0].$el).paddingLeft) * 5) *
                        this.$refs.linkItem.length - parseFloat(window.getComputedStyle(this.$refs.linkItem[0].$el).paddingLeft) * 3
          const width = ulPaddingLeft + linksW + 'px'
          this.$refs.linksWrapper.style.width = width
          if (!this.cateScroll) {
            this.cateScroll = new BetterScroll(this.$refs.scrollWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.cateScroll.refresh()
          }
        }, 20)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../utils/stylus/mixin'

.scrollWrapper
  position relative
  overflow hidden
  width 100%
ul
  height 60px
  padding 0 30px
  white-space nowrap
li
  list-style none
  display inline-block
  font-size 28px
  padding 0 16px
  margin 0 0 0 48px
  text-align center
  height 60px
  line-height 60px
  color #333
  &.router-link-active
    color #b4282d
    border-1px(#b4282d)
  &:first-child
    margin-left 0
</style>
