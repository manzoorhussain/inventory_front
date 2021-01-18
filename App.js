import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Provider} from  'react-redux';

import React, { Component } from 'react';
import { View, Text, Button, Alert, Platform } from "react-native";

import InternetMessgeScreen from './src/screen/InternetMessageScreen';
import LoginScreen from './src/screen/LoginScreen';
import MainScreen from './src/screen/MainScreen';
import NetworkUtils from './src/screen/NetworkUtils';
import QRCodeScreen from './src/screen/QRCodeScreen';

import store from './src/store/UserStore';
const switchNavigator=createStackNavigator({


  login:LoginScreen,
 


  main: {
    screen: MainScreen,
    },
  qrcode: {
  screen: QRCodeScreen,
  
  
}

  },
  
  
{

  headerMode: '',
  
}
);//end switchNavigator



const App= createAppContainer(switchNavigator);

export default()=>{

  return (
    <Provider store={store}>
               <App/>
    </Provider>         
  
         
 );

}