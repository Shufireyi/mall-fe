<template>
  <b-scroll ref="scroll" :data="comments" :pullup="true" @scrollToEnd="onPullingUp" class="wrapper">
    <div style="padding-bottom:50px;">
      <div class="rates" v-if="rates">
        <span>评分</span>
        <cube-rate class="stars" v-if="rates" v-model="rates.star" :disabled="true" :max="5" :justify="true"></cube-rate>
        <span>{{ rates.goodCmtRate }}</span>
      </div>
      <div class="tagWrapper" v-if="tagList.length">
        <span class="commenttagItem active">{{tagList[0].name}}({{tagList[0].strCount}})</span>
        <span v-for="tag in tagList.slice(1)" :key="tag.name" class="commenttagItem">{{tag.name}}({{tag.strCount}})</span>
      </div>
      <div class="commentItemWrapper">
        <ul>
          <li v-for="(comment, index) in comments" :key="comment.frontUserName + index" class="eachComment">
            <p class="info">
              <img v-lazy="comment.frontUserAvatar ? comment.frontUserAvatar : 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'" class="avatar">
              <span class="username">{{ comment.frontUserName }}</span>
              <span class="userlevel" :class="'lv' + comment.memberLevel"></span>
              <cube-rate class="stars" v-model="comment.star" :disabled="true" :max="5" :justify="true"></cube-rate>
            </p>
            <p class="goodsku">
              <span>{{ comment.createTime | formatTime }}</span>
              <span v-for="itemSku in comment.skuInfo" :key="itemSku">{{itemSku}};</span>
            </p>
            <p class="maincomment">
              {{ comment.content }}
            </p>
            <p class="imgsWrapper">
              <img v-for="pic in comment.picList" v-lazy="pic + '?imageView&quality=65&thumbnail=330x330'" :key="pic">
            </p>
          </li>
        </ul>
      </div>
      <div v-if="hasMore && show" class="tipInfo">加载更多...</div>
      <div v-if="noData && show" class="tipInfo">没有数据了^_^</div>
    </div>
  </b-scroll>
</template>

<script>
import GoodsAPI from '../service/goods'
import BScroll from './Scroll'
export default {
  components: {
    BScroll
  },
  data() {
    return {
      goodsId: -1,
      tag: '全部',
      page: 1,
      rates: null,
      tagList: [],
      comments: [],
      hasMore: true,
      noData: false,
      show: false,
      canLoading: true
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      if (!this.$route.params.id) {
        return
      }
      this.goodsId = this.$route.params.id
      GoodsAPI.goodrates(this.goodsId).then(res => {
        if (res.data.errcode) {
          console.log(res.data)
        } else {
          this.rates = res.data.data.data
        }
      })
      GoodsAPI.getCommentTagList(this.goodsId).then(res => {
        if (res.data.errcode) {
          console.log(res.data)
        } else {
          this.tagList = res.data.data
        }
      })
      GoodsAPI.getCommentListByTag({
        itemId: this.goodsId,
        tag: this.tag,
        page: this.page
      }).then(res => {
        this.comments = res.data.data.result
        this.show = true
      })
    },
    onPullingUp() {
      if (!this.canLoading) {
        return
      }
      this.canLoading = false
      this.page++
      GoodsAPI.getCommentListByTag({
        itemId: this.goodsId,
        tag: this.tag,
        page: this.page
      }).then(res => {
        if (res.data.data.pagination.page === res.data.data.pagination.totalPage) {
          this.hasMore = false
          this.noData = true
        } else {
          this.comments = this.comments.concat(res.data.data.result)
          this.show = true
        }
        this.canLoading = true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  height 100vh
  background white
.rates
  display flex
  justify-content flex-start
  padding 30px 30px 0 30px
  font-size 28px
  line-height 34px
  .stars
    height 33px
    width 234px
    margin 0 20px
    vertical-align top
  span
    display inline-block
    vertical-align top
    color #7f7f7f
    height 34px
    line-height 40px
    font-size 28px
.tagWrapper
  padding 8px 0 32px 34px
  border-bottom 1px solid rgba(127, 127, 127, 0.2)
  .commenttagItem
    border 1px solid #7f7f7f
    margin 32px 32px 0 0
    padding 8px 16px 11px 16px
    display inline-block
    font-size 24px
    color #333
    &.active
      border-color #b4282d
      color #b4282d
.commentItemWrapper
  padding-left 30px
  padding-right 30px
  box-sizing border-box
  .info
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
    .stars
      width 183px
      height 26px
      margin-left 10px
      vertical-align -webkit-baseline-middle
  .goodsku
    margin-top 18px
    color #7f7f7f
    font-size 24px
    line-height 24px
    & span:first-child
      margin-right 16px
  .maincomment
    margin-top 16px
    padding-right 30px
    color #333
    font-size 28px
    line-height 40px
  .imgsWrapper
    margin 22px 0 6px 0
    padding-bottom 30px
    img
      max-height 144px
      margin-right 27px
      &:last-child
        margin 0
  .eachComment
    border-bottom 1px solid hsla(0,0%,50%,.2)
.tipInfo
  padding-top 40px
  text-align center
  line-height 40px
  font-size 28px
  color #7f7f7f
</style>
