/**
 * 登录页
 */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { userStore } from '../data/mobx';
import {Kohana} from "../components";
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';

export default class Login extends Component {
  render() {
    return (
      <View style={Styles.MainView}>
       
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  MainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
