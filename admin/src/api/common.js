import request from '@/utils/request'
/**
 * 设计师列表
 * @param {*} params
 */
export function downloadImg(params) {
  return request({
    url: '/design/downLoad',
    method: 'get',
    params
  })
}
