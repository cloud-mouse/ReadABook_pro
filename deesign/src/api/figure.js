import request from '@/utils/request'
export const figureApi = {
  // 获取列表
  getList(params) {
    return request({
      url: '/design/designList',
      method: 'get',
      params
    })
  },
  // 上传
  upload(params) {
    return request({
      url: '/uploadDesign',
      method: 'get',
      params
    })
  },
  /**
   * 添加花样
   * @param {
   design_name
   design
    } data
  */
  addFigure(data) {
    return request({
      url: '/design/addDesign',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  /**
 * 编辑花样花样
 * @param {} data
  */
  editFigure(data) {
    return request({
      url: '/design/editDesign',
      method: 'post',
      data
    })
  },
  /**
   * 删除花样
   * @param {* design_id} data
   */
  deleteFigure(data) {
    return request({
      url: '/design/delDesign',
      method: 'post',
      data
    })
  },
  /**
   * 花样标价
   * @param {* design_id price} data
   */
  setPrice(data) {
    return request({
      url: '/design/setPrice',
      method: 'post',
      data
    })
  },
  /**
   * 花样上下架
   * @param {* design_id status} data
   */
  setStatus(data) {
    return request({
      url: '/design/setStatus',
      method: 'post',
      data
    })
  },

  /**
   * 花样统计
   * @param {* design_name designer_id status} params
   */
  designCount(params) {
    return request({
      url: '/design/designCount',
      method: 'get',
      params
    })
  }
}
