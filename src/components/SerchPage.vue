<template>
  <div class="outerWrapper">
    <div class="searchInput">
      <p>
        <input v-model="searchWord" placeholder="关键字搜索" />
        <i class="fa fa-search" aria-hidden="true"></i>
      </p>
      <span class="searchBtn">搜索</span>
    </div>
    <div class="searchResult" v-if="searchResult.length">
      <ul>
        <router-link tag="li" v-for="item  in searchResult" :key="item" :to="{name: 'SearchResultList', params: {keyword: item}}">
          {{ item }}
        </router-link>
      </ul>
    </div>
    <div v-if="!searchResult.length">
      <div class="searchHistory"></div>
      <div class="hotKeyword">
        <header>热门搜索</header>
        <ul>
          <li v-for="word in hotKeyWords" :key="word.keyword" :class="word.highlight ? 'highlight' : ''">{{word.keyword}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SerchAPi from '../service/homeOther'
export default {
  data() {
    return {
      hotKeyWords: [],
      searchWord: '',
      searchResult: []
    }
  },
  mounted() {
    SerchAPi.getSearchInit().then(res => {
      console.log(res.data)
      if (res.data.errcode) {
        console.log(res.data)
      } else {
        this.hotKeyWords = res.data.data.hotKeywordVOList.filter(element => {
          return !element.schemeUrl
        })
      }
    })
  },
  watch: {
    searchWord(newKey) {
      if (!newKey) {
        this.searchResult = []
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.searchAutoComplete()
      }, 100)
    }
  },
  methods: {
    searchAutoComplete() {
      SerchAPi.searchAutoComplete(this.searchWord).then(res => {
        if (res.data.errcode) {
          console.log(res.data)
        } else {
          this.searchResult = res.data.data.data.slice(0, 10)
        }
      })
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../utils/stylus/mixin.styl'
.outerWrapper
  min-height 100vh
.searchInput
  display flex
  box-sizing border-box
  text-align center
  width 100%
  height 88px
  outline none
  padding 16px 30px
  border-1px(#d9d9d9)
  p
    position relative
    flex-grow 1
  input
    width 100%
    box-sizing border-box
    border-radius 5px
    background #eee
    font-size 28px
    line-height 56px
    height 56px
    color #666
    outline none
    padding-left 50px
  .fa-search
    font-size 26px
    position absolute
    top 15px
    left 14px
  .searchBtn
    color #333
    font-size 28px
    margin-left 30px
    line-height 56px
.searchResult
  background #fff
  padding-left 30px
  box-sizing border-box
  li
    display block
    font-size 28px
    line-height 80px
    height 80px
    color #333
    border-bottom 1px solid rgba(63,63,63,.2)
    &:last-child
      border-bottom none
.hotKeyword
  padding 0 30px 30px 30px
  margin-bottom 20px
  background white
  header
    color #999
    font-size 28px
    line-height 90px
  li
    display inline-block
    padding 0 15px
    margin 0 32px 32px 0
    box-sizing border-box
    color #333
    font-size 24px
    line-height 46px
    border 1px solid rgb(153, 153, 153)
    &.highlight
      border-color rgb(180, 40, 45)
      color rgb(180, 40, 45)
</style>
