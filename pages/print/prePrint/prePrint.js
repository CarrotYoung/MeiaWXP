var printerList
var scanAble = false

Page({
  data: {
    selectPrinter: '选择打印机',
    arrowDown: getApp().icon.arrowDown,
    scanQrHint: '请先选择打印机',
    scanQrIc: getApp().icon.scanQr,
    scanQrTxt: '扫码',
    showDialog: false,
    noPrinterImg: getApp().icon.printGray,
    hasPrinter: false, //用于popwindow的显示控制
  },

  onLoad: function(options) {
    this.getAvailablePrinter()


    var that = this
    that.setData({
      value: 'show'
    })
  },

  getAvailablePrinter: function(e) {
    var that = this
    var url = getApp().url.listPrinter

    function success(result) {

      that.setData({
        printerList: result.data
      })

      printerList = result.data

      if (printerList && printerList.length > 0) {
        that.setData({
          hasPrinter: true
        })

      } else { //没有打印机，不让扫码
        that.printable(false)
        that.setData({
          hasPrinter: false
        })

        // that.setData({
        //   hasPrinter: true
        // })

        // printerList = ['打印机01', '打印机02', '打印机03', '打印机04', '打印机05', '打印机06', '打印机07', '打印机08', '打印机09', '打印机10']

        // that.setData({
        //   printerList: printerList
        // })

      }

      that.toggleDialog()
    }

    getApp().util.sendRequest(url, success)
  },

  reloadPrinter: function() {
    this.getAvailablePrinter()
    this.toggleDialog()
  },

  scanQr: function() {
    if (!scanAble) return;

    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function(res) {
        console.log(res.result)
        if (res.result.indexOf(getApp().url.printQrCode) < 0) {
          wx.showToast({
            title: '无效二维码',
          })
          return
        }

        var code = res.result.substring(res.result.indexOf('=') + 1)
        console.log(code)

        wx.navigateTo({
          url: '../toPrint/toPrint?code=' + code,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toAllAttendees: function() {
    if (!scanAble) return;
    wx.navigateTo({
      url: '../allAttendees/allAttendees'
    })
  },

  printable: function(available) {
    scanAble = available
    this.setData({
      scanAble: available
    })
    if (available) {
      this.setData({
        scanQrHint: '点击扫码开始打印',
      })
    } else {
      this.setData({
        scanQrHint: '请先选择打印机',
      })
    }
    
  },

  // =================自定义dialog==================
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  itemClick: function(e) {
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