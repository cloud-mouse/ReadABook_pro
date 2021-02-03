import request from '@/utils/request'
/**
 * 设计师列表
 * @param {*} params
 */
export function getUsers(params) {
  return request({
    url: '/design/designerList',
    method: 'get',
    params
  })
}
/**
 * 添加设计师
 * @param {*} data
 */
export function addUsers(data) {
  return request({
    url: '/design/addUsers',
    method: 'post',
    data
  })
}
/**
 * 删除设计师
 * @param {* designer_id} data
 */
export function delUsers(data) {
  return request({
    url: '/design/delUsers',
    method: 'post',
    data
  })
}
/**
 * 修改设计师状态
 * @param {*status designer_id} data
 */
export function setEnabled(data) {
  return request({
    url: '/design/setEnabled',
    method: 'post',
    data
  })
}

