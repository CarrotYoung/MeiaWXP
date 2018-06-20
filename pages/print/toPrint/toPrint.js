var attendeeId = 0

Page({
  data: {
    attender: {},
    hisList: [],
    hisCount: 0,
  },


  onLoad: function (options) {
    console.log(options)
    getApp().print.connectWebSocket()

    attendeeId = options.id

    this.getAttendeeInfo(options.id)
  },

  getAttendeeInfo: function (attenderId) {
    var that = this
    var url = getApp().url.attendeeDetail
    var params = {
      attendeeId: attenderId,
      activityId: 1
    }
 
    function success(data) {
      console.log(data)
      // var hisLogs = data.actPrintLogList ? JSON.stringify(data.actPrintLogList):[]
      that.setData({
        attender: data.actPrintVO,
        // hisList: JSON.stringify(data.actPrintLogList),
        // hisCount: hisLogs ? hisLogs.size:0
      })
    }
    getApp().util.sendRequest(url, success,params)
  },

  print: function(){  
    var msg = {
      type: "newAttendee",
      cmd: "print",
      activityId: 1,
      attendeeId: attendeeId,
      printerName : 'YANGQINGHUA-PC:Deli-007',
      source: 'client'
    }
    getApp().print.print(JSON.stringify(msg))
  },

  onReady: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },


  onShareAppMessage: function () {
  
  }
})