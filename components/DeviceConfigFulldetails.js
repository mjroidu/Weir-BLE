
import { createAppContainer } from 'react-navigation'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import FontIcons from 'react-native-vector-icons/Foundation'; 
import Ladybug1 from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { createStackNavigator } from 'react-navigation-stack';

//import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createStackNavigator } from 'react-navigation-stack';

//import Dname from 'react-native-vector-icons/MaterialIcons';
//import Hr from 'react-native-hr';
//import { BluetoothStatus } from "react-native-bluetooth-status";

//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';   
import React, { Component } from 'react';
import { Device, BleManager  } from 'react-native-ble-plx';

//import Button from  "react-native-button;

import {
  StyleSheet,
  NativeAppEventEmitter,
  Text, 
  SafeAreaView,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  TouchableNativeFeedback
  
} from 'react-native';


console.disableYellowBox = true;


export default class DeviceConfig extends React.Component {
    constructor(props) {      
      super(props);     
      //this.BLDevices = [ ]
      this.state = {
        BLDevices: [],
         isConnected: false
      };
      this.manager = new BleManager();
      this.scanAndConnect = this.scanAndConnect.bind(this);
      //this.discoverAllServiceChar = this.discoverAllServiceChar.bind(this);
    }
  
    scanAndConnect() {
      this.manager.startDeviceScan(null, null, (error, device) => {
       if(error){
        console.log(error);
        return }     
  
        var isExists = this.state.BLDevices.findIndex(function(item){
          return (item.id === device.id);
        });
  
        if(isExists < 0){
          this.setState({
            BLDevices: [...this.state.BLDevices, device]
          });
        }


      if(device.name ==='Weir BLE') 
      { 

        console.log("Weir Ble GOT!!!");               
        device.connect()
        .then((connect) => {                
          console.log("Device connected details", connect);  


        device.isConnected()
        .then ((connect)=>{  
                          
          console.log("connected or not: ", connect);
          this.setState({isConnected: true}); 
          this.discoverAllServiceChar(device);
        })
        }) 
        this.manager.stopDeviceScan()
    }
    });             
    }

    discoverAllServiceChar(device)
    {
            device.discoverAllServicesAndCharacteristics(device.id)
            .then ((connect1)=> {
              console.log("Char and services", connect1);
            
              device.services()
              .then ((connect2)=> {
                console.log("only services", connect2);
                
                let SuuidArr = connect2.map(
                  item => {
                    return item.uuid;
                  }
                );
                console.log("uuidArr1: ", SuuidArr); 
                this.setState({SuuidArr});                            
            })
  
              .catch((error) => {               
                console.log("charachterstics of services error here: ", error);
              })
            })                     
    }

    UNSAFE_componentWillMount() 
  {
    const subscription = this.manager.onStateChange(state => {
        if (state === "PoweredOn") {
          this.scanAndConnect();
          subscription.remove();
        }
    }, true);
  }

  
    renderItem = (item) => {
        //console.log("Item: ", item);
        //console.log(`this.props.navigation = ${JSON.stringify(this.props.navigation)}`);
        let paramfromdeviceconfig = this.props.navigation.state.params;
        console.log("ServicesUUidslist1: ", this.state.SuuidArr);
        console.log("this123isConnected: ", this.state.isConnected);
      

      return (
      
  <View  
      //  elevation ={30} 
      //  style = {{padding: 10, 
      //   backgroundColor:"steelblue", 
      //   margin:10, 
      //   width: 320, 
      //   height: 170, 
      //   flex: 1,
      //   flexDirection: 'column',
      //   justifyContent: 'center',
      //   // alignItems: 'center',
      //   alignContent: 'center',
      //   alignSelf: 'center',
      //   borderRadius: 10,                
      //   }}        
        >

    <View style= {{borderStyle:"solid", borderColor:"white", borderBottomWidth: 1}} />           
      <View style ={{flex: 8}}>         
        <Text style={{ fontSize: 25, color: "black" }}> COMPLETE DETAILS </Text>
        <Text style={{fontSize: 15, color: "black" }}> Device Basic Details: </Text>
        <Text style={styles.itemId}> Connected: {this.state.isConnected.toString()} </Text> 
        
        <Text style={styles.itemId}> SensoreID: {(paramfromdeviceconfig.id === null) ? "UnDefined" : paramfromdeviceconfig.id } </Text>
       
        <Text style={styles.itemId}> SignalStrength: {(paramfromdeviceconfig.rssi === null) ? "UnDefined" : paramfromdeviceconfig.rssi } </Text>
        <Text style={styles.itemId}> SensoreName: {(paramfromdeviceconfig.name === null) ? "UnDefined" : paramfromdeviceconfig.name } </Text>
        <Text style={styles.itemId}> SensoreLocalName: {(paramfromdeviceconfig.localName === null) ? "UnDefined" : paramfromdeviceconfig.localName } </Text>

        <Text style={{fontSize: 15, color: "blue" }}> Characterstics: </Text>        
        {/* <Text style={styles.itemId}> Service UUId list1: {this.state.SuuidArr}</Text> */}


        <Text style={styles.itemId}> Service UUId list: 
      
        {
          
          (this.state.SuuidArr)?
          (this.state.SuuidArr.map(
            item => {
              <View key={item}>
                <Text style={{ textAlign: 'center', marginTop: 5 }} >{item}</Text>
              </View>
            }
          ))
          :
          null
       }
        
        
        </Text>

      </View>    
      
    <View style= {{borderStyle:"solid", borderColor:"white", borderBottomWidth: 1}} />     
  </View>
);
}
    render() {
      console.log("$$$ checking 11", this.props);
      return (
        <View>
        <View style ={{backgroundColor: 'skyblue', padding: 2}}>
          <FlatList data={this.state.BLDevices} renderItem={this.renderItem} />         
          </View> 
          </View>                    
          );
    }
  }

  const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'  
        
    },
  
    itemId: {
      color: "#ffffff",
      fontSize: 14,
     
    },
    textStyle: {
      color: 'white',
      fontSize: 20,
    },
    logTextStyle: {
      color: 'white',
      fontSize: 9,
    },
    buttonStyle: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      backgroundColor: '#af3c46',
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
    },
    disabledButtonStyle: {
      backgroundColor: '#614245',
      color: '#919191',
    },
  
  });  
  