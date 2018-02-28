<template>
  <div v-if="fuliSale" class="fuliSale">
    <img v-lazy="fuliSale.picUrl">
  </div>
</template>

<script>
import HomeAPI from '../../../service/home'

export default {
  data () {
    return {
      fuliSale: null
    }
  },
  mounted () {
    HomeAPI.getFuliSale().then(res => {
      if (res.errcode) {
        console.log(res.message)
      } else {
        this.fuliSale = res.data.data
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.fuliSale
  width 100%
  height 300px
  margin 0 0 20px 0
  img
    width 100%
    height 300px
</style>
