import request from '@/utils/request'

export const settingApi = {
  saveInfo(data) {
    return request({
      url: '/user/saveInfo',
      method: 'post',
      data
    })
  }
}
