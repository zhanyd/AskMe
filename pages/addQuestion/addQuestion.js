Page({
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.content.length == 0) {

      wx.showToast({
        title: '问题内容不能为空!',
        icon: 'none',
        duration: 1500
      })

     return
    }

    wx.request({
      url: 'test.php', 
      data: {
        content: e.detail.value.content
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"  
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})