/**
 *  日记首页
 */

import React, { Component } from "react";
import { View, Text } from "react-native";
import {TopBar} from "../../components";

export default class DiaryHome extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <TopBar title ={"宝贝日记"} />
      </View>
    );
  }
}
