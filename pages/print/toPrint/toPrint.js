var attendeeId = 0
var showHis = false
var printHis
var remark = ''

Page({
  data: {
    attender: {},
    hisList: [],
    hisCount: 0,
    showHis: false,
  },


  onLoad: function(options) {
    console.log(options)
    getApp().print.connectWebSocket()

    attendeeId = options.id
    remark = ''

    this.getAttendeeInfo(options.id, options.code)
  },

  getAttendeeInfo: function(attenderId, code) {
    var that = this
    var url, params = {}
    if (code) {
      url = getApp().url.detailByCode
      params.code = code
    } else {
      url = getApp().url.attendeeDetail
      params = {
        attendeeId: attenderId,
        activityId: 1
      }
    }

    function success(data) {
      console.log(data)
      attendeeId = data.actPrintVO.attendeeId
      var hisLogs = data.actPrintLogList 
      if (!hisLogs || hisLogs.length == 0) {
        showHis = false
      } else {
        showHis = true
        printHis = hisLogs
      }
      that.setData({
        attender: data.actPrintVO,
        hisCount: hisLogs.length,
        showHis: showHis,
        printHis: printHis,
        attendeeId: data.actPrintVO.attendeeId
      })
    }
    getApp().util.sendRequest(url, success, params)
  },

  print: function() {
    var msg = {
      type: "newAttendee",
      cmd: "print",
      activityId: 1,
      attendeeId: attendeeId,
      printerName: wx.getStorageSync('printer'),
      source: 'client',
      note: remark
    }
    getApp().print.print(JSON.stringify(msg))
  },


  remarkInput: function (e) {
    remark = e.detail.value.trim()
  },

  // =================自定义dialog==================
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  itemClick: function (e) {
    var that = this

    var result = e.currentTarget.id


    // var result = this.data.value
    if (result == 'show') {
      wx.showToast({
        title: '没有选择打印机',
      })
    } else {


      wx.setStorageSync('printer', result)
      that.setData({
        printerName: result,
      })
      that.printable(true)
    }
    that.setData({
      showDialog: !this.data.showDialog
    })
  },

})