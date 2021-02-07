// pages/index/index.js
const App = getApp()
import { get_chapter} from '../../../api/api'
import WxParse from '../../../wxParse/wxParse'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterDetail: null,
    show: false,
    fontSize: 14
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChapter(options.id)
  },
  fontsizeChange(e) {
    console.log(e);
    this.setData({
      fontSize: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  getChapter(id) {
    get_chapter({
      chapter_id: id,
    }).then(res=>{
      wx.setNavigationBarTitle({
        title:  res.data.chapter_name
      })
      var that = this; 
      res.data.content = res.data.content.replace(/\n|\r\n/g, '<br>')
      WxParse.wxParse('article', 'html', res.data.content,that, 5);
      this.setData({
        chapterDetail: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  showSetting() {
    this.setData({
      show: !this.data.show
    })
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