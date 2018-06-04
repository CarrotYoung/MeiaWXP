// pages/sign/signResult.js
var signTitle = ""
var dataDic = {};
var listArr = new Array();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // statusText:"",
    // signImg: getApp().globalData.resultSuccess,
    // name:"李志军",
    // title:"腾讯用户研究与体验设计部设计师"
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dataDic = JSON.parse(options.dataDic);
    listArr = dataDic.listArr
    console.log('签到又来了')
    console.log(dataDic)
    this.setSignStatus();  //设置签到状态
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

//先通过本地验证设置签到状态
  setSignStatus: function() {
    var that = this
    var name = dataDic.name;
    console.log('签到结果名字=='+name)
    var positionTitle = dataDic.positionTitle;
    var statusText = ''  //签到状态
    var signImg = ''     //签到状态图片
    // dic.status = 2
    // dic.signCount = 1
    var signColor = ''
    if (dataDic.signStatus == 1) { //签到成功

      if (dataDic.signCount == 1) {
        statusText = '签到成功'
        // signColor = '0x45BC00'
        signImg = getApp().globalData.resultSuccess

      } else {
        statusText = '签到' + (dataDic.signCount + 1) + '次'
        signColor = 'rgb(255,191,0)'  //FFBF00
        signImg = getApp().globalData.resultWarning

      }

      this.uploadAttendUserInfo(); //上传签到状态到服务器


    } else {

      statusText = '签到失败'
      signColor = 'rgb(254,0,0)'   //'0xFE0000'
      signImg = getApp().globalData.resultFail
      name = ''
      positionTitle = '未报名该场次'

    }

    that.setData({
      statusText: statusText,
      signImg: signImg,
      name: name,
      title: positionTitle,
      signColor: signColor

    });

    //设置导航栏
    wx.setNavigationBarTitle({
      title: statusText
    })






  },

  //上传用户数据验证是否合法
  uploadAttendUserInfo: function(){
    var that = this
    var userid = wx.getStorageSync('userid')
    var url = getApp().url.signCheck + '?scheduleId=' + dataDic.scheduleId + '&userId=' + userid + '&attendeeId=' + dataDic.attendeeId + '&signCount=' + dataDic.signCount; //dataDic.signCount
    function success(result) {

      var dic = result.data;
      // console.log('签到结果=');
      // console.log(dic);

      // var name = dic.actAttendee.name;
      // var positionTitle = dic.actAttendee.company + dic.actAttendee.position;
      // var  statusText = ''  //签到状态
      // var  signImg = ''     //签到状态图片
      // // dic.status = 2
      // // dic.signCount = 1
      // var signColor = ''
      if (dic.status == 1) { //签到成功

        wx.hideLoading()
        wx.showToast({
          title: '提交成功',
        })
      
        if (dic.signCount == 1)
        {
          // statusText = '签到成功'
          // signColor = '0x45BC00'
          signImg = getApp().globalData.resultSuccess

        }else
        {
          // statusText = '签到' + (dataDic.signCount + 1)+'次'
          // signColor = 'rgb(255,191,0)'  //FFBF00
          
          // signImg = getApp().globalData.resultWarning
        }
        
      } else{

        // statusText = '签到失败'
        // signColor = 'rgb(254,0,0)'   //'0xFE0000'
        // signImg = getApp().globalData.resultFail
        // name = ''
        // positionTitle = '未报名该场次'

      }

      // that.setData({
      //   statusText: statusText,
      //   signImg: signImg,
      //   name: name,
      //   title: positionTitle,
      //   signColor: signColor
        
      // });

      // signTitle = '签到' + statusText

      // //设置导航栏
      // wx.setNavigationBarTitle({
      //   title:  statusText
      // })

     
    }

    function fail() {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
      })

    }

    getApp().util.sendRequest(url, success, "", "", 'POST')

  },


  //继续签到
  scanQr: function () {

    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function (res) { //扫描校验成功了
        console.log(res)
        var attendeeId = 532
        var qrScheduleId = 2  //扫码得到日程id
        var signCount = 5;    //签到次数
        var signStatus = 0;   //本地验证签到失败或成功 0失败 1成功
        var positionTitle = '';
        var name = ''

        var tempArr = listArr.filter((item) => { return item.id == attendeeId });  //检索出存在的用户
        var tempDic = tempArr[0];
        console.log('扫描校验成功了')
        console.log(tempDic)
        console.log(dataDic.scheduleId)
        console.log(tempDic.name)

        if ((qrScheduleId == dataDic.scheduleId) && tempDic) {  //验证该用户已报名
          signCount = tempDic.signCount + 1 + 1;
          signStatus = 1;
          positionTitle = tempDic.company + tempDic.position;

        } else { //没有报名

          signStatus = 0;
          positionTitle = '未报名该场次';

        }

        var dic = {
          'scheduleId': qrScheduleId,  //扫码得到
          'attendeeId': attendeeId,
          'signCount': signCount,
          'listArr': listArr,
          'signStatus': signStatus,
          'name': tempDic.name, //
          'positionTitle': positionTitle   //positionTitle
        };

        console.log('扫码传参=')
        wx.redirectTo({
          url: '../../../pages/sign/signResult/signResult' + "?dataDic=" + JSON.stringify(dic)
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