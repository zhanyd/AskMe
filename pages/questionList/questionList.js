const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      questionList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.url + '/user/getQuestionList',
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
        this.setData({
          questionList: res.data.data
        })
      }
    })
  },

  onPullDownRefresh: function(){
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading(); 
    wx.request({
      url: app.globalData.url + '/user/getQuestionList',
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
        this.setData({
          questionList: res.data.data
        })
      },
       complete: function (res) {
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();  
        wx.stopPullDownRefresh();
      }
    })
  },

  godetail: function (event) {
    console.log(event)
    console.log("id = " + event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../questionDetail/questionDetail?id=' + event.currentTarget.dataset.id
    })
  },

  goAddQuestion: function () {
    wx.navigateTo({
      url: '../addQuestion/addQuestion'
    })
  }
})