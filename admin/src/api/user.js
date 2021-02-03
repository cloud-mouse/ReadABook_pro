import request from '@/utils/request'
/**
 * 用户登录
 * @param {*} data
 */
export function login(data) {
  return request({
    url: '/admin-api/users/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户信息
 */
export function getInfo(params) {
  return request({
    url: '/admin-api/users/info',
    method: 'get',
    params
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
/**
 * 发送验证码
 */
export function sendSms(data) {
  return request({
    url: '/user/sendSms',
    method: 'post',
    data
  })
}

/**
 * 立即激活
 */
export function doActivate(data) {
  return request({
    url: '/user/sendSms',
    method: 'post',
    data
  })
}
/**
 * 修改密码
 */
export function changePsd(data) {
  return request({
    url: '/user/changePsd',
    method: 'post',
    data
  })
}

