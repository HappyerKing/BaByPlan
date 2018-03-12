import React, { Component } from "react";
import { StyleSheet, ScrollView,Text, View, Image, Easing,TouchableOpacity,Animated,Keyboard} from "react-native";
import { Line,AutoExpandingTextInput,KKInputHUD ,HUD,Navigation,ThirdPicker} from "../../components";
import { themeColor } from "../../common/theme";
import {DateManager,DATE_ENUM} from '../../common';

const StreamColor =themeColor.StreamColor;
const LineColor =themeColor.LineColor;
var that;
export default class GrowthAdd extends Component {

    state ={
        currentStatus:'干燥',
        keyboardH:0,
        keyboardY: new Animated.Value(0),
        date:DateManager.getRemarkWithDate({year: DateManager.getYear(),
             month: DateManager.getMonth(), day: DateManager.getDay()}, DATE_ENUM.DAY) ,
        time:DateManager.getHour()+':'+DateManager.getMinute(),
    }

    componentWillMount() {
        that = this;
        this.keyboardWillShowListener = Keyboard.addListener(
          "keyboardWillShow",
          this._keyboardWillShow
        );
        this.keyboardDidShowListener = Keyboard.addListener(
          "keyboardDidShow",
          this._keyboardDidShow
        );
        this.keyboardWillHideListener = Keyboard.addListener(
          "keyboardWillHide",
          this._keyboardWillHide
        );
      }
    
      componentWillUnmount() {
        this.keyboardWillShowListener.remove();
        this.keyboardDidShowListener.remove();
        this.keyboardWillHideListener.remove();
      }

      _keyboardWillShow(event) {
        Animated.timing(that.state.keyboardY, {
          toValue: event.endCoordinates.height,
          duration: event.duration,
          easing: Easing.linear
        }).start(result => {});
      }
      _keyboardDidShow(event) {
        that.state.keyboardH = event.endCoordinates.height;
        that.refs.scroll.scrollToEnd();
      }
      _keyboardWillHide(event) {
        Animated.timing(that.state.keyboardY, {
          toValue: 0,
          duration: event.duration,
          easing: Easing.linear
        }).start(result => {});
      }

    _back=()=>{
        const { goBack } = this.props.navigation;
        goBack();
      }

            // hud选择
    _onHudClick = item => {
        this.setState({
        currentStatus: item.data
        });
    };
    _showHud = () => {
        this.refs.hud.show();
    };

    // 手指按下Scroll
    _onScrollStart = () => {
        that.refs.content.enableEdit();
        };
    // 手指移动Scroll
    _onScrollMove = () => {
    if (that.refs.content.isFocused() == false) {
        that.refs.content.disableEdit();
    }
    };
// 手指离开Scroll
    _onScrollEnd = () => {};
    
     // 内容聚焦
    _onContentFocus = () => {
        if (this.state.keyboardH != 0) {
        that.refs.scroll.scrollToEnd();
        }
  };
   // 内容尺寸改变
   _onContentSizeChange() {
    that.refs.scroll.scrollToEnd();
  }

  _onPickerClick = (value, data,type) => {
      if(type ==0)
        this.setState({
            time:value
        })
    else if(type ==2)
    this.setState({
        date:value
    })
  };
    nav() {
        const { params } = this.props.navigation.state;
        return (
          <Navigation 
            leftIcon={require('../../resource/images/icon_back_arrow.png')}
            leftClick={this._back}
            text={params.name}
            rightClick={() => {}} 
            rightText= "保存"
          />
        )
      }
    content(){
        return (
            <ScrollView
                scrollEventThrottle={10}
                onTouchStart={this._onScrollStart}
                onTouchMove={this._onScrollMove}
                onTouchEnd={this._onScrollEnd}
                ref={"scroll"}
                style={styles.content}
            >
                <TouchableOpacity activeOpacity={1} style={styles.row} onPress={()=>{this.refs.picker.show(2)}}>
                    <Text>日期</Text>
                    <Text>{this.state.date}</Text>
                </TouchableOpacity>
                <Line left={20} right={20}></Line>
                <TouchableOpacity activeOpacity={1} style={styles.row} onPress={()=>{this.refs.picker.show(0)}}>
                    <Text>时间</Text>
                    <Text>{this.state.time}</Text>
                </TouchableOpacity>
                <Line left={20} right={20}></Line>
                <TouchableOpacity activeOpacity={1} style={styles.row} onPress={this._showHud}>
                    <Text>状态</Text>
                    <Text>{this.state.currentStatus}</Text>
                </TouchableOpacity>
                <Line left={20} right={20}></Line>
                <AutoExpandingTextInput
                    placeholder={"备注..."}
                    onFocus={this._onContentFocus}
                    ref={"content"}
                    style={styles.detail}
                    autoCorrect={false}
                    onContentSizeChange={this._onContentSizeChange}
                />
            </ScrollView>
            );
    }
    hud() {
        return (
          <KKInputHUD
            ref={"hud"}
            type={HUD.DISCHARGE}
            onPress={this._onHudClick}
          />
        );
      }

    picker() {
        return <ThirdPicker ref={"picker"} onPickerConfirm={this._onPickerClick} />;
      }
    render(){
        return(
            <View style={styles.container}>
                {this.nav()}
                {this.content()}
                {this.hud()}
                {this.picker()}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StreamColor,
        justifyContent: 'space-between',
      },
    content: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: LineColor,
      },
    row:{
        flexDirection:'row',
        justifyContent:"space-between",
        margin:20,
    }  
})