import axios from '../utils/axios'

export default {
  /**
   * 获取品牌列表
   */
  getBrandList: params => axios.get('/indexOther/brandList', { params }),
  /**
   * 品牌详细信息
   */
  getBrandDetail: params => axios.get('/indexOther/brandDetail', { params }),
  getBrandInfo: id => axios.get(`/indexOther/brandInfo?tagId=${id}`),

  /**
   * 新品首发
   */
  newGoodsDetail: () => axios.get('/indexOther/newGoodsDetail'),
  /**
   * 新品列表
   */
  getNewGoodsList: params => axios.get(`/indexOther/newGoodsList`, { params })
}
