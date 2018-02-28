/**
 * 登录页
 */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { userStore } from '../data/mobx';
import {Kohana} from "../components";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.card2, { backgroundColor: '#b792a6',height:200,    bottom:100, }]}>
          <Text style={styles.title}>登录</Text>
          <Kohana
            style={[styles.input, { backgroundColor: '#f9f5ed' }]}
            label={'手机号'}
            iconClass={FontAwesomeIcon}
            iconName={'phone'}
            iconColor={'#ddd'}
            iconColor={'#f4d29a'}
            labelStyle={{ color: '#91627b' }}
            inputStyle={{ color: '#91627b' }}
            useNativeDriver
          />
          <Kohana
            style={{ backgroundColor: '#f9f5ed' }}
            label={'密码'}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#f4d29a'}
            iconSize={40}
            labelStyle={{ marginTop: 8, color: '#91627b' }}
            inputStyle={{ color: '#91627b' }}
            useNativeDriver
          />
          
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b792a6',
    justifyContent: "center",
    //alignItems: "center"
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});
