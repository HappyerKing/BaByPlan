/**
 *  日记首页
 */

import React, { PureComponent } from "react";
import { View, Text ,StyleSheet} from "react-native";
import { TopBar } from "../../components";
import { DateManager } from "../../common";

export default class DiaryHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 选择年份
      currentYear: DateManager.getYear(),
      isDetail: false
    };
  }

  componentDidMount(){
    //初始化data
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.nav()}
        {this.top()}
        {this.table()}
        {this.bottom()}
        {this.hud()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
});
