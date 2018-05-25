var unLoginTxt = '未登录'
var loginTxt = '登录'
var usernameHint = '手机号或邮箱'
var passwordHint = '密码'

Page({

  data: {
    // 页面的初始数据
    ixdcLogoIc: getApp().globalData.ixdcLogoIc,
    unLoginTxt: unLoginTxt,
    usernameHint: usernameHint,
    passwordHint: passwordHint,
    loginTxt: loginTxt,

    focusPassword: false,

    username: '',
    password: '',
    msg: '',
  },


  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
    
  },

  focusNext: function() {
    this.setData({ focusPassword: true})
  },

  infoInput: function(e) {
    if (e.target.id == 'usernameInput') {
      this.data.username = e.detail.value
    } else {
      this.data.password = e.detail.value
    }
  },

  login: function (e) {
    console.log('username:' + this.data.username + '-----pwd:'+this.data.password)
    // 用户名或者密码有一个为空就不响应点击
    if (!this.data.username || !this.data.password) {
      return
    }

    var url = getApp().url.loginAPI
    url += '?password=' + this.data.password + '&name=' + this.data.username
    
    console.log('url===='+url)
    wx.showLoading({
      title: '登录中..',
    })
    this.setData({
      msg: ''
    })
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data
        if (data.code == 0) {
          wx.hideLoading()
          wx.setStorageSync('token', data.token)
          wx.setStorageSync('userid', data.userid)
          wx.redirectTo({
            url: '../index/index'
          })
        } else {
          wx.hideLoading()
          this.setData({
            msg: data.msg
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
    // wx.authorize({
    //   scope: 'scope.userInfo',
    // })
    // var token = wx.getStorageSync('token')
    // var userid = wx.getStorageSync('userid')
    // if (token && userid) {
    //   wx.redirectTo({
    //     url: '../index/index'
    //   })
    // }
  }
})