import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  DeviceEventEmitter
} from "react-native";
import {  window } from "../common/theme";
const ScreenWidth = window.width;

class CameraCell extends Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.props.onPress}>
        <View style={styles.container}>
          <Image
            source={require("../resouce/images/photo.png")}
            resizeMode={"contain"}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

// 样式定义
const styles = StyleSheet.create({
  container: {
    width: (ScreenWidth - 20) / 3,
    height: (ScreenWidth - 20) / 3,
    backgroundColor: "rgba(233,233,233,1)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginRight: 10
  },
  icon: {
    width: (ScreenWidth - 20) / 3 / 3,
    height: (ScreenWidth - 20) / 3 / 3
  }
});

export default CameraCell;
