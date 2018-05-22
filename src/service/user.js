import axios from '../utils/axios'

export default {
  /**
   * phoneNumber
   * type true注册 false 修改密码
   */
  setMesssage: params => axios.post('/users/setMesssage', { ...params }),

  /**
   * phone
   * password
   */
  login: params => axios.post('/users/login', { ...params }),

  /**
   * phone
   * password
   * code
   */
  registe: params => axios.post('/users/registe', { ...params }),

  /**
   * newpasswd
   * code
   */
  resetPassword: params => axios.post('/users/resetPassword', { ...params }),

  /**
   * 更新用户昵称
   * newNickName
   */
  updateNickName: params => axios.post('/users/updateNickName', { ...params }),

  /**
   * 添加收货地址
   * 参数 token
   * 参数 收件人 deliverMan
   * 参数 收件地址区 deliverAddressZone
   * 参数 收件地址 deliverAddress
   * 参数 联系方式 deliverPhone
   */
  addAddress: params => axios.post('/users/addAddress', { ...params }),

  /**
   * 修改收货地址
   * 参数 token
   * 参数 地址id id
   * 参数 收件人 deliverMan
   * 参数 收件地址区 deliverAddressZone
   * 参数 收件地址 deliverAddress
   * 参数 联系方式 deliverPhone
   */
  updateAddress: params => axios.post('/users/updateAddress', { ...params }),

  /**
   * 删除收货地址
   * 参数 token
   * 参数 地址id id
   */
  deleteAddress: id => axios.delete(`/users/deleteAddress?id=${id}`),

  /**
   * 新建订单
   */
  newOrder: params => axios.post('/users/newOrder', { ...params }),

  /**
   * 购买
   */
  payOrder: params => axios.post('/alipayService/alipay', { ...params })
}
