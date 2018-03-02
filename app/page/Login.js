/**
 * 登录页
 */

import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { userStore } from "../data/mobx";
import { Kohana } from "../components";
import { Button } from "react-native-elements";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { window, a, toastconfig } from "../common/theme";
import Toast from "react-native-root-toast";

export default class Login extends Component {
  state = {
    phoneNum: "",
    pw: ""
  };

  // 输入格式验证
  checkItem() {
    if (this.state.phoneNum == "") return "手机号为空，请输入后再试";
    let phoneNumCheckRegex = new RegExp(
      /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9])|17[0-9])\d{8}$/
    );
    if (!phoneNumCheckRegex.test(this.state.phoneNum))
      return "手机号格式不正确，请重新输入";
    if (this.state.pw == "") return "登录密码为空，请输入后再试";
    return "";
  }

  submit = async () => {
    let errorMessage = this.checkItem();
    if (errorMessage != "") {
      Toast.show(errorMessage, toastconfig);
      return;
    }
    this.props.navigation.navigate("Main");
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>登录</Text>
          <View style={{ height: 130 }}>
            <Kohana
              style={styles.input}
              label={"手机号"}
              iconClass={FontAwesomeIcon}
              iconName={"phone"}
              iconColor={"#ddd"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              useNativeDriver
              onChangeText={text => this.setState({ phoneNum: text })}
            />
            <Kohana
              style={[styles.input, { backgroundColor: "#f9f5ed" }]}
              label={"密码"}
              secureTextEntry={true}
              iconClass={FontAwesomeIcon}
              iconName={"lock"}
              iconColor={"#ddd"}
              iconColor={"#f4d29a"}
              labelStyle={{ color: "#91627b" }}
              inputStyle={{ color: "#91627b" }}
              useNativeDriver
              onChangeText={text => this.setState({ pw: text })}
            />
          </View>
          <Button
            text="登录"
            textStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#f4d29a",
              width: window.width - 4 * a,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 20
            }}
            containerStyle={{ marginTop: 2 * a }}
            onPress={this.submit}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 2 * a
            }}
          >
            <View style={{ flex: 1, alignItems: "flex-end", paddingRight: a }}>
              <Text style={{}}>注册</Text>
            </View>
            <Text>|</Text>
            <View style={{ flex: 1, paddingLeft: a }}>
              <Text>忘记密码</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b792a6",
    justifyContent: "center"
  },
  form: {
    padding: 2 * a
  },
  input: {
    marginBottom: a,
    backgroundColor: "#f9f5ed"
  },
  title: {
    paddingVertical: 2 * a,
    textAlign: "center",
    color: "white",
    fontSize: 26,
    fontWeight: "bold"
    //opacity: 0.8,
  }
});
