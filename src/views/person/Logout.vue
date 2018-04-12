<template>
  <div class="wrapper">
    goodby!
  </div>
</template>

<script>
export default {
  mounted() {
    localStorage.clear()
    this.$router.replace({ name: 'Home' })
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  min-height 100vh
  text-align center
  padding-top 100px
  box-sizing border-box
</style>
