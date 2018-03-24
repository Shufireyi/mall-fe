<template>
  <div class="wrapper">
    <span class="item" @click="minus">-</span>
    <span class="item input" >
      <input type="number" v-model="number" :min="1">
    </span>
    <span class="item" @click="add">+</span>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      expected: Number,
      defult: 1
    }
  },
  methods: {
    minus() {
      this.$emit('minus')
    },
    add() {
      this.$emit('add')
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
    font-size 0
.item
  display inline-block
  height 50px
  width 80px
  box-sizing border-box
  font-size 28px
  vertical-align top
  color #333
  border 1px solid rgba(127, 127, 127, 0.28)
  text-align center
  line-height 50px
span.item.input
  border-left none
  border-right none
  outline none
  width 70px
  input
    width 100%
    text-align center
</style>
