import request from '@/utils/request'
export const libraryClassApi = {
  // 获取列表
  getList(params) {
    return request({
      url: '/admin-api/library_class/',
      method: 'get',
      params
    })
  },
  // 新增分类
  add_library_class(data) {
    return request({
      url: '/admin-api/library_class/',
      method: 'post',
      data
    })
  },
  update_library_class(data) {
    return request({
      url: `/admin-api/library_class/`,
      method: 'put',
      data
    })
  },
  // 新增分类
  delete_library_class(params) {
    return request({
      url: '/admin-api/library_class/',
      method: 'delete',
      params
    })
  }
}

export const libraryApi = {
  // 获取书本列表
  get_library(params) {
    return request({
      url: '/admin-api/library/',
      method: 'get',
      params
    })
  },
  // 新增书本
  add_library(data) {
    return request({
      url: '/admin-api/library/',
      method: 'post',
      data
    })
  },
  // 更新书本
  update_library(data) {
    return request({
      url: `/admin-api/library/`,
      method: 'put',
      data
    })
  },
  // 删除书本
  delete_library(params) {
    return request({
      url: '/admin-api/library/',
      method: 'delete',
      params
    })
  },
  // 修改状态
  change_status(data) {
    return request({
      url: '/admin-api/library/',
      method: 'patch',
      data
    })
  },
  importBook(data) {
    return request({
      url: '/admin-api/library/import-book',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
