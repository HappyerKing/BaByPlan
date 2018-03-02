/**
 * 通用主题配置项
 */

import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";

let window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  onePR: 1 / PixelRatio.get()
};

let A = window.width / 12;
let a = window.width / 60;

let themeColor = {
  //themeColor: "rgb(217, 51, 58)",
};

const themeStyles = StyleSheet.create({
    
});

const toastconfig = {
  duration: Toast.durations.SHORT,
  position: Toast.positions.CENTER,
  shadow: false,
  animation: false,
  hideOnPress: true,
  delay: 0,
  textStyle: { }
};


export {
  window,
  A,
  a,
  themeColor,
  themeStyles,
  toastconfig
};

