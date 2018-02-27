import React, { Component } from "react";
import { View, StatusBar, Platform, StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";

export default class App extends Component {
  return() {
    <View style={{ flex: 1 }}>
      <View style={style.statusBar}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
      </View>
      <Route />
    </View>;
  }
}

const style = StyleSheet.create({
  statusBar: {
    height: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#34343A"
  }
});
