import React, { Component } from "react";
import { StyleSheet,Text,ScrollView, View, Image,TouchableOpacity} from "react-native";
import SortableGrid from 'react-native-sortable-grid';
import {Navigation } from '../../components';

export default class GrowthCategory extends Component {
    constructor(props){
        super(props);
        this.alphabets = ['哺乳','换尿布','疫苗','身高','体重','睡眠',
        '游泳','胸围','头围','用药','体温','L',
        'M','N','O','P','Q','R',
        'S','T','U','V','W','X']
    }

    getColor() {
        let r = this.randomRGB()
        let g = this.randomRGB()
        let b = this.randomRGB()
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'
      }

    randomRGB = () => 160 + Math.random()*85;


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
            text={"类别"}
          />
        )
      }

    render(){
        return (
            <View style={styles.container}>
                {this.nav()}
                <ScrollView style={styles.container} >
                <SortableGrid
                blockTransitionDuration      = { 400 }
                activeBlockCenteringDuration = { 200 }
                itemsPerRow                  = { 3 }
                dragActivationTreshold       = { 200 }
                onDragRelease                = { (itemOrder) => console.log("Drag was released, the blocks are in the following order: ", itemOrder) }
                onDragStart                  = { ()          => console.log("Some block is being dragged now!") }
              >
                {
                  this.alphabets.map( (letter, index) =>
                    <View key={index} style={[styles.block, { backgroundColor: this.getColor() }]}>
                      <Text style={{color: 'white', fontSize: 50}}>{letter}</Text>
                    </View>
                  )
                }
              </SortableGrid>
            </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    block: {
        flex: 1,
        margin: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
      }
});