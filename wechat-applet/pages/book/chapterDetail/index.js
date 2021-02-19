// pages/index/index.js
const App = getApp()
import { get_chapter, chapter_turn_page} from '../../../api/api'
import WxParse from '../../../wxParse/wxParse'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterDetail: null,
    show: false,
    fontSize: 28,
    library_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChapter(options.id)
    this.setData({
      library_id: options.library_id,
      fontSize: App.globalData.fontSize
    })
    
  },
  fontsizeChange(e) {
    this.setData({
      fontSize: e.detail
    })
    App.globalData.fontSize = e.detail
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  // 上一章
  pre() {
    let that = this; 
    chapter_turn_page({
      library_id: this.data.library_id,
      page: this.data.chapterDetail.chapter_index - 1
    }).then(res=>{
      if(res.code===200) {
        wx.setNavigationBarTitle({
          title:  res.data.chapter_name
        })
        res.data.content = res.data.content.replace(/\n|\r\n/g, '<br>')
        WxParse.wxParse('article', 'html', res.data.content,that, 5);
        this.setData({
          chapterDetail: res.data
        })
        this.goTop()
      }else {
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
    })
  },
  // 下一章
  next() {
    let that = this; 
    chapter_turn_page({
      library_id: this.data.library_id,
      page: this.data.chapterDetail.chapter_index + 1
    }).then(res=>{
      if(res.code===200) {
        wx.setNavigationBarTitle({
          title:  res.data.chapter_name
        })
        res.data.content = res.data.content.replace(/\n|\r\n/g, '<br>')
        WxParse.wxParse('article', 'html', res.data.content,that, 5);
        this.setData({
          chapterDetail: res.data
        })
        this.goTop()
      }else {
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
      }
    })
  },
  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 获取章节详情
  getChapter(id) {
    let that = this; 
    get_chapter({
      chapter_id: id,
    }).then(res=>{
      wx.setNavigationBarTitle({
        title:  res.data.chapter_name
      })
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