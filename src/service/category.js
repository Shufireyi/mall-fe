import axios from '../utils/axios'

export default {
  getMailCategory: () => axios.get('/category/getMailCategory'),
  getSubCategory: id => axios.get(`/category/getSubCategory?id=${id}`)
}
