// Default
import React, { Component } from 'react';
import {  StyleSheet, Text, View, Image } from 'react-native';
// Common
import { Navigation, ThirdPicker } from '../../components';
import {DateManager,DATE_ENUM} from '../../common';
import Toast from "react-native-root-toast";
import Table from './Table';
import {  window ,themeColor,toastconfig} from '../../common/theme';

const ScreenWidth = window.width;
const StreamColor = themeColor.StreamColor;

let TableComponent = null;
class GrowthHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsComponent: false,
      currentTablePage: 0,
      homeYear: DateManager.getYear(),
      homeMonth: DateManager.getMonth()
    }
  }
  componentDidMount() {
    const { DataAction } = this.props;
    DataAction.initializationDataSaga();
    // 界面
    this.timer = setTimeout(()=>{
      if (TableComponent == null) {
        TableComponent = require('./Table').default;
      }
      this.setState(() => ({
        needsComponent: true,
      }));
    },300);
  }
  _onHeaderClick=()=>{
    this.refs.picker.show(3);
  }
  _onScrollDidEnd=(page)=>{
    const { DataReducer } = this.props;
    let keys = Object.keys(DataReducer.homeData.param);
    let data = DataReducer.homeData.range[DataReducer.homeData.range.length - 1 - page];
    this.setState({
      homeYear: data.year,
      homeMonth: data.month,
      currentTablePage: page
    })
  }
  _onPickerClick=(value, data)=>{
    const { DataReducer } = this.props;
    const range = DataReducer.homeData.range;
    for (let i=0; i<range.length; i++) {
      let remark = range[range.length-i-1].remark;
      if (value == remark) {
        this.refs.table.scrollWithPage(i);
        return;
      }
    }
    Toast.show('当前月无数据...', toastconfig);
    // this.refs.toast.show();
    // this.timer = setTimeout(()=>{
    //   this.refs.toast.hide();
    // },1000);
  }
  _onPress=(item)=>{
    console.log(item);
    // Save.loadDetail((isDetail)=>{
    //   if (isDetail == true) {
    //     const { navigate } = this.props.navigation;
    //     navigate('Detail', {item: item});
    //   }
    // })
  }
  nav() {
    return (
      <Navigation 
        textView={
          <Image style={styles.icon} 
                resizeMode={"contain"}
                source={require('../../resouce/images/detail_share_shark.png')}/>
        }
      />
    )
  }
  header() {
    const { DataReducer } = this.props;
    const range = DataReducer.homeData.range;
    const param = DataReducer.homeData.param;
    const paramkeys = Object.keys(param);
    const rangedata = range[range.length - 1 - this.state.currentTablePage];
    var inmax = 0, exmax = 0;
    if (rangedata != undefined && rangedata.remark != undefined) {
      if (param[rangedata.remark] != undefined) {
        inmax = param[rangedata.remark].inmax
        exmax = param[rangedata.remark].exmax
      }
    }
    const year = range.length != 0 ? rangedata.year : DateManager.getYear();
    const month = range.length != 0 ? rangedata.month : DateManager.getMonth();
    return (
      <Header 
        year={year}
        month={month}
        in={inmax}
        ex={exmax}
        onPress={this._onHeaderClick}
      />
    )

    return(
      <View style={styles.top}>
       <TouchableOpacity 
            key={i} 
            style={styles.one} 
            activeOpacity={0.8}
            onPress={this._onHeaderClick}
          >
            <View style={styles.oneV}>
              <Text>{year+'年'}</Text>
              <Text style={styles.oneLeft}>{this.props.month}</Text>
              <Text style={styles.oneRight}>月</Text>
              <Image 
                resizeMode={"contain"} 
                style={styles.oneIcon} 
                source={require('../../resouce/images/time_down.png')}
              />
            </View>
          </TouchableOpacity>
      </View>
    )
  }
  table() {
    const { DataReducer } = this.props;
    return (
      <Table 
        ref={'table'}
        data={DataReducer.homeData}
        onMomentumScrollEnd={this._onScrollDidEnd}
        onPress={this._onPress}
      />
    )
  }
  // toast() {
  //   return (
  //     <Toast ref={'toast'} text={'当前月无数据...'}/>
  //   )
  // }
  picker() {
    return (
      <ThirdPicker 
        ref={'picker'}
        onPickerConfirm={this._onPickerClick}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.header()}
        {this.state.needsComponent ? this.table() : null}
        {this.state.needsComponent ? this.picker() : null}
        {/* {this.state.needsComponent ? this.toast() : null} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
  },
  icon: {
    flex: 1,
    height: 23, 
    width: ScreenWidth,
  },
  top:{
    height:50,
    width:ScreenWidth,
    backgroundColor:StreamColor,
    justifyContent:'center'
  },
  one: {
    flex: 3, 
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  oneV: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  oneLeft: {
    fontSize: 18,
    color: '#282828',
    fontWeight: '300',
  },
  oneRight: {
    fontSize: 9,
    color: '#282828',
    fontWeight: '300',
    marginBottom: 3,
    marginLeft: 2,
  },
  oneIcon: {
    width: 12,
    height: 12,
    marginLeft: 2,
    marginBottom: 2,
  },
});


export default GrowthHome;