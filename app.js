//app.js
App({
  util: require('utils/util'),
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })


  },
  url: {
    api: 'https://meia.me/',
    listAttendees: 'https://meia.me/api/act/attendee/list',
    loginAPI: 'https://u.meia.me/api/act/user/login',
    printerList: 'https://meia.me//api/act/printerlist',
    signScheduleList:'http://edu.meia.me/act/app/schedule/listJson', //日程列表
    // scheduleDetail:'http://edu.meia.me/act/app/schedule/detailJson', //签到详情
    scheduleAttendList:'http://edu.meia.me/act/app/schedule/attendeeListJson',//签到列表
    scheduleSign:'http://edu.meia.me/act/app/schedule/signJson?scheduleId=23&attendeeId=1&signCount=0'  //签到

  },
  globalData: { // 小程序全局
    userInfo: null,
    ixdcLogoIc: '/icons/logo.png',
    arrowDown: '/icons/arrow_down.png',
    arrowUp: '/icons/arrow_up.png',
    rightArrow:'/icons/right_arrow.png',
    scanQr: '/icons/scan_qr.png',
    printIc: '/icons/print_green.png',
    signIc: '/icons/sign_in.png',
    resultSuccess:'/icons/result_success.png',
    resultWarning:'/icons/result_warning.png',
    resultFail:'icons/result_fail.png'
  }
})