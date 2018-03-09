// 连接组件 
export default class DateManager {

    // 获取年份
    static getYearList() {
      let arr = [];
      let currentYear = DateManager.getYear();
      for (let i=currentYear-5; i<currentYear + 3; i++) {
        arr.push(i);
      }
      return arr;
    }
  
    /** 获取某年某月第一天是周几 */
    static getWeek(year, month) {
      var d = new Date();
      d.setYear(year);
      d.setMonth(month-1);
      d.setDate(1);
      // 获得周几
      // var weeks = ['周天','周1','周2','周3','周4','周5','周6'];
      var weeks = [0, 1, 2, 3, 4, 5, 6];
      return weeks[d.getDay()];
    }
    /** 获取某年某月有多少天 */
    static getDaysInOneMonth(year, month){  
      month = parseInt(month, 10);  
      var d= new Date(year, month, 0);  
      return d.getDate();  
    }  
  
  
    /** 获取年 */
    static getYear() {
      var date = new Date();
      return date.getFullYear();
    }
    /** 获取月份英文缩写 */
    static getMonthEn(month) {
      let months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
      return months[month]
    }
    /** 获取月份英文全拼 */
    static getMonthEnglish(month) {
      if (month == null) {
        month = DateManager.getMonth()-1
      }
      let months = ["JANUARY","FEBRUARY","MARCCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
      return months[month]
    }
    /** 获取月 */
    static getMonth() {
        var date = new Date();
        return date.getMonth() + 1;
    }
    /** 获取日 */
    static getDay() {
        var date = new Date();
        return date.getDate();
    }
    /** 获取星期几 */
    static getWeekday(y, m, d) {
      if (y == null) {
        y = DateManager.getYear();
        m = DateManager.getMonth();
        d = DateManager.getDay();
      }
  
      var l1 = ["日","一","二","三","四","五","六"];
      var l2 = ["SUN","MON","TUE","WED","THUR","FRI","SAT"];
      var d = new Date(y, m, d).getDay();
      return [l1[d],l2[d]];
    }
  
  
    /** 获取天气字符串 */
    static getDateStr(year, month, day) {
      let week = DateManager.getWeekday(year, month, day)[1];
      let month1 = DateManager.getMonthEnglish(month);
      return week + '. ' + month1 + " " + day + "/" + year;
    }

    // 返回描述信息
    static getRemarkWithDate(date, date_enum) {
        if (date_enum == DATE_ENUM.YEAR) {
            let currentYear = DateManager.getYear();
            if (currentYear == date.year) {
                return "今年"
            } else if (currentYear - 1 == date.year) {
                return "去年";
            } else {
                return date.year + "年"
            }
        } else if (date_enum == DATE_ENUM.MONTH) {
            let currentYear = DateManager.getYear();
            let currentMonth = DateManager.getMonth();
            if (currentYear == date.year && currentMonth == date.month) {
                return "本月"
            } else if (currentYear == date.year && currentMonth - 1 == date.month) {
                return "上月";
            } else {
                if (currentYear != date.year) {
                    return date.year + "年" + date.month + "月"
                } else {
                    return date.month + "月"
                }
            }
        } else if (date_enum == DATE_ENUM.WEEK) {
            let currentYear = DateManager.getYear();
            let currentWeek = DateManager.getWeek();
            if (currentYear == date.year && currentWeek == date.week) {
                return "本周";
            } else if (currentYear == date.year && currentWeek - 1 == date.week) {
                return "上周";
            } else {
                if (currentYear != date.year) {
                    return date.year + "-" + date.week + "周"
                } else {
                    return date.week + "周"
                }
            }
        } else if (date_enum == DATE_ENUM.DAY) {
            let currentYear = parseInt(DateManager.getYear());
            let currentMonth = parseInt(DateManager.getMonth());
            let currentDay = parseInt(DateManager.getDay());
            date.year = parseInt(date.year);
            date.month = parseInt(date.month);
            date.day = parseInt(date.day);
            console.log(currentYear);
            console.log(currentMonth);
            console.log(currentDay);
            console.log(date);
            if (date.year == currentYear && date.month == currentMonth && date.day == currentDay) {
                return '今天';
            } else if (date.year == currentYear && date.month == currentMonth && date.day == (currentDay - 1)) {
                return '昨天';
            } else {
                return date.year + '/' + date.month + '/' + date.day;
            }
        }
    }

    static getDaysWithMonthAndYear() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var d = new Date(year, month, 0);
        return d.getDate();
    }
  
  };

  // 时间
export const DATE_ENUM = {
    YEAR: 0,   // 年
    MONTH: 1,  // 月
    WEEK: 2,   // 周
    DAY: 3,    // 日
};