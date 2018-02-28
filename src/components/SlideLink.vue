<template>
  <div class="scrollWrapper" ref="scrollWrapper">
    <ul ref="linksWrapper">
      <li v-for="(item, index) in links" :key="index" :class="{active: index === activeIndex}" ref="linkItem" @click="clickLink(index, item)">
        {{ item.name }}
      </li>
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
      activeIndex: 0
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
      this.activeIndex = index
      this.$emit('clickLink', item)
    },
    _initPics () {
      if (this.links) {
        let ulPaddingLeft = parseFloat(window.getComputedStyle(this.$refs.linksWrapper).paddingLeft)
        setTimeout(() => {
          let linksW = (parseFloat(window.getComputedStyle(this.$refs.linkItem[0]).width) +
                        parseFloat(window.getComputedStyle(this.$refs.linkItem[0]).paddingLeft) * 5) *
                        this.$refs.linkItem.length - parseFloat(window.getComputedStyle(this.$refs.linkItem[0]).paddingLeft) * 3
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
  &.active
    color #b4282d
    border-1px(#b4282d)
  &:first-child
    margin-left 0
</style>
