var unLoginTxt = '未登录'
var usernameHint = '手机号或邮箱'
var passwordHint = '密码'

var username,password

Page({

  data: {
    ixdcLogoIc: getApp().icon.ixdcLogoIc,
    unLoginTxt: unLoginTxt,
    usernameHint: usernameHint,
    passwordHint: passwordHint,
    focusPassword: false,
  },

  focusNext: function() {
    this.setData({ focusPassword: true})
  },

  infoInput: function(e) {
    if (e.target.id == 'usernameInput') {
      username = e.detail.value
    } else {
      password = e.detail.value
    }
  },

  login: function (e) {
    console.log('username:' + username + '-----pwd:'+password)

    var that = this
    if (!username || !password) {
      return
    }

    var url = getApp().url.loginAPI
    url += '?password=' + password + '&name=' + username
    
    console.log('url===='+url)
    wx.showLoading({
      title: '登录中..',
    })
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        var data = res.data
        console.log(res)
        if (data.code == 0) {
          wx.setStorageSync('userid', data.userId)
          wx.setStorageSync('name', username)
          wx.setStorageSync('password', password)

          wx.redirectTo({
            url: '../index/index?avatar=' + data.headShot + '&pgroup='+data.pgroup
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


  onLoad: function () {
  }
})