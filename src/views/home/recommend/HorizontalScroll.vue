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
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  watch: {
    data () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    }
  },
  methods: {
    _initScroll () {
      if (this.data.length) {
        setTimeout(() => {
          if (!this.cateScroll) {
            this.cateScroll = new BetterScroll(this.$refs.scrollWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical',
              deceleration: 0.005,
              swipeTime: 2000
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
.wrapper
  width 100%
  overflow hidden
</style>
