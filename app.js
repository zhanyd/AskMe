//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        wx.getUserInfo({
          success: userInfo_res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                url: this.globalData.url + '/user/getOpenidAndSession',
                data: {
                  code: res.code,
                  nickName: userInfo_res.userInfo.nickName
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: res => {
                  console.log(res)
                  wx.setStorage({
                    key: "openid",
                    data: res.data.data.openid
                  })

                  wx.setStorage({
                    key: "sessionKey",
                    data: res.data.data.session_key
                  })

                  wx.setStorage({
                    key: "userId",
                    data: res.data.data.userId
                  })

                  console.log(res.data.data.userId)
                }
              })
            }
        })

       
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    //url: "http://192.168.101.251:8080"
    url: "https://www.yidinghenbang.com"
  }
})