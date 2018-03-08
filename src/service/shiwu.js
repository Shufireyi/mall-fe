import axios from '../utils/axios'

export default {
  getHotListByPage: (params) => axios.post('/shiwuapi/getHotListByPage', { params }),
  getShiwuIndex: () => axios.get('/shiwuapi/getShiwuIndex')
}
