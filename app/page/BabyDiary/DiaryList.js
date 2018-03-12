// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Alert, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
// Common
import { Navigation,ListCell } from '../../components';
import {RealmManager} from '../../common';
import { NAVIGATION_HEIGHT ,window,themeColor} from '../../common/theme';
// Utils
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const ScreenWidth = window.width;
const ScreenHeight = window.height;
const StreamColor = themeColor.StreamColor;
const TitleColor = themeColor.TitleColor;

class DiaryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      needsComponent: false,
    }
  }
  componentDidMount() {
    this.timer = setTimeout(()=>{
      this.data();
    },300);
    this.setState({
      needsComponent: true,
    });
  }

  //==================== 删除 ====================//
  closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}
  removeRow(rowMap, rowKey) {
    this.removeDiary(rowMap, rowKey, ()=>{
      this.removeCell(rowMap, rowKey)
    })
    
  }
  removeDiary(rowMap, rowKey, callback) {
    const { DiaryAction } = this.props;
    let diary = this.state.dataSource[rowKey];
    let filtered = "year == '" + diary.year + "' && month == '" + diary.month + "' && day == '" + diary.day + "'";
    RealmManager.removeDiary(filtered, ()=>{
      DiaryAction.loadDiarySaga();
      callback();
    }) 
    // DiaryAction.removeDiarySaga(filtered);
  }
  removeCell(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.dataSource];
		const prevIndex = this.state.dataSource.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    this.setState({dataSource: newData});
  }

  //==================== 点击 ====================//
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _ListEmptyComponent=()=>{
    return (
      <View style={styles.empty}>
        <Text style={styles.diary}>没有日记</Text>
      </View>
    )
  }
  _renderItem=(data, rowMap)=>{
    return (
      <ListCell item={data.item} onPress={()=>this._onPress(data.item)}/>
    )
  }
  _onPress=(item)=>{
    const { navigate } = this.props.navigation;
    navigate("DiaryDetail", {
      year: item.year,
      month: item.month,
      day: item.day,
      weather: item.weather,
      name: item.name,
      content: item.content,
      photos: item.photos
    });
  }
  _removeDiary(rowMap, rowKey) {
    Alert.alert(
      '你确定要删除这篇日记吗?',
      '你不能撤销这个操作',
      [
        {text: '删除', onPress: ()=>this.removeRow(rowMap, rowKey), style: 'cancel'},
        {text: '取消', onPress: () => {}},
      ],
      { cancelable: false }
    )
  }

  //==================== 控件 ====================//
  data() {
    const { params } = this.props.navigation.state;
    let arr = [];
    let count = 0;
    let year  = params.year;
    let month = params.month;
    let dateDiarys = params.dateDiarys;
    if (dateDiarys[year] != null) {
      if (dateDiarys[year][month] != null) {
        count = dateDiarys[year][month]["array"].length;
      }
    }
    for (let i=0; i<count; i++) {
      let diary = dateDiarys[year][month]["array"][i];
      diary.key = i;
      arr.push(diary);
    }
    this.setState({
      dataSource: arr
    })
  }
  nav() {
    const { params } = this.props.navigation.state;
    return (
      <Navigation 
        leftIcon={require('../../resource/images/icon_back_arrow.png')}
        leftClick={this._back}
        text={params.name}
      />
    )
  }
  table() {
    return (
      <SwipeListView
        useFlatList
        data={this.state.dataSource}
        ListEmptyComponent={this._ListEmptyComponent}
        renderItem={(data, rowMap) => this._renderItem(data)}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this._removeDiary(rowMap, data.item.key) }>
              <Text style={styles.backTextWhite}>删除</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={<View style={{height: 20}}/>}
        disableRightSwipe={true}
        rightOpenValue={-75}
        onRowDidOpen={this.onRowDidOpen}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.state.needsComponent ? this.table() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StreamColor,
    justifyContent: 'space-between',
  },
  diary: {
    fontSize: 14,
    color: TitleColor
  },
  empty: {
    flex: 1, 
    height: ScreenHeight - NAVIGATION_HEIGHT, 
    justifyContent: 'center',
    alignItems: 'center',
  },


	
	backTextWhite: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
    alignItems: 'flex-end',
    paddingRight: 20,
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: ScreenWidth
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
});

export default DiaryList;
