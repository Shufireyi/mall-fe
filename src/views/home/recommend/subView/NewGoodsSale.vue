<template>
  <div class="outWrapper">
    <swiper :options="swiperOption" ref="mySwiper" class="swiper-box" v-if="newItemAds.length">
      <swiper-slide v-for="(item, index) in newItemAds" class="swiper-slide content" :key="index">
        <router-link :to="{name: 'GoodsDetail', params:{id: item.url.slice(item.url.search('id=')+3)}}">
          <img class="adaptHeightImg" :src="item.picUrl + '?imageView&thumbnail=750x0&quality=75'">
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="allnewGoods" v-if="newItems.length">
      <p class="title">全部新品</p>
      <div class="contition">
        <span class="item active changeParamButton" @click.stop="changeParams(0)">综合</span>
        <span class="item changeParamButton" @click.stop="changeParams(1)">价格
          <i class="sortArrow"></i>
        </span>
      </div>
      <div class="goodsWrapper">
        <good-info v-for="(good, i) in newItems" :key="i" :good="good" class="goodItem"></good-info>
      </div>
    </div>
  </div>
</template>

<script>
import HomeOtherAPI from '../../../../service/homeOther'
import GoodInfo from '../../GoodInfo'
export default {
  components: {
    GoodInfo
  },
  data() {
    return {
      newItemAds: [],
      newItems: [],
      sortType: 0,
      descSorted: true,
      swiperOption: {
        notNextTick: true,
        loop: true,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        centeredSlides: true,
        paginationClickable: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2,
          loadOnTransitionStart: true
        }
      }
    }
  },
  mounted() {
    HomeOtherAPI.newGoodsDetail().then(res => {
      if (res.data.errcode) {
        console.log(res.data)
      } else {
        this.newItemAds = res.data.data.newItemAds
        this.newItems = res.data.data.newItems.itemList
      }
    })
  },
  watch: {
    sortType() {
      this.getNewGoodsList()
    },
    descSorted() {
      this.getNewGoodsList()
    }
  },
  methods: {
    getNewGoodsList() {
      HomeOtherAPI.getNewGoodsList({
        tagId: 0,
        sortType: this.sortType || 0,
        descSorted: this.descSorted,
        categoryL1Id: 0
      }).then(res => {
        if (res.data.errcode) {
          console.log(res.data)
        } else {
          this.newItems = res.data.data.data.itemList
        }
      })
    },
    changeParams(type) {
      const buttonList = document.querySelectorAll('.changeParamButton')
      buttonList.forEach(element => {
        element.classList.remove('active')
      })
      buttonList[type].classList.add('active')
      switch (type) {
        case 0:
          this.sortType = 0
          this.descSorted = true
          break
        case 1:
          if (this.sortType === 1) {
            this.descSorted = !this.descSorted
            const temp1 = document.querySelectorAll('.sortArrow')[0]
            temp1.classList.remove('down')
            temp1.classList.remove('up')
            if (this.descSorted) {
              temp1.classList.add('down')
            } else {
              temp1.classList.add('up')
            }
          } else {
            this.sortType = 1
            this.descSorted = true
            const temp2 = document.querySelectorAll('.sortArrow')[0]
            temp2.classList.add('down')
          }
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.outWrapper
  min-height 100vh
.swiper-box
  width 100%
  height 417px
  overflow hidden
  background #f9f9f9
  .swiper-slide
    img
      width 100%
.allnewGoods
  background white
  margin-top 20px
  .title
    height 110px
    line-height 110px
    font-size 32px
    color #333
    text-align center
  .contition
    border-top 1px solid #efefef
    border-bottom 1px solid #efefef
    height 81px
    width 100%
    background white
    display flex
    align-items center
    justify-content space-between
    .item
      flex-grow 1
      display inline-block
      text-align center
      color #333
      font-size 28px
      position relative
      &.active
        color #b4282d
      i
        display inline-block
        width 15px
        height 21px
        margin-left 8px
        background-position center center
        background-repeat no-repeat
        background-size 15px 21px
        position absolute
        left 210px
        top 2px
        background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/no-648460126c.png')
      &.active i.up
        background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/up-f22085ade1.png')
      &.active i.down
        background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/down-a40f8bd193.png')
  .goodsWrapper
    margin-top 30px
    .goodItem
      vertical-align top
      &:nth-child(even)
        padding 0 10px 33px 20px
      &:nth-child(odd)
        padding 0 20px 33px 10px
</style>
