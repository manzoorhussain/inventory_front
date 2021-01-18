import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import BASEURL from '../api/endpoint';
import {connect} from "react-redux";


 class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      errorMessage :'',
      dataSource:{},
      userInfo:[]
    }
  }

  async onClickListener(){
 
    let loginId=this.state.email;
    let password=this.state.password;
    
    
    try{
         
      await BASEURL.post('api/user/login',{
        "loginId":loginId,
        "password":password
      })
     .then(response => {
     console.log('response');
      var stringifyJson=JSON.stringify(response.data);
      var pasreJson = JSON.parse(stringifyJson);
          var payload={
            "userCode":pasreJson.responseObject.userCode,
            "userId":pasreJson.responseObject.userId
          }
          console.log('response==='+pasreJson.code);
         if(pasreJson.code=="00"){
          
          this.props.dispatch({ type: 'USER_INFO',payload:payload});
          this.props.navigation.navigate('main');
         }else{
          
         this.setState({errorMessage:pasreJson.message});
            

         }
         
         
          })
     .catch(err => {
      
      
      this.setState({errorMessage:"Network Error"});
       
     });
  } catch(error){
  
    
      this.setState({errorMessage:"Conection Error"});
  }

  }
  

  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="User ID"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <View style={styles.buttonContainer}>
        <Text style={styles.messageError}>{this.state.errorMessage.length>0?this.state.errorMessage:""}</Text>
        </View>



        
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo



    
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
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
  ,messageError:{
    fontSize:20,
    color:'red'
  }
});

export default connect(mapStateToProps)(LoginScreen);