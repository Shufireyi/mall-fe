<template>
  <div class="loading">
    <img src="../../static/loading.gif" alt="loading..." width="24" height="24">
    <p class="desc">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'loading...'
    }
  }
}
</script>
<style lang="stylus" scoped>
.loading
  width 100%
  text-align center
  margin-top 40%
  .desc
    line-height 28px
    font-size 28px
    color #666
    margin-top 20px
</style>
