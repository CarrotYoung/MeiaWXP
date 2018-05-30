var scheduleTxt = '全部日程'
let selectList = [
  '全部日程', '未开始', '进行中', '已结束'
]
var index = 0
var show = false
var listArr = new Array

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    arrowImg: getApp().globalData.arrowDown,
    selectList: selectList,
    index: 0,
    rightArrowImg:getApp().globalData.rightArrow
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show,
    
    }); 
    this.setArrowImg(!this.data.show);  
    

  },
  // 点击下拉列表
  optionTap(e) {
    let index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    //数组筛选
    var tempArr = new Array();
    tempArr = listArr;
    if (selectList[index] != '全部日程'){
      tempArr = listArr.filter((item) => { return item.signStatus == selectList[index] });
    }
    console.log('赛选数组=') 
    console.log(tempArr)            
    this.setData({
      index: index,
      show: !this.data.show,
      list: tempArr,
    });
    this.setArrowImg(!this.data.show);  
  },

  //箭头
  setArrowImg(show){
    this.setData({
    arrowImg: show ? getApp().globalData.arrowDown : getApp().globalData.arrowUp
    });
  },

  rowTap: function(tap){

    // console.log("打印");
    var index = tap.currentTarget.dataset.index;//获取点击的下拉列表的下标
    var id = listArr[index].id;
    var room = listArr[index].room;
    console.log("输入id="+id);
    console.log("输入room=" + room);
    var dataDic = listArr[index];
    var signStatus = dataDic.signStatus;
    signStatus = '已结束'
    if (signStatus == '已结束'){
      wx.navigateTo({
        url: '../../../pages/sign/signDetail/signDetail' + "?dataDic=" + JSON.stringify(dataDic)
      })
    }else {

      wx.navigateTo({
        url: '/pages/sign/sign/sign' + "?dataDic=" + JSON.stringify(dataDic)
      })

    }
    
    this.hiddenOptionTap()
    console.log(index);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("接受到的参数printTxt=" + options.printTxt);
    console.log("接受到的参数testData=" + options.testData);
    this.getScheduleList()
    
    
  },

  //签到日程列表
  getScheduleList: function (session){
    var that = this
    var url = getApp().url.signScheduleList +'?activityId='+1
    console.log(url)
    console.log('session='+session)
    if(session){
      url += '&session='+session
      console.log('url进来了='+url)
    }

    function success(result) {
    //  console.log('打印结果='+result.data)
    //  console.log('打印结果')
    //  console.log(result.data.scheduleBaseVOList)
     var dataArr = result.data.scheduleBaseVOList;
    //  console.log(dataArr)
     
     //本地时间
     var localTimestamp = (new Date()).getTime();

    //  var listArr = new Array()
     var j = 0
     for (j = 0; j < dataArr.length; j++) {
     var dataDic = dataArr[j];
     //开始时间
     var startTimestamp = (new Date(dataDic.startTime)).getTime();
     //结束时间
     var endTimestamp = (new Date(dataDic.endTime)).getTime();
     var signStatus = '';
     if ( localTimestamp <=startTimestamp){  //未开始
        signStatus ='未开始';
     } else if ((localTimestamp > startTimestamp) && (localTimestamp <endTimestamp))     {
       signStatus = '进行中';
     }else{
       signStatus = '已结束';
     }

     var roomType = '';
     if (dataDic.type == "workshop"){
       roomType = '工作坊';
     } else if (dataDic.type == "summit")
     {
       roomType = '峰会';
     } else if (dataDic.type == "speech")
     {
       roomType = '大会';
     } else if (dataDic.type == "trip"){
       roomType = '设计之旅';
     }else{
       roomType = '圆桌';
     }

     var dic = { "room": dataDic.session, "signStatus": signStatus, "title": dataDic.theme, "roomType": roomType, "id": dataDic.id, "buyNum": dataDic.buyNum, "signCount": dataDic.signCount};
     listArr.push(dic)
     }


    //  console.log("输出列表")
    //  console.log(listArr)
     that.setData({
        list: listArr
     })

      // printerList = result.data
      // if (printerList && printerList.length == 1) {
      //   that.setData({
      //     printerName: printerList[0]
        // })
      // }
    }

    function fail () {
      wx.hideLoading()
      wx.showToast({
        title: '请求失败',
      })}

    getApp().util.sendRequest(url, success, "","",'GET')


  },

  //隐藏下拉列表
  hiddenOptionTap: function()
  {
    this.setData({
      show: false
    })
    this.setArrowImg(true);  
  },

  searchValueInput: function(e)
  {
    var session = e.detail.value; 
    console.log('搜索值');
    console.log(session);
    this.getScheduleList(session)
  },

//输入聚焦
  inputFocus: function(){
    this.hiddenOptionTap()
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