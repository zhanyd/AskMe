const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"",
    questionId: "",
    textareaValue:"",
    answerList:[]
  },

  getList:function(id){
    wx.request({
      url: app.globalData.url + '/user/getQuestionDetail',
      data: {
        id: id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res)
        this.setData({
          title: res.data.data.question.title,
          content: res.data.data.question.content,
          questionId: res.data.data.question.id,
          answerList: res.data.data.answerList
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getList(options.id)
  },

  formSubmit: function (e) {
    if (e.detail.value.content.length == 0) {

      wx.showToast({
        title: '问题内容不能为空!',
        icon: 'none',
        duration: 1500
      })

      return
    }

    wx.request({
      url: app.globalData.url + '/user/addNewAnswer',
      data: {
        userId: wx.getStorageSync('userId'),
        content: e.detail.value.content,
        questionId: this.data.questionId
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res.data)
        this.getList(this.data.questionId)
        this.setData({
          textareaValue:""
        })
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})