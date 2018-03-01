<template>
  <div class="jujia">
    <loading v-if="!data"></loading>
    <transition name="fadeIn">
      <common-layout v-if="data" :data="data"></common-layout>
    </transition>
  </div>
</template>

<script>
import GoodsAPI from '../../../service/goods'
import CommonLayout from '../CommonLayout'
import Loading from '../../../components/Loading'
export default {
  data () {
    return {
      data: null
    }
  },
  components: {
    CommonLayout,
    Loading
  },
  mounted () {
    GoodsAPI.getGoodsByCategroy(1005001).then(res => {
      this.data = res.data.data
    })
  }
}
</script>

<style lang="stylus" scoped>
.jujia
  padding-top 75px
.fadeIn-enter-active,
.fadeIn-leave-active
  transition  all .3s
.fadeIn-enter,
.fadeIn-leave-to
  opacity 0
</style>
