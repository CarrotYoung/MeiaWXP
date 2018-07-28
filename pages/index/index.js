var printTxt = '打印参会证'
var signInTxt = '入场签到'
var avatar , pgroup
var forbidMsg = '没有权限，请联系管理员'

Page({
  data: {
    ixdcLogoIc: getApp().icon.ixdcLogoIc,
    printImg: getApp().icon.printIc,
    signInImg: getApp().icon.signIc,
    printTxt: printTxt,
    signInTxt: signInTxt,
    avatarURL:getApp().icon.defaultAvatar,
    arrowImg: getApp().icon.arrowDown,
    showPopWin: false,
  },

  onLoad: function (options) {
    var temp = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='
    console.log(options)
    avatar = options.avatar
    pgroup = options.pgroup
    this.setData({
      avatarURL: avatar
    })
  },

  toPrintCert: function () {
    if (pgroup == '80001' ||  pgroup == '80003' || pgroup == '90001') {
      wx.navigateTo({
        url: '../print/prePrint/prePrint'
      })
    } else {
      wx.showToast({
        title: forbidMsg,
      })
    }
    
  },

  showPop: function (){
    this.setData({
      showPopWin: !this.data.showPopWin,
    }); 
  },

  logout: function() {
    wx.setStorageSync('userid',undefined)
    wx.setStorageSync('name', undefined)
    wx.setStorageSync('password', undefined)
    var page = '../login/login'
    wx.redirectTo({
      url: page,
    })
  },

  signClick: function () {

    if (pgroup == '80001' || pgroup == '80004' ||pgroup == '90001') {
      wx.navigateTo({
        url: '../sign/signSchedule/signSchedule'
      })
    } else {
      wx.showToast({
        title: forbidMsg,
      })
    }
  },

})
