var scheduleTxt = '全部日程'
let selectList = [
  '全部日程', '未开始', '进行中', '已结束'
]
var index = 0
var show = false
var listArr = new Array
var searchText = ''
var tempArr = new Array();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    headerBtnShow: true,
    arrowImg: getApp().icon.arrowDown,
    selectList: selectList,
    index: 0,
    rightArrowImg: getApp().icon.rightArrow,
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
      arrowImg: show ? getApp().icon.arrowDown : getApp().icon.arrowUp
    });
  },

  rowTap: function(tap){

    // console.log("打印");
    var index = tap.currentTarget.dataset.index;//获取点击的下拉列表的下标
    var id = tempArr[index].id;
    var room = tempArr[index].room;
    console.log("输入id="+id);
    console.log("输入room=" + room);
    var dataDic = tempArr[index];
    var signStatus = dataDic.signStatus;
    // signStatus = '已结束'

    console.log('传输字典')
    console.log(dataDic)
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
    this.getScheduleList();
  },

   

  //签到日程列表
  getScheduleList: function (session){
    var that = this
    var userid = wx.getStorageSync('userid')

    var url = getApp().url.signScheduleList + '?activityId=' + 1 + '&userId=' + userid
    console.log(url)
    console.log('session='+session)
    if(session){
      url += '&session='+session
      console.log('url进来了='+url)
    }
    listArr.splice(0, listArr.length);//清空数组 
    function success(result) {
    //  console.log('打印结果='+result.data)
    //  console.log('打印结果')
    //  console.log(result.data.scheduleBaseVOList)
     var dataArr = result.data.scheduleBaseVOList;
    //  console.log(dataArr)
     
     //本地时间
     var localTimestamp = (new Date()).getTime();

     console.log("当前时间==" + localTimestamp);
    //  localTimestamp = 0

    //  var listArr = new Array()
     var j = 0
     var tempEndArr = new Array
    for (j = 0; j < dataArr.length; j++) {
     var dataDic = dataArr[j];
     //开始时间
     var startTimestamp = (new Date(dataDic.startTime)).getTime();

     //结束时间
     var endTimestamp = (new Date(dataDic.endTime)).getTime();
     var status = dataDic.status;
     var signStatus = '';
     var statusColor = 'red';
     if (status == 1){  //未开始
        signStatus ='未开始';
        var statusColor = 'rgb(69,188,0)';
     } else if (status == 2)     {
       signStatus = '进行中';
       statusColor = 'rgb(0,122,255)'

     } else if (status == 3){
       signStatus = '已结束';
       statusColor = 'rgb(153,153,153)'
       
     }else
     {
       signStatus = '未知';
       statusColor = 'rgb(153,153,153)'


     }

     var roomType = '';
     if (dataDic.type == "workshop"){
       roomType = '工作坊';
     } else if (dataDic.type == "summit"){
       roomType = '峰会';
     } else if (dataDic.type == "speech"){
       roomType = '大会';
     } else if (dataDic.type == "trip"){
       roomType = '设计之旅';
     }else{
       roomType = '圆桌';
     }

    //  signStatus = '未开始';
    //  var statusColor = 'rgb(69,188,0)';

     var dic = { "room": dataDic.session, "signStatus": signStatus, "title": dataDic.theme, "roomType": roomType, "id": dataDic.id, "buyNum": dataDic.buyNum, "signCount": dataDic.signCount, "statusColor": statusColor, "tapId":'allNum'};

     if (signStatus == '已结束'){
         tempEndArr.push(dic)
     }else{

       listArr.push(dic)
     }

    }

     listArr = listArr.concat(tempEndArr)
    //  console.log("输出列表")
    //  console.log(listArr)
     tempArr = listArr
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

    getApp().util.sendRequest(url, success, "","",'GET',fail)

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
    this.getScheduleList(session);

    this.setData({
      searchText: session
    })
  },

  //输入聚焦
  inputFocus: function(){
    var that = this;
    this.hiddenOptionTap()
    this.setData({
      headerBtnShow: false
      
    })

  },

  wxSearchClear: function(){

    this.setData({
      searchText: ''
    })

    this.getScheduleList();

  },

  wxSearchCancel: function(){

    var that = this;
    this.setData({
      headerBtnShow: true,
      searchText: ''
    })

        this.getScheduleList();

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