import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class TopBar extends Component {
    render() {
        var back_iconcolor = this.props.color ? this.props.color : 'white';
        return (
            <View style={[styles.topbar, this.props.style]}>
                <View style={styles.left}>
                    {this.props.navigator?
                    <TouchableOpacity
                        onPress={this._onPress}
                        style={[styles.button, {paddingLeft: 2*Common.a}]}>
                        <Text style={styles.button_lable}>
                            <Icon name='ios-arrow-back-outline' size={Common.iconBigSize} color={back_iconcolor}/>
                        </Text>
                    </TouchableOpacity>
                    :null}
                </View>
                <View style={styles.middle}>
                    <Text numberOfLines={1} style={[styles.title,{color: back_iconcolor}]}>{this.props.title}</Text>
                </View>
                <View style={styles.right}>
                     {this.props.rightComponent?
                     this.props.rightComponent
                     :null}
                </View>
            </View>
        );
    }

    _onPress=()=>{
        if(this.props.goback){
            this.props.goback();
        }
        else
            requestAnimationFrame(()=>{
                this.props.navigator.goBack();
            })
    }
}

const styles = StyleSheet.create({
    topbar: {
        height: 44,
        backgroundColor: "#91627b",//'#34343A',
        flexDirection: "row",
        alignItems:'center',
    },
    left: {
        flex: 2,
    },
    middle: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 2,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonright: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    button_lable: {
        //fontSize: 2.8*Common.a,
        color: '#999',
    },
    title: {
        color: 'black',
        //fontSize: 2.48*Common.a,
    },

});