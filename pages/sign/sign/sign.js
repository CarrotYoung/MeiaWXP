// pages/sign/sign/sign.js
var roomName = "工作坊"
var signStatus = "签到中..."
var roomNum = "A6"
var activityTitle = "行为设计下半场行为设计下半场行为设计下半"
var scanQrHint = '点击扫码开始签到'
var scanQrTxt = '扫码'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomNum: roomNum,
    roomName: roomName,
    signStatus: signStatus,
    activityTitle: activityTitle,
    scanQrHint: scanQrHint,
    scanQrTxt: scanQrTxt,
    scanQrIc: getApp().globalData.scanQr,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  var id = options.id;
  var room = options.room;
  console.log("room=" + room)
  console.log("id=" + id)
  var title = room +'场签到'
  //设置导航栏
  wx.setNavigationBarTitle({
    title: title
  })


  // this.setData({


  // });
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
  scanQr: function () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function (res) {
        console.log(res)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})