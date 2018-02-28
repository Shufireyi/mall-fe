import axios from '../utils/axios'

export default {
  getHomeInfo: () => axios.get('/home'),
  getCategory: () => axios.get('/category'),
  getBannerData: () => axios.get('/bannerdata'),
  getTaglistfour: () => axios.get('/taglistfour'),
  getNewGoods: () => axios.get('/getnewgoods'),
  getPopularGoods: () => axios.get('/populargoods'),
  getLimitTimeSale: () => axios.get('/limittimesale'),
  getFuliSale: () => axios.get('/fulisale'),
  getDiffCateSale: () => axios.get('/diffcatesale')
}
