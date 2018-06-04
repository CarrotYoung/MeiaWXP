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
    requestParams.activityid = 91
    requestParams.size = 5 
    function success(result) {
      that.setData({
        attendeeList: result.data
      })
    }

    getApp().util.sendRequest(url, success, requestParams)
  },

  itemClick: function(e) {
    var id = this.target.id
    wx.navigateTo({
      url: '../toPrint/toPrint?id=' + id,
    })
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

  }
})