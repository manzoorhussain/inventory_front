// Barcode and QR Code Scanner using Camera in React Native
// https://aboutreact.com/react-native-scan-qr-code/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';

// import CameraKitCameraScreen
import {CameraKitCameraScreen} from 'react-native-camera-kit';
import BASEURL from '../api/endpoint';

import InfoScreen from  './InfoScreen';
const QRCodeScreen = (props) => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [message, setMessage] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [done, setDone] = useState(false);
  const [item, setItem] = useState('');
  const [user, setUser] = useState('');

  const { state} = props.navigation;
  
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds()
    
  
    setCurrentDate(year + '-' + month + '-' + date);
    setCurrentTime(hours+":"+min+":"+sec);
    setUser(state.params.userId)
   
    
  }, []);

 let counter=0;
  const  onBarcodeScan= async (qrvalue) => {
    // Called after te successful scanning of QRCode/Barcode
    console.log("qrvalue=="+qrvalue);
     if(counter==0){
      setQrvalue(qrvalue);
      setMessage(counter)
      setOpneScanner(false);


      try{
        var url=`api/product/change-quantity/${qrvalue}`;
        
       await BASEURL.get(url)
    .then(response => {
   
      var stringifyJson=JSON.stringify(response.data);
      var pasreJson = JSON.parse(stringifyJson); 
      var msge=pasreJson.message+" "+pasreJson.responseObject;
      setMessage(msge)
      setItem(pasreJson.responseObject);
      console.log('ITEM--'+pasreJson.responseObject)
      if(pasreJson.code=="00"){
        var itemName=pasreJson.responseObject
        addScanData(itemName);
      }
     
     
     
     
         })
    .catch(err => {
     console.log("Error1")
     //this.setState({errorMessage:"Network Error"});
      
    });
 } catch(error){
   console.log("Error2")
   
     //this.setState({errorMessage:"Conection Error"});
 }
    

   
     }
     
     
   
 


  };

  const addScanData = async (itemName) => {
console.log('addScanData Call')
console.log("13---"+currentDate+"=="+currentTime+"=="+currentTime+"==="+user+"=="+itemName);

var url=`api/scan-record/add`;
      var bodyFormData = new FormData();
      bodyFormData.append('scanDate', currentDate);
      bodyFormData.append('scanTime', currentTime);
      bodyFormData.append('scanUser', user);
      bodyFormData.append('scanItem', itemName);
      bodyFormData.append('scanQty', "1");

    try{
      
   
     


     await BASEURL.post(url,bodyFormData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }

     })
  .then(response => {
 
    var stringifyJson=JSON.stringify(response.data);
    var pasreJson = JSON.parse(stringifyJson); 
    var msge=pasreJson.message+" "+pasreJson.responseObject
    console.log("Message-"+msge)

   
   
       })
  .catch(err => {
   console.log("Add Scan Error1")
   //this.setState({errorMessage:"Network Error"});
    
  });
} catch(error){
 console.log("Add Scan Error2")
 
   //this.setState({errorMessage:"Conection Error"});
}


  }

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
      setOpneScanner(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {opneScanner ? (
        <View style={{flex: 1}}>
          <CameraKitCameraScreen
            showFrame={false}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // If frame is visible then frame color
            colorForScannerFrame={'black'}
            // Scanner Frame color
            onReadCode={(event) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (

        <View style={styles.container}>
        
          <Text style={styles.textStyle}>
            {qrvalue ?  <InfoScreen message={message} date={currentDate} time={currentTime} user={user}/> : ''}
          </Text>
          <TouchableHighlight
            onPress={onOpneScanner}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
            Open QR Scanner
            </Text>
          </TouchableHighlight>
         
         
        </View>
      )}
    </SafeAreaView>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});