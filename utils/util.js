module.exports = {
  sendRequest: sendRequest,
  formatDate: formatDate,
  parseDate: parseDate,
  compareTime: compareTime
}

// function sendRequest(url, success, complete, obj, method,fail) {
//   var methodType = method || 'POST'
//   console.log('请求方法=' + methodType)
function sendRequest(url, suc, obj, method, fail) {
  
  wx.showLoading({
    title: '加载中..',
  })
  // 自动给url加上域名前缀
  // if (url && url.indexOf('https://meia.me/')) {
  //   console.log(url)
  // }

  if ((url && url.indexOf('token') <1) || (obj && !obj.token)) {
    if (!obj) obj = {}
    obj.token = wx.getStorageSync('token')
    obj.userId = wx.getStorageSync('userid')
  }

  method = method || 'GET'

  console.log('请求url--'+url)
  console.log(obj)

  wx.request({
    url: url,
    method: method,
    data: obj,
    header: {// 设置请求的 header
      'content-type': 'application/json'
      // 'weiapp': 'IXDC'
    },
    success: function (res) {
      wx.hideLoading()

      console.log('请求成功' + url + '\n' + JSON.stringify(res));
      var data = res.data
      if (res.data.code == 0) {
        suc(data)

      } else if (res.data.code == 2) {
        // console.log("登录失效, 请重新登录")
        // wx.setStorageSync('token', '')
        // wx.setStorageSync('userid', '')
        // wx.redirectTo({
        //   url: '../../login/login',
        // })
      } else {
        wx.showToast({
          title: res.data.msg
        })
      }
    },
    fail: function () {
      wx.hideLoading()
      console.log('请求失败' + url)
      fail()  //网络请求失败
    },
    complete: function () {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log('请求结束' + url)
    }
  })
}

function formatDate(date, format) {
  var v = "";
  if (typeof date == "string" || typeof date != "object") {
    return;
  }
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var weekDay = date.getDay();
  var ms = date.getMilliseconds();
  var weekDayString = "";

  if (weekDay == 1) {
    weekDayString = "星期一";
  } else if (weekDay == 2) {
    weekDayString = "星期二";
  } else if (weekDay == 3) {
    weekDayString = "星期三";
  } else if (weekDay == 4) {
    weekDayString = "星期四";
  } else if (weekDay == 5) {
    weekDayString = "星期五";
  } else if (weekDay == 6) {
    weekDayString = "星期六";
  } else if (weekDay == 7) {
    weekDayString = "星期日";
  }

  v = format;
  //Year 
  v = v.replace(/yyyy/g, year);
  v = v.replace(/YYYY/g, year);
  v = v.replace(/yy/g, (year + "").substring(2, 4));
  v = v.replace(/YY/g, (year + "").substring(2, 4));

  //Month 
  var monthStr = ("0" + month);
  v = v.replace(/MM/g, monthStr.substring(monthStr.length - 2));

  //Day 
  var dayStr = ("0" + day);
  v = v.replace(/dd/g, dayStr.substring(dayStr.length - 2));

  //hour 
  var hourStr = ("0" + hour);
  v = v.replace(/HH/g, hourStr.substring(hourStr.length - 2));
  v = v.replace(/hh/g, hourStr.substring(hourStr.length - 2));

  //minute 
  var minuteStr = ("0" + minute);
  v = v.replace(/mm/g, minuteStr.substring(minuteStr.length - 2));

  //Millisecond 
  v = v.replace(/sss/g, ms);
  v = v.replace(/SSS/g, ms);

  //second 
  var secondStr = ("0" + second);
  v = v.replace(/ss/g, secondStr.substring(secondStr.length - 2));
  v = v.replace(/SS/g, secondStr.substring(secondStr.length - 2));

  //weekDay 
  v = v.replace(/E/g, weekDayString);
  return v;
}

function parseDate(str, format) {
  var type, convert, year = 1970, month = 1, day = 1, hour = 0, minute = 0, second = 0, milli = 0, date;
  convert = {
    'y': function () {
      format = format.replace(/y+/, function (match) {
        var length;
        length = match.length;
        year = str.substring(0, length);
        str = str.replace(year, '');
        year = Number(year);
        return '';
      });
      return year;
    },
    'M': function () {
      month = undefined;
      format = format.replace(/M+/, function (match) {
        var length, single, tens, monthName;
        length = match.length;
        monthName = 'JAN1FEB2MAR3APR4MAY5JUN6JUL7AUG8SEP9OCT10NOV11DEC12一1二2三3四4五5六6七7八8九9十10十一11十二12';
        if (length < 3) {
          str = str.replace(/^\d{1,2}/, function (num) {
            month = Number(num);
            return '';
          });
        } else if (length < 6) {
          var name, reg;
          name = str.match(/\D+/)[0];
          reg = new RegExp(name.substring(0, 3).replace('月', '').toUpperCase() + '(\\d+)');
          month = Number(monthName.match(reg)[1]);
          str = str.replace(name, '');
        } else {
          var match;
          match = str.match(/(\d+)月/);
          month = Number(match[1]);
          str = str.replace(match[0], '');
        }
        return '';
      });
      return month;
    },
    'd': function () {
      day = undefined;
      format = format.replace(/d+/, function () {
        str = str.replace(/^\d{1,2}/, function (match) {
          day = Number(match);
          return '';
        });
        return '';
      });
      return day;
    },
    'h': function () {
      var apm;
      hour = undefined;
      format = format.replace(/h+/, function () {
        str = str.replace(/^\d{1,2}/, function (match) {
          hour = Number(match);
          return '';
        });
        return '';
      });
      apm = str.match(/AM|PM/i)[0];
      if (apm && apm.toUpperCase() === 'PM') {
        hour += 12;
      }
      str = str.replace(/AM|PM/ig, '');
      return hour;
    },
    'H': function () {
      hour = undefined;
      format = format.replace(/H+/, function () {
        str = str.replace(/^\d{1,2}/, function (match) {
          hour = Number(match);
          return '';
        });
        return '';
      });
      return hour;
    },
    'm': function () {
      minute = undefined;
      format = format.replace(/m+/, function () {
        str = str.replace(/^\d{1,2}/, function (match) {
          minute = Number(match);
          return '';
        });
        return '';
      });
      return minute;
    },
    's': function () {
      second = undefined;
      format = format.replace(/s+/, function () {
        str = str.replace(/^\d{1,2}/, function (match) {
          second = Number(match);
          return '';
        });
        return '';
      });
      return second;
    },
    'S': function () {
      milli = undefined;
      format = format.replace(/S+/, function () {
        str = str.replace(/^\d{1,2}/, function (match) {
          milli = Number(match);
          return '';
        });
        return '';
      });
      return milli;
    }
  };
  format = format.replace(/^[^a-zA-Z]+/, '');
  str = str.replace(/^[^a-zA-Z0-9一二三四五六七八九十]+/, '');
  while (type = format.charAt(0)) {
    if (convert[type] && convert[type]() !== undefined) {
      format = format.replace(/^[^a-zA-Z]+/, '');
      str = str.replace(/^[^a-zA-Z0-9一二三四五六七八九十]+/, '');
    } else {
      date = new Date('Invalid Date');
      break;
    }
  }
  date || (date = new Date(year, month - 1, day, hour, minute, second, milli));
  return date;
}
function compareTime(startDate, endDate) {  //前者小于后者 返回true
  if (startDate.length > 0 && endDate.length > 0) {
    var startDateTemp = startDate.split(" ");
    var endDateTemp = endDate.split(" ");

    var arrStartDate = startDateTemp[0].split("-");
    var arrEndDate = endDateTemp[0].split("-");

    var arrStartTime = startDateTemp[1].split(":");
    var arrEndTime = endDateTemp[1].split(":");

    var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);
    var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);

    if (allStartDate.getTime() >= allEndDate.getTime()) {
      // alert("startTime不能大于endTime，不能通过");
      return false;
    } else {
      // alert("startTime小于endTime，所以通过了");
      return true;
    }
  } else {
    // alert("时间不能为空");
    return false;
  }
}  

