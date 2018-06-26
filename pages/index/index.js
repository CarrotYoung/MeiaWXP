var printTxt = '打印参会证'
var signInTxt = '入场签到'

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

  toPrintCert: function () {
    wx.navigateTo({
      url: '../print/prePrint/prePrint'
    })
  },

  showPop: function (){
    this.setData({
      showPopWin: !this.data.showPopWin,
    }); 
  },

  logout: function() {
    wx.setStorageSync('userid',undefined)
    var page = '../login/login'
    wx.redirectTo({
      url: page,
    })
  },

  signClick: function () {
    var dict2 = { name: 'username', password: 'password' };
    wx.navigateTo({
      url: '../../pages/sign/signSchedule/signSchedule?testData=' + JSON.stringify(dict2)
    })
  },

})
