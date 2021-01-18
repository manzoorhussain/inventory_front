import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Dimensions,Text} from 'react-native';
import Spacer from './Spacer';
export default class InfoScreen extends Component {


  constructor(props) {
    super(props);

   
   
   

  }
 
 
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
      <Text style={styles.textBack}>{this.props.message}</Text>
      <Spacer/>
      <Text style={styles.textBack}>{this.props.date}</Text>
      <Spacer/>
      <Text style={styles.textBack}>{this.props.time}</Text>
      <Spacer/>
      <Text style={styles.textBack}>{this.props.user}</Text>
        
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      padding:16, 
      paddingTop: 30, 
      backgroundColor: '#00b5ec',
     },

    textBack:{
      height: 40,
      width:Dimensions.get('window').width-50,
      backgroundColor: 'lightgray' ,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center'
      
    },
  
 
});