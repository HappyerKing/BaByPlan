/**
 *  主页
 */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TopBar, Loading } from "../components";
import TabNavigator from "react-native-tab-navigator";
import { a } from "../common/theme";
import Icon from "react-native-vector-icons/EvilIcons";
import { ActionHome } from "./BabyAction";
import { DiaryHome } from "./BabyDiary";
import { MyHome } from "./My";

export default class Main extends Component {
  state = {
    selectedTab: "BabyAction"
  };

  onPress(tabName) {
    this.setState({
      selectedTab: tabName
    });
  };

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === "BabyAction"}
          title="行为"
          renderIcon={() => <Icon name="trophy" size={30}/>}
          renderSelectedIcon={() => <Icon name="trophy" size={30} color="#91627b"/>}
          onPress={this.onPress.bind(this,"BabyAction")}
        >
          <ActionHome navigation={this.props.navigation} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === "BabyDiary"}
          title="日记"
          renderIcon={() => <Icon name="camera"   size={30}/>}
          renderSelectedIcon={() => <Icon name="camera" size={30} color="#91627b"/>}
          onPress={this.onPress.bind(this,"BabyDiary")}
        >
          <DiaryHome navigation={this.props.navigation} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === "My"}
          title="我"
          renderIcon={() => <Icon name="calendar" size={30}/>}
          renderSelectedIcon={() => <Icon name="calendar" color="#91627b"  size={30}/>}
          onPress={this.onPress.bind(this,"My")}
        >
          <MyHome navigation={this.props.navigation} />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  tabview_icon: {
    width: 3 * a,
    height: 3 * a
  }
});
