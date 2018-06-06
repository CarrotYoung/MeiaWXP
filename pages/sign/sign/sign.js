// pages/sign/sign/sign.js
var roomName = "工作坊"
var signStatus = "签到中..."
var roomNum = "A6"
var activityTitle = "行为设计下半场行为设计下半场行为设计下半"
var scanQrHint = '点击扫码开始签到'
var scanQrTxt = '扫码'
var scheduleId = 0  //日程id
var listArr = new Array()


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
    scanQrIc: getApp().globalData.scanQr,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var dataDic = JSON.parse(options.dataDic);
    scheduleId = dataDic.id; //日程id
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

  },

  //拉取签到数据
  getSignListData: function () {
    var that = this
    var userid = wx.getStorageSync('userid')
    var url = getApp().url.scheduleAttendList + '?scheduleId=' + scheduleId + '&userId=' + userid;
    function success(result) {  //回调成功
    var dataBaseDic = result.data.scheduleBaseVO
    listArr = result.data.actAttendeeVOList;  //签到列表
    console.log("网络数据请求");
    console.log(listArr);

    var unsignNum = dataBaseDic.buyNum - dataBaseDic.signCount;

    that.setData({
      allNum: dataBaseDic.buyNum,
      signNum: dataBaseDic.signCount,
      unsignNum: unsignNum
     });
// =======
//   getSignListData: function (id, attendeeName) {

//     var userid = wx.getStorageSync('userid')
//     var url = getApp().url.scheduleAttendList + '?scheduleId=' + id + '&userId=' + userid;
//     function success(result) {
//      var dataArr =  result.data

//      console.log("网络数据请求");
//      console.log(dataArr)

// >>>>>>> b96203a56f751a56d41630d6cec097843845f7b1
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

    //获取网络数据
    this.getSignListData();

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
      success: function (res) { //扫描校验成功了
      console.log(res)
      var attendeeId = 532
      var qrScheduleId  = 2  //扫码得到日程id
      var signCount = 5;    //签到次数
      var signStatus = 0;   //本地验证签到失败或成功 0失败 1成功
      var positionTitle = '';
      var name = ''
      
      var tempArr = listArr.filter((item) => { return item.id == attendeeId});  //检索出存在的用户
      var tempDic = tempArr[0];
      console.log('扫描校验成功了')
      console.log(tempDic)
      console.log(scheduleId)
      console.log(tempDic.name)

      if ((qrScheduleId == scheduleId) && tempDic){  //验证该用户已报名
        signCount = tempDic.signCount + 1+1;
        signStatus = 1;
        positionTitle = tempDic.company + tempDic.position;

      }else{ //没有报名

        signStatus = 0;
        positionTitle = '未报名该场次';

      }

       var dataDic = {
        'scheduleId': qrScheduleId,  //扫码得到
        'attendeeId': attendeeId,
        'signCount': signCount,
        'listArr':listArr,
        'signStatus': signStatus,
        'name': tempDic.name, //
        'positionTitle': positionTitle   //positionTitle
       };

       console.log('扫码传参=')
        wx.navigateTo({
          url: '../../../pages/sign/signResult/signResult' + "?dataDic=" + JSON.stringify(dataDic)
        })
      },
      fail: function (res) { },
      complete: function (res) { 

      //   var dataDic = {
      //   'scheduleId':20,  //扫码得到
      //   'attendeeId':514,
      //   'signCount':22,
      //   'listArr':listArr
      //  };

      //   wx.navigateTo({
      //     url: '../../../pages/sign/signResult/signResult' + "?dataDic=" + JSON.stringify(dataDic)
      //   })
      //   console.log('扫码完成了--')
      //   console.log(res.result)
      },
    })
  }
})