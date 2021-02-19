import request from '@/utils/request'
/**
 * 用户列表
 * @param {*} params
 */
export function getUsers(params) {
  return request({
    url: '/admin-api/users/list',
    method: 'get',
    params
  })
}
/**
 * 添加用户
 * @param {*} data
 */
export function addUsers(data) {
  return request({
    url: '/admin-api/users/',
    method: 'post',
    data
  })
}
/**
 * 编辑用户
 * @param {*} data
 */
export function editUsers(data) {
  return request({
    url: '/admin-api/users/',
    method: 'put',
    data
  })
}
/**
 * 删除用户
 * @param {* _id} data
 */
export function delUsers(params) {
  return request({
    url: '/admin-api/users/',
    method: 'delete',
    params
  })
}
/**
 * 修改用户状态
 * @param {*status _id} data
 */
export function setEnabled(data) {
  return request({
    url: '/admin-api/users/',
    method: 'patch',
    data
  })
}

