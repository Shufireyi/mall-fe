import axios from '../utils/axios'

export default {
  getAllGoodsNum: () => axios.get('/goods/getAllGoodsNum'),
  getGoodsByCategroy: id => axios.get(`/goods/getGoodsByCategroy?id=${id}`),
  getGoodsDetailInfo: id => axios.get(`/goods/detail?id=${id}`),
  goodrates: id => axios.get(`/goods/goodrates?id=${id}`),
  getGoodsRcmList: id => axios.get(`/goods/getgoodsrcmlist?id=${id}`),
  getCommentTagList: id => axios.get(`/goods/getcommenttaglist?id=${id}`),
  getCommentListByTag: params =>
    axios.get('/goods/getcommentlistBytag', { params })
}
