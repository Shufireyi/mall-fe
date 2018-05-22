// eslint-disable-next-line
import * as types from './mutations-types'

export const updateUser = function({ commit }, user) {
  commit(types.SET_AVATAR, user.avatar)
  commit(types.SET_NICKNAME, user.nickName)
  commit(types.SET_CARTLIST, user.cartList)
  commit(types.SET_ORDERLIST, user.orderList)
  commit(types.SET_DELIVERADDRESSLIST, user.deliverAddressList)
  commit(types.SET_USERLEVEL, user.userLevel)
}
