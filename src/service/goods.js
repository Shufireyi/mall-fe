import axios from '../utils/axios'

export default {
  getAllGoodsNum: () => axios.get('/goods/getAllGoodsNum'),
  getGoodsByCategroy: id => axios.get(`/goods/getGoodsByCategroy?id=${id}`)
}
