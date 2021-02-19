// pages/index/index.js
const App = getApp()
import {get_book_list} from '../../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: null,
    showDesc: false,
    chapterList: [],
    page: 1,
    pageSize: 100,
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
      currentPage: this.data.page,
      pageSize: this.data.pageSize,
    }).then(res=>{
      this.setData({
        bookInfo: res.data.bookInfo,
        chapterList: res.data.chapterList
      })
      wx.setNavigationBarTitle({
        title:  res.data.name
      })
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