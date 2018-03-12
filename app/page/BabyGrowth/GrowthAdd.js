import React, { Component } from "react";
import { StyleSheet, ScrollView,Text, View, Image, TouchableOpacity } from "react-native";
import { Line,AutoExpandingTextInput } from "../../components";

export default class GrowthAdd extends Comment {
    _back=()=>{
        const { goBack } = this.props.navigation;
        goBack();
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
    content(){
        return (
            <ScrollView
                scrollEventThrottle={10}
                onTouchStart={this._onScrollStart}
                onTouchMove={this._onScrollMove}
                onTouchEnd={this._onScrollEnd}
                ref={"scroll"}
                style={styles.content}
                onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.yOffset } } }]
                // {listener: this._handleScroll},
                )}
            >
                <TouchableOpacity activeOpacity={1} style={{flexDirection:'row',justifyContent:"space-betwwen",margin:20}}>
                    <Text>日期</Text>
                    <Text>{"2018年03月12日"}</Text>
                </TouchableOpacity>
                <Line left={20} right={20}></Line>
                <TouchableOpacity activeOpacity={1} style={{flexDirection:'row',justifyContent:"space-betwwen",margin:20}}>
                    <Text>时间</Text>
                    <Text>{"17：52"}</Text>
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
    render(){
        return(
            <View style={styles.container}>
                {this.nav()}
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
})