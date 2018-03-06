/**
 * 启示页 -加载路由
 */

import React, { Component } from "react";
import { View, StatusBar, Platform, StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";

import { userStore } from "../data/mobx";
import { MyHome } from "./My";
import { DiaryEdit } from "./BabyDiary";
import Login from "./Login";
import Main from "./Main";

const Route = StackNavigator(
  {
    Login: { screen: Login },
    Main: { screen: Main },
    DiaryEdit: { screen: DiaryEdit }
  },
  {
    initialRouteName: userStore.user != null ? "Main" : "Login", // 默认显示界面
    swipeEnabled: false,
    navigationOptions: {
      gesturesEnabled: false
    },
    mode: "card", // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: "none" // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
  }
);

export default class Root extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={style.statusBar}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
        </View>
        <Route />
      </View>
    );
  }
}

const style = StyleSheet.create({
  statusBar: {
    height: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#34343A"
  }
});
