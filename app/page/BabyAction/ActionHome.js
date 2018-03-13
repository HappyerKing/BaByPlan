/**
 *  行为记录首页
 */

import React, { Component } from "react";
import { View, Text,StyleSheet } from "react-native";
import {TopBar} from "../../components";
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ActionHome extends Component {
   locale ={name:'zh-cn',config: {
    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
    weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY/MM/DD',
        LL : 'YYYY年M月D日',
        LLL : 'YYYY年M月D日Ah点mm分',
        LLLL : 'YYYY年M月D日ddddAh点mm分',
        l : 'YYYY/M/D',
        ll : 'YYYY年M月D日',
        lll : 'YYYY年M月D日 HH:mm',
        llll : 'YYYY年M月D日dddd HH:mm'
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === '凌晨' || meridiem === '早上' ||
                meridiem === '上午') {
            return hour;
        } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
        } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        var hm = hour * 100 + minute;
        if (hm < 600) {
            return '凌晨';
        } else if (hm < 900) {
            return '早上';
        } else if (hm < 1130) {
            return '上午';
        } else if (hm < 1230) {
            return '中午';
        } else if (hm < 1800) {
            return '下午';
        } else {
            return '晚上';
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
    ordinal : function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '日';
            case 'M':
                return number + '月';
            case 'w':
            case 'W':
                return number + '周';
            default:
                return number;
        }
    },
    relativeTime : {
        future : '%s内',
        past : '%s前',
        s : '几秒',
        ss : '%d 秒',
        m : '1 分钟',
        mm : '%d 分钟',
        h : '1 小时',
        hh : '%d 小时',
        d : '1 天',
        dd : '%d 天',
        M : '1 个月',
        MM : '%d 个月',
        y : '1 年',
        yy : '%d 年'
    },
    week : {
        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
}}
  
  render() {
    let datesWhitelist = [{
      start: moment(),
      end: moment().add(3, 'days')  // total 4 days enabled
    }];
    let datesBlacklist = [ moment().add(1, 'days') ]; // 1 day disabled
    return (
      <View>
        <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
            style={{height: 100, paddingTop: 20, paddingBottom: 10}}
            calendarHeaderStyle={{color: 'white'}}
            calendarColor={'#7743CE'}
            dateNumberStyle={{color: 'white'}}
            dateNameStyle={{color: 'white'}}
            highlightDateNumberStyle={{color: 'yellow'}}
            highlightDateNameStyle={{color: 'yellow'}}
            disabledDateNameStyle={{color: 'grey'}}
            disabledDateNumberStyle={{color: 'grey'}}
            // datesWhitelist={datesWhitelist}
            // datesBlacklist={datesBlacklist}
            iconLeft={require('../../resource/images/left-arrow.png')}
            iconRight={require('../../resource/images/right-arrow.png')}
            iconContainer={{flex: 0.1}}
            onDateSelected ={(data)=>{console.log(data)}}
            locale={this.locale}
                />
             <View style={styles.row}>
              <View style={styles.timeline}>
                <View style={styles.timelineVerticalLink} />
                <Icon
                  style={styles.icon}
                  name={"circle"}
                  size={6}
                />
              </View>
              <View style={styles.content}>
                <Text style={styles.text}>{'按时吃饭'}</Text>
                <Text style={styles.time}>{'8:00'}</Text>
              </View>
            </View>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#313842',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 70,
  },
  timeline: {
    height: 70,
    width: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineVerticalLink: {
    height: 70,
    width: 1,
    backgroundColor: '#526373',
    justifyContent: 'center'
  },
  icon: {
    color: '#e7d629',
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
  time: {
    fontSize: 10,
    fontWeight: '400',
    color: '#828B7B',
  }
});
