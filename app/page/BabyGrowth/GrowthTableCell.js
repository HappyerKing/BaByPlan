// Default
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {  StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
// Utils
import { ICON_JSON } from '../../resource/json/assetJson';
import { themeColor } from '../../common/theme';

const TitleColor = themeColor.TitleColor;

class GrowthTableCell extends Component {

  render() {
    return (
      <TouchableHighlight onPress={()=>this.props.onPress(this.props.item)} underlayColor={'#bbb'}>
        <View style={styles.container}>
          <Image style={styles.icon} source={ICON_JSON[this.props.item.id].icon}/>
          <Text style={styles.name}>{this.props.item.name}</Text>
          <Text style={styles.number}>{'detail'}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  name: {
    paddingLeft: 10,
    fontWeight: '300',
    color: TitleColor,
    fontSize: 13,
    flex: 1
  },
  number: {
    fontWeight: '300',
    color: TitleColor,
    fontSize: 13,
  }
});

GrowthTableCell.defaultProps = {
  item: {
    name: '',
    money: 0,
  },
  onPress: ()=>{}
}
GrowthTableCell.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    money: PropTypes.number,
  }),
  onPress: PropTypes.func,
}

export default GrowthTableCell;