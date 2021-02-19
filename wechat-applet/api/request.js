/**
 * 封装http 请求方法
 */
const apiUrl = "http://192.168.3.168:3000/wx-api"; //服务器api地址
// const apiUrl = "https://read.zhanghaoblog.top/wx-api"; //服务器api地址

const http = (params) => {
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: apiUrl + params.url, //服务器url+参数中携带的接口具体地址
      data: params.data, //请求参数
      header: params.header || {
        "Content-Type": "application/x-www-form-urlencoded" //设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
      },
      method: params.method || 'GET', //默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType, //返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType, //响应的数据类型
      success: (res)=> {
        wx.hideLoading()
        //接口访问正常返回数据
        if (res.statusCode == 200) {
          //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
          if (res.data.code == "1") {
            resolve(res.data)
            //2.用户操作成功，但是用户未登录
          } else if (res.data.code == "-1") {
            wx.showToast({
              icon: "none",
              title: '登录失效，请重新登录'
            })
            wx.clearStorageSync()
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              cancelText: '取消',
              confirmText: '立即登录',
              success(res) {
                if (res.confirm) {
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '/pages/authorize/index',
                    })
                  }, 1500)
                } else {
                  wx.showToast({
                    icon: 'none',
                    title: '您取消了登录',
                  })
                }
              }
            })
            resolve(res.data)
            // 3.如果用户没有登录，清楚掉本地的所有缓存
          } else if(res.data.msg === '请先登录') {
            wx.clearStorageSync()
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              cancelText: '取消',
              confirmText: '立即登录',
              success(res){
                if(res.confirm){
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '/pages/authorize/index',
                    })
                  }, 1500)
                }else {
                  wx.showToast({
                    icon: 'none',
                    title: '您取消了登录',
                  })
                }
              }
            })
            resolve(res.data)
          }  else if (params.url == "/order/result" && res.data.retCode == "800020") { 
            //支付结果未知      
            //需要特殊处理的接口，可以单独列出来返回数据
            resolve(res.data)
          } else {
            resolve(res.data)
          }
        } else {
          //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示
          resolve(res.data)
          var errMsg = res.data.msg
        }
      },
      fail: function(e) {
        wx.hideLoading()
        reject(e)
      }
    })
  })
}
module.exports = {
  http: http,
  baseUrl: apiUrl
}