import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import { window,themeColor } from '../../common/theme';

const ScreenHeight =window.height;
const StreamColor= themeColor.StreamColor;

class CommonCell extends PureComponent {

  render() {
    return (
      <TouchableHighlight 
        underlayColor={'rgba(200,200,200,1)'} 
        onPress={()=>this.props.onPress(this.props.item)}
      >
        <View style={styles.container}>
          <Text style={[styles.text, this.props.item.isSelect == true && {
            color: 'black'
          }]}>
            {this.props.item.data}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScreenHeight / 5 * 2 / 5
  },
  text: {
    color: 'gray',
    // fontWeight: '400',
    //fontFamily: 'Exo2-Bold',
  }
});


// 连接组件 
export default CommonCell;