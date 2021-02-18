// pages/index/index.js
const App = getApp()
import {get_book_list, get_chapter} from '../../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: null,
    showDesc: false,
    chapterList: [],
    page: 1,
    pagesize: 100,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookList(options.id)
    this.setData({
      library_id: options.id
    })
    this.getChapter(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  // 获取当前分类下的书本列表
  getBookList(id) {
    get_book_list({
      id: id,
    }).then(res=>{
      this.setData({
        bookInfo: res.data
      })
      wx.setNavigationBarTitle({
        title:  res.data.name
      })
    })
  },

  getChapter(id) {
    wx.showLoading({
      title: '章节加载中...',
    })
    get_chapter({
      library_id: id,
      pageSize: this.data.pageSize,
      currentPage: this.data.page,
    }).then(res=>{
      this.setData({
        chapterList: res.data.list,
        total: res.data.count
      })
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  showDescDialog() {
    this.setData({
      showDesc: !this.data.showDesc
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})