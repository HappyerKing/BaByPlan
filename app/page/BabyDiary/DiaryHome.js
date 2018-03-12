/**
 *  日记首页
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  InteractionManager
} from "react-native";
import { observer } from "mobx-react/native";
import { TopBar, KKInputHUD, HUD, Table,Bottom } from "../../components";
import { DateManager, RealmManager } from "../../common";
import { DiaryData } from "../../data/mobx";

import realm from '../../data/realm';

@observer
export default class DiaryHome extends Component {
  diaryData = new DiaryData();
  constructor(props) {
    console.log(realm.current().path);
    super(props);
    this.state = {
      // 选择年份
      currentYear: DateManager.getYear(),
      isDetail: false
    };
  }

  // componentDidMount() {
  //   RealmManager.saveDiary({
  //     name: '123123123123123123',
  //     content: '12312312321312321asdas',
  //     weather: '3',
  //     year: '2018',
  //     month: '2',
  //     day: '4',
  //     photos: []
  //   });
  // }

  // 年份
  _onTopClick = () => {
    this.refs.hud.show();
  };
  // 正面
  _onPositive = i => {
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      navigate("DiaryList", {
        name: DateManager.getMonthEnglish(i) + "/" + this.state.currentYear,
        year: this.state.currentYear,
        month: i + 1,
        day: DateManager.getDay(),
        dateDiarys:this.diaryData.data
      });
    });
  };
  // 反面
  _onOpposite = (day, month) => {
    //const { DiaryReducer } = this.props;
    let diarys = this.diaryData.data;
    let year = this.state.currentYear;
    if (
      diarys[year] != null &&
      diarys[year][month] != null &&
      diarys[year][month][day] != null
    ) {
      this.pushDiary(year, month, day);
    } else {
      this.pushEdit(year, month, day);
    }
  };
  // hud选择
  _onHudClick = item => {
    this.setState({
      currentYear: item.year
    });
    if (item.year == DateManager.getYear()) {
      this.refs.table.scrollWithIndex(DateManager.getMonth() - 1);
    } else {
      this.refs.table.scrollWithIndex(0);
    }
  };

  // 切换卡片正反
  _onBottomChangClick = isDetail => {
    if (this.refs.table.getAnimated() == false) {
      this.refs.table.show(isDetail);
      this.setState({
        isDetail: !this.state.isDetail
      });
    }
  };

  // 编辑日记
  _onBottomEditClick = () => {
    let year = DateManager.getYear();
    let month = DateManager.getMonth();
    let day = DateManager.getDay();
    this.pushEdit(year, month, day);
  };

  // 当前月点击
  _onBottomCurrentClick = () => {
    this.refs.table.scrollWithIndex(DateManager.getMonth() - 1);
    // setTimeout(() => {
    this.setState({
      currentYear: DateManager.getYear()
    });
    this.refs.hud.setCurrentIndex(-1);
    // }, 500);
  };

  //==================== 操作 ====================//
  pushDiary(year, month, day) {
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      navigate("DiaryDetail", {
        year: year,
        month: month,
        day: day,
        callback:()=>{
          this.diaryData.refresh();
        }
      });
    });
  }
  pushEdit(year, month, day) {
    InteractionManager.runAfterInteractions(() => {
      const { navigate } = this.props.navigation;
      var that = this;
      navigate("DiaryEdit", {
        year: year,
        month: month,
        day: day,
        type: 0,
        callback: () => {
          this.diaryData.refresh();
          setTimeout(() => {
            that.pushDiary(year, month, day);
          }, 1000);
        }
      });
    });
  }

  top() {
    return (
      <View style={styles.top}>
        <TouchableOpacity activeOpacity={1} onPress={this._onTopClick}>
          <View style={styles.content}>
            <Text style={styles.text}>{this.state.currentYear}</Text>
            <Image
              style={styles.icon}
              resizeMode={"contain"}
              source={require("../../resource/images/icon_arrow_down.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  table() {
    return (
      <Table
        ref={"table"}
        onPositive={this._onPositive}
        onOpposite={this._onOpposite}
        currentYear={this.state.currentYear}
        diarys={this.diaryData.data}
      />
    );
  }

  hud() {
    return (
      <KKInputHUD
        ref={"hud"}
        type={HUD.DATE}
        onPress={this._onHudClick}
        diarys={this.diaryData.data}
      />
    );
  }
  bottom() {
    return (
      <Bottom
        isDetail={this.state.isDetail}
        // 切换正反面
        onChange={this._onBottomChangClick}
        // 点击编辑
        onEdit={this._onBottomEditClick}
        // 点击今日
        onPress={this._onBottomCurrentClick}
        // 数据
        diarys={this.diaryData.data}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <TopBar title ={"宝贝日记"} /> */}
        {this.top()}
        {this.table()}
        {this.bottom()}
        {this.hud()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(244,244,244,1)",
    justifyContent: "space-between",
    paddingBottom: 30
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
    height: 30
  },
  content: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 5,
    lineHeight: 30,
    color: "rgba(75,75,75,1)",
    // fontWeight: '500',
    fontSize: 16
    //fontFamily: 'Exo2-Bold'
  },
  icon: {
    width: 12,
    height: 12
  }
});
