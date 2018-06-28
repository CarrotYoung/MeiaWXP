var printTxt = '打印参会证'
var signInTxt = '入场签到'

Page({
  data: {
    ixdcLogoIc: getApp().icon.ixdcLogoIc,
    printImg: getApp().icon.printIc,
    signInImg: getApp().icon.signIc,
    printTxt: printTxt,
    signInTxt: signInTxt
  },

  toPrintCert: function () {
    wx.navigateTo({
      url: '../print/prePrint/prePrint'
    })
  },

  signClick: function () {
    // var dict2 = { name: 'username', password: 'password' };
    wx.navigateTo({
      url: '../../pages/sign/signSchedule/signSchedule'   //+ JSON.stringify(dict2)
    })
  },

})
