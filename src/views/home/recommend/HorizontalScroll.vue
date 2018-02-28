<template>
  <div ref="scrollWrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import { BetterScroll } from 'cube-ui'

export default {
  props: {
    data: {
      expected: Array,
      default: []
    }
  },
  mounted () {
    this._initScroll()
  },
  watch: {
    data () {
      this._initScroll()
    }
  },
  methods: {
    _initScroll () {
      if (this.data.length) {
        setTimeout(() => {
          if (!this.Scroll) {
            this.cateScroll = new BetterScroll(this.$refs.scrollWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical',
              deceleration: 0.005,
              swipeTime: 2000
            })
          } else {
            this.Scroll.refresh()
          }
        }, 20)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100%
  overflow hidden
</style>
