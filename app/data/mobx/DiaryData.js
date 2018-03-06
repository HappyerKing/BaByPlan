import ListData from "./ListData";
import { RealmManager } from "../../common";

export default class DiaryData extends ListData {
  async fetchData() {
    let diarys = RealmManager.loadDiary();
    let arr = {};
    for (let i = 0; i < diarys.length; i++) {
      let diary = diarys[i];
      if (arr[diary.year] == null) {
        arr[diary.year] = {};
      }
      if (arr[diary.year]["array"] == null) {
        arr[diary.year]["array"] = [];
      }
      if (arr[diary.year][diary.month] == null) {
        arr[diary.year][diary.month] = {};
      }
      if (arr[diary.year][diary.month]["array"] == null) {
        arr[diary.year][diary.month]["array"] = [];
      }
      if (arr[diary.year][diary.month][diary.day] == null) {
        arr[diary.year][diary.month][diary.day] = [];
      }
      if (arr[diary.year][diary.month][diary.day]["array"] == null) {
        arr[diary.year][diary.month][diary.day]["array"] = [];
      }
      arr[diary.year]["array"].push(diary);
      arr[diary.year][diary.month]["array"].push(diary);
      arr[diary.year][diary.month][diary.day]["array"].push(diary);
      arr[diary.year][diary.month][diary.day].push(diary);
    }
    this.data = arr;
  }
}
