
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
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  TouchableNativeFeedback
  
} from 'react-native';


console.disableYellowBox = true;


export default class FullDetails extends React.Component {
    constructor(props) {      
      super(props);    
      console.log("$$$getting or not params", this.props.navigation.state.params);
      //this.BLDevices = [ ]
      this.state = {
        BLDevices: [],
         isConnected: false,
         paramfromdeviceconfig: this.props.navigation.state.params.item2,
         uuid: this.props.navigation.state.params.item3,
         services: this.props.navigation.state.params.services,
         Charuuid: this.props.navigation.state.params.descriptorsForServiceChar2
      };
  
      this.manager = new BleManager();    }

    render() {
      console.log("$$$ params", this.props.navigation.state.params);
      let paramfromdeviceconfig = this.state.paramfromdeviceconfig;
      return (
        <ScrollView>
        <View style={{marginLeft:12, marginRight:10}}>
          {/* <View style= {{borderStyle:"solid", borderColor:"black", borderBottomWidth: 1}} />  */}

            <View style ={{flex: 8}}>         
            <Text style={{ fontWeight: "bold", fontSize: 25, color: "#5e5e6b" }}> Device DATA </Text>
             <View style= {{borderStyle:"solid", borderColor:"#96969e" ,paddingBottom:5, borderBottomWidth: 1}} />  

              <Text style={{fontWeight: "bold", color: "#5e5e6b",fontSize: 17, paddingTop:5}}> 
              Connection Status </Text> 
              <Text  style={{color: "#5e5e6b",fontSize: 17}}>{this.state.isConnected ? "yes" : "no"}</Text>

              <Text style={styles.itemId}> SignalStrength </Text>
             <Text style={{color: "#5e5e6b",fontSize: 17, paddingBottom: 3}}> {(paramfromdeviceconfig.rssi === null) ? "UnDefined" : paramfromdeviceconfig.rssi } </Text>

              <Text style={styles.itemId}> SensoreName</Text> 
              <Text style={{color: "#5e5e6b",fontSize: 17, paddingBottom: 3}}>{(paramfromdeviceconfig.name === null) ? "UnDefined" : paramfromdeviceconfig.name } </Text>

              <Text style={styles.itemId}> SensoreLocalName</Text> 
              <Text style={{color: "#5e5e6b",fontSize: 17, paddingBottom: 3}}>{(paramfromdeviceconfig.localName === null) ? "UnDefined" : paramfromdeviceconfig.localName } </Text>

              <Text style={styles.itemId}> Service UUIds List </Text>
              {
                console.log("this.state.services: ", this.state.services)
              }
              {                
                this.state.services.map(
                  service => {
                    return(<Text key={service.uuid} style={{color: "#5e5e6b",fontSize: 15, paddingBottom: 3}}>{service.uuid}</Text>)
                  }
                )

              }

              <Text style={{
                color: "#5e5e6b", fontSize: 17, fontWeight: "bold", paddingTop:7
              }}> UUIds </Text> 
              <Text style={{color: "#5e5e6b",fontSize: 17, paddingBottom: 3}}>{(this.state.uuid === null) ? "UnDefined" : this.state.uuid }</Text>                             
              {/* <Text style={styles.itemId}> Service UUId list:             
              {                
                (this.state.SuuidArr)?
                (this.state.SuuidArr.map(
                  item => {
                    return (<View key={item}>
                      <Text style={{ textAlign: 'center', marginTop: 5 }}> {item}</Text>
                    </View>)
                  }
                ))
                :
                null
            }
              </Text> */}
              
              <Text style={{ fontWeight: "bold", fontSize: 25, color: "#5e5e6b", paddingBottom: 5, paddingTop: 7}}> Device Information </Text>
              <View style= {{borderStyle:"solid", borderColor:"black", borderBottomWidth: 1}} /> 
              <Text style={{
                  color: "#5e5e6b", fontSize: 17, fontWeight: "bold", paddingTop:7
              }}> Device Address </Text>
              <Text style={{color: "#5e5e6b",fontSize: 17, paddingBottom: 3}}>
              {(paramfromdeviceconfig.id === null) ? "UnDefined" : paramfromdeviceconfig.id } </Text>
              <Text style={{fontWeight: "bold", fontSize: 25, color: "#5e5e6b", paddingBottom: 5, paddingTop: 7}}>SERVICE AND CHARACTERSTICS DETAILS </Text>


              <View style= {{borderStyle:"solid", borderColor:"black", borderBottomWidth: 1}} />

              {/* <Text style={{color: "#5e5e6b",fontSize: 17, paddingBottom: 3, paddingTop: 5}}> Characterstics UUid </Text>>
              <Text>
              {this.state.Charuuid} 

               </Text>   */}


               <Text style={{
                color: "#5e5e6b", fontSize: 17, fontWeight: "bold", paddingTop:7
              }}>Characterstics UUIds </Text> 
              <Text style={{color: "#5e5e6b",fontSize: 17, paddingBottom: 3}}>{(this.state.Charuuid === null) ? "UnDefined" : this.state.Charuuid }</Text>  


            </View>    
            
          <View style= {{borderStyle:"solid", borderColor:"white", borderBottomWidth: 1}} />     
        </View>    
        </ScrollView>              
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
      color: "#5e5e6b",
      fontSize: 17,
      fontWeight: "bold",
      
     
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
  