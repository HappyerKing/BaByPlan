/**
 *  行为记录首页
 */

import React, { Component } from "react";
import { View, Text } from "react-native";
import {TopBar} from "../../components";

export default class ActionHome extends Component {
  render() {
    return (
      <View>
        <TopBar title ={"行为自律"} />
      </View>
    );
  }
}
