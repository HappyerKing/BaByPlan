'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  ProgressBarAndroid,
  Platform,
  BackHandler
} from 'react-native';

export default class Loading extends Component{
    static defaultProps ={
      isDismissible: false,
      isVisible: false,
      color: '#000',
      size: 'large',
      overlayColor: 'rgba(0, 0, 0, 0)',
      panelColor: 'rgba(0, 0, 0, 0.3)',
    }

    static propTypes={
        isDismissible: PropTypes.bool,
        isVisible: PropTypes.bool.isRequired,
        color: PropTypes.string,
        size: PropTypes.string,
        overlayColor: PropTypes.string,
        panelColor: PropTypes.string,
    }


      _renderSpinner(){
            let spinnerStyle = {
            //marginTop: 200,
            width: 150,
            height: 100,
            borderRadius: 16,
            backgroundColor: this.props.panelColor
            };

            return (
                <View>
                    <ActivityIndicator
                    style={spinnerStyle}
                    color={this.props.color}
                    size={this.props.size}
                    /> 
                </View>
            );
   }

   componentWillMount() {
    if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = ()=>{
        if(this.props.isVisible)
            return true;
        return false;
    }

    render(){
        if (this.props.isVisible) {
            return (
                <View key="Loading"
                    style={[{alignItems: 'center', justifyContent: 'center',  flex: 1, position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,
                                backgroundColor: this.props.overlayColor}]}
                    underlayColor={this.props.overlayColor}
                    activeOpacity={1}
                    {...this.props}
                    >
                    {this._renderSpinner()}  
                </View>
            );
            }
        else
            return(null);
       
  }


}
