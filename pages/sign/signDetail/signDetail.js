// pages/sign/signDetail/signDetail.js

var listArr = new Array
var id = 0
var lastTap =  "allNum"

Page({

  /**
   * 页面的初始数据
   */
  data: {
   allNum:"100"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var dataDic = JSON.parse(options.dataDic);
    var id = dataDic.id;   //日程id
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
      allNum: dataDic.buyNum,
      signNum: dataDic.signCount,
      unsignNum: unsignNum
    });

    this.getSignListData(id)
  
  },

  //拉取签到数据
  getSignListData: function (id,attendName) {

    var that = this
    var url = getApp().url.scheduleAttendList + '?scheduleId=' + id;
    if(attendName){
      url += '&attendeeName=' + attendName;
    }

    function success(result) {

      var dataArr = result.data.actAttendeeVOList;
      console.log("网络数据请求="+url);
      console.log(dataArr)
      var j = 0
      for (j = 0; j < dataArr.length; j++) {
        var dataDic = dataArr[j];
        var status = dataArr.status;
        var color = 'red';
        var dateText = dataDic.chooseTime; //已经签到
        var  indexTop = 200*j+30;
        if(status == 1) //已经签到
        {
          color = 'gray';

        }else{ //未签到
          dateText = '未签到';
        }

        var dic = { "name": dataDic.name, "title": dataDic.company + dataDic.position, "date": dateText, 'dateColor': color, 'indexTop': indexTop};
        
        listArr.push(dic)
      }

      // console.log('indexTop=' + listArr)
      that.setData({
        list: listArr
      })

      
    }

    function fail() {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
      })
    }

    getApp().util.sendRequest(url, success, "", "", 'GET')


  },

  searchValueInput: function (e) {
    var name = e.detail.value;
    console.log('搜索值');
    console.log(name);
    this.getSignListData(id, name)
  },

  selectTap:function(e){
    var left = 0
    
    if(e.target.id == 'allNum'){
        left = 0.1;

    }else if (e.target.id == 'signNum'){

      left = 0.45;

    } else if (e.target.id == 'unsignNum'){
      left = 0.75;

    }
    console.log('left='+left)

    if (lastTap != e.target.id){
      lastTap = e.target.id;
      this.setData({
        btmLineLeft: left * 100
        
      })


    }

    
    


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