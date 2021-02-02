import request from '@/utils/request'

export const financeApi = {
  // 获取统计数据
  getCommission(params) {
    return request({
      url: '/finance/getCommission',
      method: 'get',
      params
    })
  },
  /**
   * 获取财务列表
   * @param {*} params
   */
  getCashList(params) {
    return request({
      url: '/finance/getCashList',
      method: 'get',
      params
    })
  },
  /**
   * 提现
   * @param {*} data
   */
  withdrawal(data) {
    return request({
      url: '/finance/withdrawal',
      method: 'post',
      data
    })
  }

}
