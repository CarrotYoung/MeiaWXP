var printTxt = '打印参会证'
var signInTxt = '入场签到'

Page({
  data: {
    ixdcLogoIc: getApp().globalData.ixdcLogoIc,
    printImg: getApp().globalData.printIc,
    signInImg: getApp().globalData.signIc,
    printTxt: printTxt,
    signInTxt: signInTxt
  },

  toPrintCert: function(){
    wx.redirectTo({
      url: '../print/prePrint/prePrint'
    })
  },
  // toSignin: function() {
  //   wx.redirectTo({
  //     url: '../print/prePrint'
  //   })
  // },

  signClick: function () {
    var dict2 = { name: 'username', password: 'password'};
    wx.navigateTo({
      url: '../../pages/sign/signSchedule/signSchedule?testData=' + JSON.stringify(dict2)
    })
  },

})
