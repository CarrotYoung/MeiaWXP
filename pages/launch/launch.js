
Page({

  data: {
    logo: getApp().icon.ixdcLogoIc,
  },


  onLoad: function (options) {
    var that = this
    setTimeout(function () {
      if (wx.getStorageSync('name')) {
        that.autoLogin()
      } else {
        wx.redirectTo({
          url: '../login/login',
        })
      }
      
    }, 1000);
  },

  autoLogin: function (e) {
    var url = getApp().url.loginAPI
    url += '?password=' + wx.getStorageSync('password') + '&name=' + wx.getStorageSync('name')
    console.log('url====' + url)
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data
        console.log(res)
        if (data.code == 0) {
          wx.setStorageSync('userid', data.userId)

          wx.redirectTo({
            url: '../index/index?avatar=' + data.headShot + '&pgroup=' + data.pgroup
          })
        } else {
          wx.showToast({
            title: data.msg
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败',
        })
      },
    })
  },
})