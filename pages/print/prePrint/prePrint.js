var selectPrinter = '选择打印机'
var printerName = ''
var scanQrHint = '点击扫码开始打印'
var scanQrTxt = '扫码'
var printerList

Page({  
  data: {
    selectPrinter: selectPrinter,
    printerName: printerName,
    arrowDown: getApp().icon.arrowDown,
    scanQrHint: scanQrHint,
    scanQrIc: getApp().globalData.scanQr,
    scanQrTxt: scanQrTxt,
  },

  onLoad: function (options) {
    this.getAvailablePrinter()
  },

  getAvailablePrinter: function (e) {
    var that = this
    var url = getApp().url.listPrinter
    function success(result) {
      // var printer = wx.getStorageSync('print')
      // if (printer) {
      //   for (var i in data.data) {
      //     var item = data.data[i]
      //     if (printer == item) {
      //       that.setData({
      //         index: i
      //       })
      //     }
      //   }
      // } else if (data.data.length > 0) {
      //   printer = data.data[0]
      //   // wx.setStorageSync('print', printer)
      // }

      that.setData({
        printerList: result.data
      })

      printerList = result.data
      if (printerList && printerList.length == 1) {
        that.setData({
          printerName: printerList[0]
        })

      }

    }

    getApp().util.sendRequest(url, success)
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
  },
  toAllAttendees: function(){
    wx.navigateTo({
      url: '../allAttendees/allAttendees'
    })
  }

  
})