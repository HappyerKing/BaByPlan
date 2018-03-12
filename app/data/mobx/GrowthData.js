import ListData from "./ListData";
import { RealmManager } from "../../common";
import {DateManager,COMPARE_ENUM,DATE_ENUM} from '../../common'

export default class GrowthData extends ListData {
  async fetchData() {
    let growths = RealmManager.loadGrowth();
    let newData = GrowthUtil.arrangeHomeMonthData(growths);
    newData.param = GrowthUtil.arrangeHomeDayData(newData.param);
    console.log(newData);
    this.data = newData;
    this.isRefreshing = false;
  }
}

class GrowthUtil {
    static arrangeHomeMonthData(data) {
        let param = {};
        if (data && data.length != 0) {
            var max = data[0];
            var min = data[0];
            for (let i=0; i<data.length; i++) {
                // 获取最小值, 最大值
                max = DateManager.compareTo(max, data[i], COMPARE_ENUM.MORE);
                min = DateManager.compareTo(min, data[i], COMPARE_ENUM.LESS);
                // 获取单笔记账
                let account = data[i];
                let key = account.year+"年"+account.month+"月";
                key = DateManager.getRemarkWithDate(account, DATE_ENUM.MONTH);
                var keys = Object.keys(param);
                var subdata = {data: [], inmax: 0, exMax: 0};
                if (keys.length > 0 && DateManager.contains(keys, key)) {
                    subdata = param[key];
                }
                // 计算数据
                subdata.data.push(account);
                // if (account.inEx == 0) {
                //     subdata.inmax = subdata.inmax + account.money;
                // } else {
                //     subdata.exMax = subdata.exMax + account.money;
                // }
                param[key] = subdata;
            }
            var range = DateManager.getDateRange(min, max, DATE_ENUM.MONTH);
            return {
                param: param,
                range: range,
            };
        } else {
            return {
                param: {'本月': {data: []}},
                range: [{year: DateManager.getYear(), month: DateManager.getMonth(), remark: "本月"}],
            };
        }
    }
    static arrangeHomeDayData(data) {
        let keys = Object.keys(data);
        var dayData = {};
        // 计算日
        for (let i=0; i<keys.length; i++) {
            let subdata = data[keys[i]].data;
            let newdata = {data: {}, year: 0, month: 0};
            for (let y=0; y<subdata.length; y++) {
                let account = subdata[y];
                let dayKeys = Object.keys(newdata.data);
                let daykey  = account.year + "" + DateManager.getFormatDate(account.month) + "" +  DateManager.getFormatDate(account.day) + "";
                let daydata = {
                    data: [], 
                    remark: DateManager.getFormatDate(account.month) + '月' + 
                            DateManager.getFormatDate(account.day) + '日  星期' +
                            DateManager.getWeekday(account.year, account.month-1, account.day),
                    day: account.day,
                };
                if (DateManager.contains(dayKeys, daykey)) {
                    daydata = newdata.data[daykey];
                }
                daydata.data.push(account);
                // if (account.inEx == 0) {
                //     daydata.inmax += account.money;
                //     newdata.inmax += account.money;
                // } else if (account.inEx == 1) {
                //     daydata.exmax += account.money;
                //     newdata.exmax += account.money;
                // }
                newdata.year = account.year;
                newdata.month = account.month;
                newdata.data[daykey] = daydata;
            }
            dayData[keys[i]] = newdata;
        }
        return dayData;
    }
}
