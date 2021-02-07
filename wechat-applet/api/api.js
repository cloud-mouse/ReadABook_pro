import {
  http
} from './request.js'

var url = {
  indexInfo: "/demand/lists",  //首页信息
  // 分类
  libraryClass: '/library_class', // 分类列表
  // 书本
  bookList: '/library', // 书本列表
  // 章节
  chapterList: '/chapter', // 章节列表
}
module.exports = {
  // 用户登录
  userLogin(data) {
    return http({
      url: url.userLogin,
      data: data,
      method: "POST",
    })
  },
  // 获取用户详情
  getUserDetail(params) {
    return http({
      url: url.userInfo,
      data: params,
    })
  },
  // 获取用户手机号
  getUserPhone(params) {
    return http({
      url: url.getUserPhone,
      data: params
    })
  },
  // 保存用户手机号
  saveUserPhone(params) {
    return http({
      url: url.saveUserPhone,
      data: params
    })
  },
  // 获取首页分类列表
  get_library_class(params) {
    return http({
      url: url.libraryClass,
      data: params
    })
  },
  // 获取分类下的书本列表
  get_book_list(params) {
    return http({
      url: url.bookList,
      data: params
    })
  },
  // 获取章节列表
  get_chapter(params) {
    return http({
      url: url.chapterList,
      data: params
    })
  },
}