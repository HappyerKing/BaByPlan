import realm from '../data/realm';
var uuid = require("react-native-uuid");
const realmObject = realm.current();
// 连接组件 
export default class RealmManager {
  //==================== 日记 ====================//
  // 增日记
  static saveDiary(diaryData) {
    realmObject.write(() => {
        realmObject.create('Diary', {
          id: uuid.v1(), 
          name: diaryData.name, 
          weather: diaryData.weather,
          photos: diaryData.photos,
          content: diaryData.content,
          year: diaryData.year,
          month: diaryData.month,
          day: diaryData.day,
        });
      })
  }
  // 查日记
  static loadDiary(filtered) {
    if (realmObject != undefined) {
      let persons = realmObject.objects('Diary');
      if (filtered != null) {
        let person = persons.filtered(filtered);
        return person;
      }
      return persons;
    } else {
      return [];
    }
  }
  // 改日记
  static replaceDiary(diaryData) {
    realmObject.write(() => {
        realmObject.create('Diary', {
        id: diaryData.id, 
        name: diaryData.name, 
        content: diaryData.content,
        year: diaryData.year,
        month: diaryData.month,
        day: diaryData.day,
        weather: diaryData.weather,
        photos: diaryData.photos,
      }, true);
    })
  }
  // 删日记
  static removeDiary(filtered) {
    realmObject.write(() => {
      // 获取Person对象
      let persons = realmObject.objects('Diary');
      if (filtered != null) {
        persons = persons.filtered(filtered);
      }
      // 删除
      realmObject.delete(persons);
    })
  }

  // 查成长
  static loadGrowth(filtered) {
    if (realmObject != undefined) {
      let persons = realmObject.objects('Growth');
      if (filtered != null) {
        let person = persons.filtered(filtered);
        return person;
      }
      return persons;
    } else {
      return [];
    }
  }

};