// pages/index/index.js
const App = getApp()
import {get_library_class, get_book_list} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    classList: [],
    bookList: [],
    currentClassId: '',
    page: 1,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClass()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  onChange(e) {
    console.log(e)
  },
  // 获取分类
  getClass() {
    get_library_class().then(res=>{
      this.setData({
        classList: res.data,
        currentClassId: res.data[0]._id
      })
      this.getBookList(res.data[0]._id)
    })
  },
  // 获取当前分类下的书本列表
  getBookList(id) {
    get_book_list({
      currentPage: this.data.page,
      pageSize: this.data.pageSize,
      class_id: id
    }).then(res=>{
      this.setData({
        bookList: res.data.list
      })
    })
  },
  toBookDetail(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/book/bookDetail/index?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
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