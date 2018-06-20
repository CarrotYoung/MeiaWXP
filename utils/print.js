var wssURL = 'ws://edu.meia.me/socketServer'

module.exports = {
  count: 0,  //自动重连计数
  isconnect: false,
  printdata: '', //打印请求参数
  print: function (msg) {
    console.log(msg)
    wx.sendSocketMessage({
      data: msg,
      success: function () {
        wx.showLoading({
          title: '打印中..',
          mask: true
        })
      },
      fail: function () {
        wx.showToast({
          title: '打印失败',
        })
      }
    })
  },
  connectWebSocket: function (e) {
    var that = this
    wx.connectSocket({
      url: wssURL,
    })
    that.listenWebSocket(e)
    console.log('连接服务器'+wssURL)
  },
  listenWebSocket: function (e) {
    var that = this
    wx.onSocketOpen(function (res) {
      that.count = 0
      that.isconnect = true
      console.log('已连接服务器')
      if (that.printdata) {
        that.print(that.printdata)
        that.printdata = ''
      }
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器消息')
      console.log(res.data)
      wx.hideLoading()
      // wx.navigateTo({
      //   url: '../result/result?data=' + encodeURIComponent(JSON.stringify(res.data))
      // })
    })
    wx.onSocketClose(function (res) {
      that.isconnect = false
      console.log('连接已断开')
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
      that.isconnect = false
      var count = that.count
      if (count < 5) {
        that.count += 1
        wx.connectSocket({
          url: wssURL,
        })
      }
    })
  },
}