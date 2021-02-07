//app.js
const { userLogin, getUserDetail, prepareDemand, getIndex, pageIndex } = require('/api/api.js')
App({
  onLaunch: function () {
    let _this = this;
    // 小程序主动更新
    _this.updateManager()
  },
  /**
   * 当前用户id
   */
  getUserId() {
    return wx.getStorageSync('user_id');
  },
  /**
  * 验证是否存在user_info
  */
  validateUserInfo() {
    let user_info = wx.getStorageSync('user_info');
    return !!wx.getStorageSync('user_info');
  },
  /**
   * 小程序主动更新
   */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，即将重启应用',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },
  /**
  * 授权登录
  */
  getUserInfo(e, callback) {
    let App = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({
      title: "正在登录",
      mask: true
    });
    var _this =this
    // 执行微信登录
    wx.login({
      success(res) {
        // 发送用户信息
        userLogin({
          code: res.code,
          user_info: e.detail.rawData,
          wxapp_id: 10001,
        }).then( res => {
          wx.hideLoading()
          // 记录token user_id
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('user_id', res.data.user_id);
          _this.getUserDetail()
          callback && callback();
          }).catch(error=>{
          })
      }
    });
  },
  // 获取轮播
  getPageIndex() {
    pageIndex({
      wxapp_id: 10001,
      token: wx.getStorageSync('token')
    }).then(res => {
      if (res.data.unread != null && res.data.unread != '') {
        wx.setTabBarBadge({
          index: 2,
          text: (res.data.unread).toString()
        })
      }
    })
  },
  // 发起支付
  doWxPay(param, callback) {
    //小程序发起微信支付
    wx.requestPayment({
      timeStamp: param.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错
      nonceStr: param.nonceStr,
      package: 'prepay_id=' + param.prepay_id,
      signType: 'MD5',
      paySign: param.paySign,
      success: function (event) {
        // success
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });
        callback && callback();
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      fail: function (error) {
        // fail
        wx.showToast({
          icon: 'none',
          title: '支付失败',
        })
        callback && callback();
      },
      complete: function () {
        // complete
      }
    });
  },
  // 获取用户详情
  getUserDetail(callback){
    getUserDetail({
      wxapp_id: 10001,
      token: wx.getStorageSync('token')
    }).then(res=>{
      this.globalData.dealer = res.data.dealer
      this.globalData.buyer = res.data.buyer
      this.globalData.userInfo = res.data.userInfo
      this.globalData.phone = res.data.userInfo.phone
      callback && callback(res);
    }).catch(error=>{})
  },
  /**
 * 验证登录
 */
  checkIsLogin() {
    return wx.getStorageSync('token') != '' && wx.getStorageSync('user_id') != '';
  },
  checkPhone() {
    return this.globalData.phone!=''
  },
  globalData: {
    userInfo: {},
    fontSize: 28
  }
})