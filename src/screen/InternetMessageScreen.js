import React, { Component } from 'react';
import {
  StyleSheet, View,  Button,
 
} from 'react-native';

export default class InternetMessageScreen extends Component {

  constructor(props) {
    super(props);
  
  }

  

  render() {
    return (
      <View style={styles.container}>
        <Button title="Check your internet connection"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  
});