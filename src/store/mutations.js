import * as types from './mutations-types'

const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.CLEAR_TOKEN](state) {
    state.token = ''
  },
  [types.SET_NICKNAME](state, nickName) {
    state.nickName = nickName
  },
  [types.CLEAR_NICKNAME](state) {
    state.nickName = ''
  },
  [types.SET_AVATAR](state, avatar) {
    state.avatar = avatar
  },
  [types.CLEAR_AVATAR](state) {
    state.avatar = ''
  },
  [types.SET_USERLEVEL](state, userLevel) {
    state.userLevel = userLevel
  },
  [types.CLEAR_USERLEVEL](state) {
    state.userLevel = ''
  },
  [types.SET_DELIVERADDRESSLIST](state, deliverAddressList) {
    state.deliverAddressList = deliverAddressList
  },
  [types.CLEAR_DELIVERADDRESSLIST](state) {
    state.deliverAddressList = []
  },
  [types.SET_CARTLIST](state, cartList) {
    state.cartList = cartList
  },
  [types.CLEAR_CARTLIST](state) {
    state.cartList = []
  }
}

export default mutations
