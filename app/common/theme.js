/**
 * 通用主题配置项
 */

import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";

const window = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  onePR: 1 / PixelRatio.get()
};

const A = window.width / 12;
const a = window.width / 60;

const themeColor = {
  //themeColor: "rgb(217, 51, 58)",
  ScreenPadding : 30,        // 屏幕边框间距
  StreamColor : 'rgba(244,244,244,1)',// 主流颜色
  LineColor : 'rgba(233,233,233,1)', // 主流颜色
  TitleColor : '#282828',    // 文本颜色
  TitleSize : 15, 
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

