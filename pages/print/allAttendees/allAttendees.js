var attendeeList, btmLineLeft
var requestParams = {}
var page = 1,size = 50
var total, currPrintType = 0 //筛选状态：1-已打印 2-未打印
var searchName = ''

Page({
  data: {
    currPrintType : 0,
    searchName: ''
  },

  onLoad: function (options) {
    //清理状态
    attendeeList = []
    searchName = ''
    currPrintType = 0 
    page = 1
    this.setData({
      currPrintType: 0,
      searchName: searchName
    })

    this.getAllAttendees()
  },

  getAllAttendees: function(printed) {
    var printed = printed || 0 //默认0，全部
    var that = this
    var url = getApp().url.listAttendees
    requestParams.page = page
    requestParams.activityId = 1
    requestParams.size = size 
    requestParams.name = searchName
    requestParams.isPrint = printed
    function success(result) {
      total = result.total
      if (!attendeeList) { //初始化
        attendeeList = result.actPrintVOList
        that.setData({
          attendeeList: attendeeList
        })
      } else { //拼接内容
        attendeeList = attendeeList.concat(result.actPrintVOList)
        that.setData({
          attendeeList: attendeeList
        })
      }

      console.log(attendeeList)
    
      
    }

    getApp().util.sendRequest(url, success, requestParams)
  },

  itemClick: function(e) {
    console.log(e)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../toPrint/toPrint?id=' + id,
    })
  },

  selectTap: function(e) {
    var printed = 0
    var printStatus = e.currentTarget.id
    if (printStatus == 'print-done') printed = 1
    if (printStatus == 'print-todo') printed = 2
    if (currPrintType == printed) return;
    currPrintType = printed
    this.setData({
      btmLineLeft: printed*33 + 10.4,
      currPrintType:printed
    })

    page = 1
    attendeeList = []
    this.getAllAttendees(printed)
  },

  searchValueInput: function (e) {
    searchName = e.detail.value.trim()
    // if (!e.detail.value.trim()) return;
    // if (e.detail.value.trim() == this.searchName) return;
    console.log(searchName)
    attendeeList = []
    this.getAllAttendees(currPrintType)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('reach top ' + page)
    wx.stopPullDownRefresh(); 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('reach bottom '+ page)
    if (page*size<total) { //有下页
      page++
      this.getAllAttendees(currPrintType)
    }
  },


})