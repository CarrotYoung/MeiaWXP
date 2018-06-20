var attendeeList
var requestParams = {}

Page({
  data: {
  },

  onLoad: function (options) {
    this.getAllAttendees()
  },

  getAllAttendees: function(e) {
    var that = this
    var url = getApp().url.listAttendees
    requestParams.page = 1
    requestParams.activityId = 1
    requestParams.size = 20 
    function success(result) {
      that.setData({
        attendeeList: result.actPrintVOList
      })
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


})