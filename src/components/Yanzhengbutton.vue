<template>
  <div class="wrapper_">
    <button @click.stop.prevent="onClick" ref="button" :disabled="disabled">{{ renderText }}</button>
  </div>
</template>

<script>
export default {
  props: {
    allowClick: {
      expected: Boolean,
      default: false
    },
    text: {
      expected: String,
      default: '获取验证码'
    },
    seconds: {
      expected: Number,
      default: 60
    }
  },
  data() {
    return {
      secondsB: this.seconds,
      timer: 0
    }
  },
  computed: {
    disabled() {
      if (this.allowClick && !this.timer) {
        return false
      }
      return true
    },
    renderText() {
      if (!this.timer && (!this.disabled || !this.allowClick)) {
        return this.text
      } else {
        return `(${this.secondsB})s`
      }
    }
  },
  methods: {
    onClick() {
      if (this.disabled || !this.allowClick) {
        return
      }
      this.$emit('onClick')
      this.timer = setInterval(() => {
        if (this.secondsB > 0) {
          this.secondsB--
        } else {
          clearInterval(this.timer)
          this.timer = 0
          this.secondsB = this.seconds
        }
      }, 1000)
    }
  },
  beforeDestory() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper_
  display inline-block
  width 100%
  height 100%
  button
    display inline-block
    width 100%
    outline none
    border 1px solid #ccc
    background white
    padding 10px 20px
    border-radius 10px
    box-sizing border-box
</style>
