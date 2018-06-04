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
    scanQrIc: getApp().icon.scanQr,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var dataDic = JSON.parse(options.dataDic);
    var id = dataDic.id;
    var room = dataDic.room;
    console.log("dataDic================" + JSON.stringify(dataDic))
    var title = room + '场签到'
    //设置导航栏
    wx.setNavigationBarTitle({
      title: title
    })

    var unsignNum = dataDic.buyNum - dataDic.signCount;

    this.setData({
      signStatus: dataDic.signStatus,
      roomNum:room,
      activityTitle: dataDic.title,
      roomName:dataDic.roomType,
      allNum:dataDic.buyNum,
      signNum: dataDic.signCount,
      unsignNum: unsignNum
    });

    //获取网络数据
    this.getSignListData(id);

  },

  //拉取签到数据
  getSignListData: function (id, attendeeName) {

    var userid = wx.getStorageSync('userid')
    var url = getApp().url.scheduleAttendList + '?scheduleId=' + id + '&userId=' + userid;
    function success(result) {
     var dataArr =  result.data

     console.log("网络数据请求");
     console.log(dataArr)

    }

    function fail() {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
      })
    }

    getApp().util.sendRequest(url, success, "", "", 'GET')


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
      complete: function (res) { 

      console.log('扫码完成了--')
      console.log(res.result)

      },
    })
  }
})