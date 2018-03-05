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
  
  };