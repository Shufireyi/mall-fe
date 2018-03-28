<template>
  <div class="goodsWrapper">
    <loading v-if="!goodsItem"></loading>
    <div v-if="goodsItem">
      <swiper :options="swiperOption" ref="mySwiper" class="swiper-box" v-if="bannerData.length">
        <swiper-slide v-for="(item, index) in bannerData" class="swiper-slide content" :key="index">
          <img class="adaptHeightImg" :src="item + '?imageView&thumbnail=750x0&quality=75'">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="characteristic" v-if="goodsItem && goodsItem.characteristicList">
        <div v-for="item in goodsItem.characteristicList" :key="item.picUrl">
          <img v-lazy="item.picUrl">
          <div class="desc">
            <p>{{ item.simpleDescList[0] }}</p>
            <p>{{ item.simpleDescList[1] }}</p>
          </div>
        </div>
      </div>
      <div class="info" v-if="goodsItem">
        <div class="detail">
          <p class="name">{{ goodsItem.name }}</p>
          <p class="subname">{{ goodsItem.simpleDesc }}</p>
          <p class="price">&yen;{{ goodsItem.retailPrice }}</p>
          <p class="labels">
            <span class="tag" v-for="tag in goodsItem.tagList" :key="tag.id">{{tag.tagName}}
              <i></i>
            </span>
          </p>
        </div>
        <div class="comment">
          <p class="count">{{ goodsItem.commentCount | formatCommentNum }}</p>
          <p class="com">用户评价</p>
          <router-link tag="p" class="more" :to="{name: 'GoodsComment' , params: {id: goodsId}}">查看</router-link>
        </div>
      </div>
      <div class="attribute" v-if="policyList.length">
        <div class="choosed item">
          <span>已选择:&nbsp;&nbsp;&nbsp;</span>
          <span>选择规格和数量:&nbsp;&nbsp;&nbsp;</span>
          <span>{{ choseType }}</span>
          <i class="greyLine"></i>
          <i class="rightArrow"></i>
        </div>
        <div class="points item">积分:&nbsp;&nbsp;&nbsp;购买最高可得{{ Math.floor(goodsItem.retailPrice / 10) }}积分
          <i class="greyLine"></i>
        </div>
        <div class="service">
          <div class="title">服务:</div>
          <div class="list">
            <span v-for="item in policyList" :key="item.title">
              <i class="redDot"></i>{{ item.title }}</span>
          </div>
          <!-- <i class="rightArrow"></i> -->
        </div>
      </div>
      <div class="comment" v-if="goodsItem && goodRates">
        <div class="title">
          <span class="">用户评价({{ goodsItem.commentCount | formatCommentNum }})</span>
          <span class="rate">{{ goodRates.goodCmtRate }}</span>
          <i class="greyLine"></i>
          <router-link tag="i" class="rightArrow" :to="{name: 'GoodsComment' , params: {id: goodsId}}"></router-link>
        </div>
        <div class="firstCom">
          <div class="userinfo">
            <img src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" class="avatar">
            <span class="username">{{ comment[0].frontUserName }}</span>
            <span class="userlevel" :class="'lv' + comment[0].memberLevel"></span>
          </div>
          <div class="goodsinfo">
            <span class="time">{{ comment[0].createTime | formatTime }}</span>
            <div class="type">
              <span v-for="(item, index) in comment[0].skuInfo" :key="index">{{ item }}</span>
            </div>
          </div>
          <div class="comment">
            <p v-for="(p, index) in comment[0].content.split(/\n/)" :key="index">{{ p }}</p>
          </div>
        </div>
      </div>
      <div class="detailInfo" v-if="goodsItem">
        <p class="title">商品参数</p>
        <div class="attrListWrapper">
          <p v-for="item in goodsItem.attrList" :key="item.attrName" class="attrItemWrapper">
            <span class="name">{{ item.attrName }}</span>
            <span class="value" v-html="item.attrValue.replace(/\n/g, '<br/>').replace(/,/g, '<br/>')"></span>
          </p>
        </div>
      </div>
      <div v-if="goodsItem" class="detailImgWrapper">
        <img v-for="(item, index) in detailImg" v-lazy="item + '?imageView&thumbnail=750x0&quality=75'" :key="index">
      </div>
      <div class="questionList" v-if="goodsItem">
        <p class="title">
          <i class="line"></i>
          <span>常见问题</span>
        </p>
        <div v-for="(issue, index) in goodsItem.issueList" :key="index" class="questionItem">
          <p class="question">
            <i class="reddot"></i>{{ issue.question }}</p>
          <p class="answer" v-for="(item, index) in issue.answer.split(/\n/)" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
      <div class="findMore" v-if="rcmList.length">
        <p class="title">
          <i class="line"></i>
          <span>大家都在看</span>
        </p>
        <div class="goodsWrapper">
          <good-info v-for="goodItem in rcmList" :key="goodItem.id" :good="goodItem" class="goodItem"></good-info>
        </div>
      </div>
    </div>
    <div class="chooseGoodsType" v-if="goodsItem">
      <div class="goodsinfo">
        <img src="http://yanxuan.nosdn.127.net/728f70a3c5a795521052ce6f0507f608.png">
        <div>
          <span class="descTag">{{ goodsItem.promotionDesc }}</span>
          <div class="price">
            <span class="text">价格:</span>
            <span class="newOne">&yen;{{ goodsItem.retailPrice }}</span>
            <span class="oldOne">&yen;{{ goodsItem.counterPrice }}</span>
          </div>
          <p>已选择:
            <span>请选择规格数量</span>
          </p>
        </div>
      </div>
      <div v-for="skutype in goodsItem.skuSpecList" :key="skutype.id" class="skutypeWrapper">
        <p class="title">{{ skutype.name }}</p>
        <ul>
          <li v-for="tagSku in skutype.skuSpecValueList" :key="tagSku.id">{{ tagSku.value}}</li>
        </ul>
      </div>
      <div>
        <p style="font-size:16px;color:#333;margin-bottom: 15px;">数量</p>
        <number-picker :number="goodsNumber" @minus="minusGoodsNum" @add="addGoodsNum"></number-picker>
      </div>
      <div class="buttons">
        <p class="return">返回</p>
        <p class="limitBy">立即购买</p>
        <p class="addTotheCart">加入购物车</p>
      </div>
      <cube-popup type="my-popup" ref="myPopup" :mask="false">
        不能再少啦！
      </cube-popup>
    </div>
  </div>
</template>

<script>
import GoodsAPI from '../service/goods'
import GoodInfo from '../views/home/GoodInfo'
import Loading from './Loading'
import NumberPicker from './NumberPicker'
export default {
  components: {
    GoodInfo,
    Loading,
    NumberPicker
  },
  data() {
    return {
      goodsId: null,
      goodsItem: null,
      bannerData: [],
      policyList: [],
      goodRates: null,
      comment: null,
      detailImg: [],
      rcmList: [],
      choseType: null,
      goodsNumber: 1,
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
  watch: {
    '$route': 'refresh'
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.goodsId = null
      this.goodsItem = null
      this.bannerData = []
      this.policyList = []
      this.goodRates = null
      this.comment = null
      this.detailImg = []
      this.rcmList = []
      this.choseType = null
      this.goodsId = this.$route.params.id
      GoodsAPI.getGoodsDetailInfo(this.goodsId).then(res => {
        if (res.data.errcode) {
          console.log(res.data)
        } else {
          this.goodsItem = res.data.data.item
          this.policyList = res.data.data.policyList
          this.comment = res.data.data.item.comments
          let tempArray = [res.data.data.item.primaryPicUrl]
          for (var key in res.data.data.item.itemDetail) {
            if (res.data.data.item.itemDetail.hasOwnProperty(key)) {
              var element = res.data.data.item.itemDetail[key]
              if (key.search('picUrl') > -1) {
                tempArray.push(element)
              }
            }
          }
          this.bannerData = tempArray
          let tempDetailImg = []
          this.goodsItem.itemDetail.detailHtml.match(/_src="(\S)*"/g).forEach(item => {
            tempDetailImg = tempDetailImg.concat(item.slice(6, item.length - 1))
          })
          this.detailImg = tempDetailImg
          console.log(this.goodsItem.skuSpecList)
        }
      })
      GoodsAPI.goodrates(this.goodsId).then(res => {
        if (res.data.errcode) {
          console.log(res.data)
        } else {
          this.goodRates = res.data.data.data
        }
      })
      GoodsAPI.getGoodsRcmList(this.goodsId).then(res => {
        if (res.data.errcode) {
          console.log(res.data)
        } else {
          this.rcmList = res.data.data
        }
      })
    },
    minusGoodsNum() {
      if (this.goodsNumber <= 1) {
        this.showPopup('myPopup')
      } else {
        this.goodsNumber--
      }
    },
    addGoodsNum() {
      this.goodsNumber++
    },
    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    }
  },
  filters: {
    formatCommentNum(count) {
      if (parseInt(count) > 999) {
        return '999+'
      } else {
        return parseInt(count)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.goodsWrapper
  min-height 100vh
  padding-bottom 100px
.swiper-box
  width 100%
  height 750px
  overflow hidden
  background #f9f9f9
  .swiper-slide
    img
      width 100%
.characteristic
  display flex
  justify-content space-between
  align-content center
  height 128px
  padding 28px 30px
  box-sizing border-box
  background #f9f9f9
  &>div
    display flex
  img
    height 72px
    width 72px
    border-radius 50%
  .desc
      margin-left 12px
    p
    line-height 32px
    font-size 28px
    color #333
    &:first-child
      margin-bottom 16px
.info
  display flex
  justify-content space-between
  padding 40px 0 40px 30px
  margin-bottom 20px
  background white
  height 206px
  .name
    // height 54px
    padding-right 10px
    margin-bottom 5px
    line-height 54px
    font-size 36px
    color #333
  .subname
    height 28px
    font-size 28px
    line-height 28px
    color #7f7f7f
  .price
    height 56px
    margin-bottom 8px
    font-size 48px
    line-height 56px
    color rgb(180, 40, 45)
    font-weight bold
  .labels
    height 56px
    .tag
      display inline-block
      margin 20px 16px 0 0
      border 1px solid rgb(244, 143, 24)
      color rgb(244, 143, 24)
      padding 0 10px
      height 34px
      line-height 34px
      font-size 24px
      box-sizing border-box
    i
      display inline-block
      width 10px
      height 18px
      margin-left 8px
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/detailTagArrow-18bee52dab.png')
      background-size 100% 100%
      background-repeat no-repeat
  .comment
    width 156px
    border-left 1px dashed #ccc
    display flex
    flex-direction column
    justify-content center
    align-items center
    .count
      height 36px
      margin-bottom 10px
      line-height 36px
      font-size 36px
      font-weight bold
      color rgb(180, 40, 45)
    .com
      height 24px
      margin-bottom 20px
      line-height 24px
      font-size 24px
      color rgb(180, 40, 45)
    .more
      width 94px
      height 36px
      box-sizing border-box
      border 1px solid rgb(127, 127, 127)
      color #333
      font-size 24px
      line-height 34px
      text-align center
.attribute
  padding-left 30px
  background white
  margin-bottom 20px
  .item
    height 103px
    line-height 103px
    font-size 28px
    box-sizing border-box
    position relative
    color #333
    .greyLine
      position absolute
      height 1px
      width 200%
      background-color rgb(217, 217, 217)
      bottom 0
      left 0
      transform scaleY(0.5)
  .service
    padding 24px 0 8px 0
    justify-content space-between
    position relative
    .title
      display inline-block
      width 84px
      vertical-align top
    .list
      display inline-block
      width 540px
    span
      display inline-block
      margin 0 40px 16px 0
      color #7f7f7f
      height 28px
      box-sizing border-box
      line-height 28px
      font-size 28px
    .redDot
      display inline-block
      width 10px
      height 10px
      border-radius 50%
      background-color rgb(180, 40, 45)
      vertical-align top
      transform translateY(6px)
      margin-right 6px
  .rightArrow
    position absolute
    right 18px
    width 50px
    height 50px
    background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-right-596d39df1e.png')
    background-repeat no-repeat
    background-size 50px 50px
    top 50%
    transform translateY(-25px)
.comment
  background white
  margin-bottom 20px
  .title
    height 92px
    box-sizing border-box
    position relative
    margin-left 30px
    .greyLine
      position absolute
      height 1px
      width 200%
      background-color rgb(217, 217, 217)
      bottom 0
      left 0
      transform scaleY(0.5)
    .rightArrow
      position absolute
      right 18px
      width 50px
      height 50px
      background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-right-596d39df1e.png')
      background-repeat no-repeat
      background-size 50px 50px
      top 50%
      transform translateY(-25px)
    span
      line-height 92px
      font-size 28px
      color #333
    .rate
      float right
      margin-right 60px
  .firstCom
    padding 0 30px
    .userinfo
      margin 30px 0 4px 0
      height 64px
      box-sizing border-box
      img
        width 64px
        height 64px
        margin-right 16px
        border-radius 50%
        vertical-align top
      .username
        line-height 64px
        font-size 28px
        color #333
        vertical-align top
      .userlevel
        display inline-block
        width 30px
        height 30px
        background-image url('http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/membership-s0c53fbeeda-475519f5ca.png')
        background-repeat no-repeat
        background-size 480px
        background-position left -8817px
        vertical-align -webkit-baseline-middle
        &.lv1
          background-position left -8817px
        &.lv2
          background-position left -8857px
        &.lv3
          background-position left -8897px
        &.lv4
          background-position left -8937px
    .goodsinfo
      margin-top 28px
      height 24px
      .time, .type
        display inline-block
        line-height 24px
        color #7f7f7f
        font-size 24px
      .type
        margin-left 16px
    .comment
      margin-top 18px
      padding-right 30px
      line-height 40px
      font-size 28px
      color #333
      padding-bottom 32px
.detailInfo
  padding 30px
  background-color white
  .title
    padding 40px 0 24px 0
    color #333
    font-size 28px
  .attrListWrapper
    .attrItemWrapper
      display flex
      padding 10px 30px 10px 0
      border-top 1px dashed #cfcfcf
      box-sizing border-box
    .name,.value
      // display inline-block
      line-height 44px
      font-size 24px
    .name
      color #999
      min-width 168px
    .value
      color #333
      box-sizing border-box
.detailImgWrapper
  width 100%
  overflow hidden
  font-size 0
  img
    width 100%
.questionList
  width 100%
  background white
  padding 0 30px 0 30px
  box-sizing border-box
  .title
    height 150px
    position relative
    span, .line
      display inline-block
      position absolute
      left 50%
      top 50%
    .line
      height 1px
      width 298px
      background rgb(204, 204, 204)
      transform translate3d(-149px, 0, 0)
    span
      color #333
      width 180px
      height 32px
      transform translate3d(-90px, -16px, 0)
      background white
      text-align center
  .questionItem
    box-sizing border-box
    color #333
    font-size 26px
    padding-bottom 26px
    .question
      color #333
      line-height 40px
      margin-bottom 15px
      .reddot
        display inline-block
        width 10px
        height 10px
        border-radius 50%
        background-color rgb(180, 40, 45)
        margin-right 6px
        position relative
        vertical-align top
        top 15px
    .answer
      padding-left 16px
      color #787878
      line-height 36px
      font-size 26px
.findMore
  width 100%
  background white
  box-sizing border-box
  .title
    height 150px
    position relative
    span, .line
      display inline-block
      position absolute
      left 50%
      top 50%
    .line
      height 1px
      width 298px
      background rgb(204, 204, 204)
      transform translate3d(-149px, 0, 0)
    span
      color #333
      width 180px
      height 32px
      transform translate3d(-90px, -16px, 0)
      background white
      text-align center
  .goodsWrapper
    background #fff
    padding-bottom 10px
    .goodItem
      vertical-align top
      &:nth-child(even)
        padding 0 10px 33px 20px
      &:nth-child(odd)
        padding 0 20px 33px 10px
.chooseGoodsType
  position fixed
  width 100vw
  height 100vh
  overflow hidden
  background white
  top 0
  left 0
  z-index 1
  padding 30px 30px 130px 30px
  box-sizing border-box
  .goodsinfo
    padding-bottom 40px
    display flex
    align-items center
    img
      width 170px
      height 170px
      background-color rgb(244,244, 244)
      margin-right 20px
    .descTag
      display inline-block
      padding 0 9px 1px 9px
      margin-bottom 12px
      box-sizing border-box
      border 1px solid rgb(244, 143, 24)
      border-radius 8
      font-size 24px
      line-height 33px
      background-color rgb(244, 143, 24)
      text-align center
      color white
    .price
      padding-bottom 10px
      box-sizing border-box
      .text, .newOne
        font-size 32px
        line-height 32px
        color #333
      .oldOne
        color #999
        font-size 32px
        lineheight 32px
        text-decoration line-through
  .skutypeWrapper
    margin-bottom 30px
    .title
      margin-bottom 24px
      font-size 27px
      line-height 27px
      color #333
    li
      display inline-block
      padding 0 34px
      margin-bottom 16px
      margin-right 24px
      color #333
      border 1px solid #333
      text-align center
      line-height 64px
      font-size 24px
  .buttons
    position absolute
    bottom 0
    left 0
    right 0
    height 96px
    display flex
    line-height 96px
    justify-content space-between
    p
      flex-grow 1
      box-sizing border-box
      border-top 1px solid rgb(199, 199, 199)
      border-bottom 1px solid rgb(199, 199, 199)
      text-align center
      font-size 28px
      color #333
    .return
      border-right 1px solid rgb(199, 199, 199)
    .addTotheCart
      border 1px solid rgb(180, 40, 45)
      background-color rgb(180, 40, 45)
      color white
.cube-my-popup
  top 50%
  left 50%
  padding-left 20px
  background rgba(0, 0, 0, 0.5)
  color #eee
  width 280px
  height 100px
  border-radius 8px
  transform translate3d(-140px,-50px,0)
  text-align center
  box-sizing border-box
</style>
