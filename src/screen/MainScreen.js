import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
 
} from 'react-native';
import Spacer from './Spacer';
import BASEURL from '../api/endpoint';
import store from '../store/UserStore';
export default class MainScreen extends Component {

  constructor(props) {
    super(props);

   
  var obj=JSON.stringify(store.getState().userInfo);
  var pasreJson = JSON.parse(obj);
  
  var userCodee=JSON.parse(JSON.stringify(pasreJson[0].userCode));
  var userIdd=JSON.parse(JSON.stringify(pasreJson[0].userId));
  
  this.state = {
    userCode:userCodee,
    userId:userIdd,
   
};
  

  }




  async onLogOut(){
   
 
    try{
        var url="api/user/delete-usercode/"+this.state.userCode
      await BASEURL.delete(url)
     .then(response => {
          
      this.props.navigation.navigate('login');
          
          })
     .catch(err => {
      console.log('Fetch Error1:', err)

     });
  } catch(error){
      console.log('Fetch Error:', error)
     

  }
  }



  scanQR(){
    this.props.navigation.navigate('qrcode',{
      'userCode':this.state.userCode,
      'userId':this.state.userId,
      

    });
 
    
  }
  render() {
    return (
      <View style={styles.container}>
       
         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onLogOut()}>
          <Text style={styles.loginText}>Log out</Text>
        </TouchableHighlight>

        <Spacer/>
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.scanQR()}>
          <Text style={styles.loginText}>Scan QR Code</Text>
        </TouchableHighlight>



        
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
  
  

  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }

});