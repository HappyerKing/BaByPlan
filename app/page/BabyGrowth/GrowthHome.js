// Default
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// Common
import { Navigation, ThirdPicker } from "../../components";
import { DateManager, DATE_ENUM } from "../../common";
import Toast from "react-native-root-toast";
import GrowthTable from "./GrowthTable";
import { GrowthData } from "../../data/mobx";
import { window, themeColor, toastconfig } from "../../common/theme";
import { observer } from "mobx-react/native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const ScreenWidth = window.width;
const StreamColor = themeColor.StreamColor;

@observer
class GrowthHome extends Component {
  growthData = new GrowthData();
  constructor(props) {
    super(props);
    this.state = {
      needsComponent: false,
      currentTablePage: 0,
      homeYear: DateManager.getYear(),
      homeMonth: DateManager.getMonth()
    };
  }
  componentDidMount() {
    // const { DataAction } = this.props;
    // DataAction.initializationDataSaga();
    // 界面
    // this.timer = setTimeout(()=>{
    //   if (TableComponent == null) {
    //     TableComponent = require('./GrowthTable').default;
    //   }
    //   this.setState(() => ({
    //     needsComponent: true,
    //   }));
    // },300);
  }
  _onHeaderClick = () => {
    this.refs.picker.show(3);
  };
  _onScrollDidEnd = page => {
    let keys = Object.keys(this.growthData.data.param);
    let data = this.growthData.data.range[
      this.growthData.data.range.length - 1 - page
    ];
    this.setState({
      homeYear: data.year,
      homeMonth: data.month,
      currentTablePage: page
    });
  };
  _onPickerClick = (value, data) => {
    const range = this.growthData.data.range;
    for (let i = 0; i < range.length; i++) {
      let remark = range[range.length - i - 1].remark;
      if (value == remark) {
        this.refs.table.scrollWithPage(i);
        return;
      }
    }
    Toast.show("当前月无数据...", toastconfig);
    // this.refs.toast.show();
    // this.timer = setTimeout(()=>{
    //   this.refs.toast.hide();
    // },1000);
  };
  _onPress = item => {
    console.log(item);
    // Save.loadDetail((isDetail)=>{
    //   if (isDetail == true) {
    //     const { navigate } = this.props.navigation;
    //     navigate('Detail', {item: item});
    //   }
    // })
  };

  _addPress(name,type){
    this.props.navigation.navigate('GrowthAdd',{
      name,
      type,
    });
  }
  nav() {
    return (
      <Navigation
        textView={
          <Image
            style={styles.icon}
            resizeMode={"contain"}
            source={require("../../resource/images/detail_share_shark.png")}
          />
        }
      />
    );
  }
  header() {
    const range = this.growthData.data.range;
    // const param = this.growthData.data.param;
    // const paramkeys = Object.keys(param);
    const rangedata = range[range.length - 1 - this.state.currentTablePage];
    // var inmax = 0, exmax = 0;
    // if (rangedata != undefined && rangedata.remark != undefined) {
    //   if (param[rangedata.remark] != undefined) {
    //     inmax = param[rangedata.remark].inmax
    //     exmax = param[rangedata.remark].exmax
    //   }
    // }
    const year = range.length != 0 ? rangedata.year : DateManager.getYear();
    const month = range.length != 0 ? rangedata.month : DateManager.getMonth();

    return (
      <View style={styles.top}>
        <TouchableOpacity
          key={'header'}
          style={styles.one}
          activeOpacity={0.8}
          onPress={this._onHeaderClick}
        >
          <View style={styles.oneV}>
            <Text>{year + "年"}</Text>
            <Text style={styles.oneLeft}>{month}</Text>
            <Text style={styles.oneRight}>月</Text>
            <Image
              resizeMode={"contain"}
              style={styles.oneIcon}
              source={require("../../resource/images/time_down.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  table() {
    return (
      <GrowthTable
        ref={"table"}
        data={this.growthData.data}
        onMomentumScrollEnd={this._onScrollDidEnd}
        onPress={this._onPress}
      />
    );
  }
  // toast() {
  //   return (
  //     <Toast ref={'toast'} text={'当前月无数据...'}/>
  //   )
  // }
  picker() {
    return <ThirdPicker ref={"picker"} onPickerConfirm={this._onPickerClick} />;
  }
  add(){
    return(
      <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={this._addPress.bind(this,'排泄',1)}>
            <Icon name="ios-add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="ios-add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="ios-add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {!this.growthData.isRefreshing ? this.header() : null}
        {!this.growthData.isRefreshing  ? this.table() : null}
        {!this.growthData.isRefreshing  ? this.picker() : null}
        {!this.growthData.isRefreshing  ? this.add() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(244,244,244,1)"
  },
  icon: {
    flex: 1,
    height: 23,
    width: ScreenWidth
  },
  top: {
    height: 50,
    width: ScreenWidth,
    backgroundColor: StreamColor,
    justifyContent: "center"
  },
  one: {
    flex: 3,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  oneV: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  oneLeft: {
    fontSize: 18,
    color: "#282828",
    fontWeight: "300"
  },
  oneRight: {
    fontSize: 9,
    color: "#282828",
    fontWeight: "300",
    marginBottom: 3,
    marginLeft: 2
  },
  oneIcon: {
    width: 12,
    height: 12,
    marginLeft: 2,
    marginBottom: 2
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});

export default GrowthHome;
