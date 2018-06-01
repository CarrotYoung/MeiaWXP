// pages/sign/signResult.js
var signTitle = ""
var dataDic = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {

    statusText:"成功",
    signImg: getApp().globalData.resultSuccess,
    name:"李志军",
    title:"腾讯用户研究与体验设计部设计师"
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dataDic = JSON.parse(options.dataDic);
    
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

    this.uploadAttendUserInfo();
  
  },

  //上传用户数据验证是否合法
  uploadAttendUserInfo: function(){
    var that = this
    var userid = wx.getStorageSync('userid')
    var url = getApp().url.signCheck + '?scheduleId=' + dataDic.scheduleId + '&userId=' + userid + '&attendeeId=' + dataDic.attendeeId + '&signCount=' + dataDic.signCount; //dataDic.signCount
    function success(result) {

      var dic = result.data;
      console.log('签到结果=');
      console.log(dic);

      var name = dic.actAttendee.name;
      var positionTitle = dic.actAttendee.company + dic.actAttendee.position;
      var  statusText = ''  //签到状态
      var  signImg = ''     //签到状态图片
      // dic.status = 2
      if (dic.status == 1) { //签到成功
       
        if (dic.signCount == 1)
        {
          statusText = '成功'
          signImg = getApp().globalData.resultSuccess
        }else
        {
          statusText = '多次'
          signImg = getApp().globalData.resultWarning
        }
        
      } else{
        statusText = '失败'
        signImg = getApp().globalData.resultFail

      }


      that.setData({
        statusText: statusText,
        signImg: signImg,
        name: name,
        title: positionTitle,
      });

      signTitle = '签到' + statusText

      //设置导航栏
      wx.setNavigationBarTitle({
        title: '签到' + statusText
      })

     

    }

    function fail() {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
      })
    }

    getApp().util.sendRequest(url, success, "", "", 'POST')


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