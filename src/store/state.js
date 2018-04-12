import { getUser, getToken } from '../utils/cache'
const USER = getUser()
const state = {
  cartList: USER.cartList || [],
  deliverAddressList: USER.deliverAddressList || [],
  avatar: USER.avatar || '',
  nickName: USER.nickName || '',
  userLevel: USER.userLevel || '',
  token: getToken()
}

export default state
