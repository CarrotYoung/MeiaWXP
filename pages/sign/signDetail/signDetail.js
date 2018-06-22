// pages/sign/signDetail/signDetail.js

var listArr = new Array
var id = 0
var lastTap =  ""
var allDataDic = {}
var signTapId = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
   allNum:"100",
   rightArrowImg: getApp().icon.rightArrow,
   hidden: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    allDataDic = JSON.parse(options.dataDic);

    console.log('得到传输字典')
    console.log(allDataDic)

    id = allDataDic.id;   //日程id
    var room = allDataDic.room;
    console.log("allDataDic================" + JSON.stringify(allDataDic))
    var title = room + '场签到'
    //设置导航栏
    wx.setNavigationBarTitle({
      title: title
    })

    var unsignNum = allDataDic.buyNum - allDataDic.signCount;

    this.setData({
      signStatus: allDataDic.signStatus,
      allNum: allDataDic.buyNum,
      signNum: allDataDic.signCount,
      unsignNum: unsignNum
    });

    this.getSignListData(id)
  
  },

  //拉取签到数据
  getSignListData: function (id,attendName) {

    var that = this
    var userid = wx.getStorageSync('userid')
    var url = getApp().url.scheduleAttendList + '?scheduleId=' + id + '&userId='+userid;
    if(attendName){
      url += '&attendeeName=' + attendName;
    }
    listArr.splice(0, listArr.length);//清空数组 
    function success(result) {

      var dataArr = result.data.actAttendeeVOList;
      console.log("网络数据请求="+url);
      console.log(dataArr)
      var j = 0
      for (j = 0; j < dataArr.length; j++) {
        var dataDic = dataArr[j];
        var status = dataDic.status;
        var color = 'red';
        var dateText = dataDic.chooseTime; //已经签到
        var  indexTop = 200*j+30;
        if(status == 1) //已经签到
        {
          color = 'gray';

        }else{ //未签到
          dateText = '未签到';
        }

        var dic = { "name": dataDic.name, "company": dataDic.company  ,"position": dataDic.position, "date": dateText, 'dateColor': color, 'indexTop': indexTop};
        
        listArr.push(dic)
      }

      // console.log('indexTop=' + listArr)
      that.setData({
        list: listArr
      })

      console.log('tapId=' + allDataDic.tapId)
      console.log(allDataDic)
      that.setTap(allDataDic.tapId)

      
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

    if (name.length == 0){
      this.setData({
        hidden: ''
      })
    }else{
      this.setData({
        hidden: 'hidden'
      })

    }

    console.log('搜索值');
    console.log(name);
    this.getSignListData(id, name)
  },

  //输入聚焦
  inputFocus: function () {
    // this.hiddenOptionTap()
    // this.setData({
    //   hidden: 'hidden'
    // })

  },


  selectTap: function (e){

    this.setTap(e.target.id);

  },

  setTap: function (tapId){

    var left = 0
    //数组筛选
    var tempArr = new Array();
    tempArr = listArr;

    console.log('数组=====了')
    console.log(listArr)
    console.log(tapId)
    var allColor = '#666666';
    var signColor = '#666666';
    var unsignColor = '#666666';
    if (tapId == 'allNum'){
        left = 0.1166;
        allColor = '#45BC00';
       
    } else if (tapId == 'signNum'){

       left = 0.4499;
       signColor = '#45BC00';

    } else if (tapId == 'unsignNum'){
       left = 0.7832;
       unsignColor = '#45BC00';
    }
    console.log('left='+left)

    if (lastTap != tapId){   //不是重复点击

      lastTap = tapId;
      if (tapId != 'allNum') {

        if (tapId == 'signNum'){

          tempArr = listArr.filter((item) => { return item.date != '未签到'});

        }else{

          tempArr = listArr.filter((item) => { return item.date == '未签到' });

        }

      }else{

        tempArr = listArr;

      }
      
      this.setData({
        btmLineLeft: left * 100,
        list: tempArr,
        allColor: allColor,
        signColor: signColor,
        unsignColor: unsignColor
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