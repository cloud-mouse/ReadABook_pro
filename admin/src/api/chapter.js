import request from '@/utils/request'
export const chapterApi = {
  // 获取章节列表
  get_chapter(params) {
    return request({
      url: '/admin-api/chapter/',
      method: 'get',
      params
    })
  },
  // 新增章节
  add_chapter(data) {
    return request({
      url: '/admin-api/chapter/',
      method: 'post',
      data
    })
  },
  // 更新章节
  update_chapter(data) {
    return request({
      url: `/admin-api/chapter/`,
      method: 'put',
      data
    })
  },
  // 删除章节
  delete_chapter(params) {
    return request({
      url: '/admin-api/chapter/',
      method: 'delete',
      params
    })
  }
}
