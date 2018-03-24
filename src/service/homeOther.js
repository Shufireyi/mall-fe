import axios from '../utils/axios'

export default {
  /**
   * 获取品牌列表
   */
  getBrandList: params => axios.get('/indexOther//brandList', { params })
}
