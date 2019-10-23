
import { createAppContainer } from 'react-navigation'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import FontIcons from 'react-native-vector-icons/Foundation'; 
import Ladybug1 from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { createStackNavigator } from 'react-navigation-stack';

//import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createStackNavigator } from 'react-navigation-stack';

import Dname from 'react-native-vector-icons/MaterialIcons';
//import { BluetoothStatus } from "react-native-bluetooth-status";

//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';   
import React, { Component } from 'react';
import { Device, BleManager, Characteristic  } from 'react-native-ble-plx';


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
      Characteristic: [],
      descriptorsForServiceChar1: [],
      isConnected: false,
      teststate: "test state 1212121",
      services: []
    };
    this.manager = new BleManager();
    this.scanAndConnect();
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
      //||'Pump-02A2'
        if(device.name==='Weir BLE') 
        {
          console.log("Weir Ble GOT!!!");
          
          device.isConnected()
          .then ((connect)=> {
            console.log("connected or not: ", connect);
            this.setState({isConnected: true}); 
            if (!connect){
                device.connect()
                .then((connect) => {                
                  console.log("Device connected details", connect);
                  this.manager.stopDeviceScan();
                 this.discoverAllServiceChar(device);                                 
                });
            }

          });        
        }
      });        
    }

     discoverAllServiceChar(device)
    { 
      let clickedItem = device;
      //console.log("connected or not123456: ", clickedItem);
      if(clickedItem == null) return;
      console.log("clickedItem: ", clickedItem)


      clickedItem.discoverAllServicesAndCharacteristics(clickedItem.id)
      .then ((connect1)=> {
        console.log("Char and services", connect1);
      
        clickedItem.services()
        .then ((connect2)=> {
          this.setState({services: connect2});
          console.log("only services", connect2);
          
          let SuuidArr = connect2.map(
            item => {
              return item.uuid;
            }
          );
          console.log("uuidArr1: ", SuuidArr);    
          
          
          //this.setState({SuuidArr});     
          //console.log("uuidArr22: ", SuuidArr);        
        //   let charuuid = SuuidArr;
        //   {
        //   (charuuid) ?
        //   (charuuid = SuuidArr.map(
        //     item => {
        //       return item.uuid;
        //     }
  
        //   ))
        //   :
        //   null
        // }  


          device.characteristicsForService(connect2[0].uuid) //service uuid
          .then((connect4)=> {
            console.log("characteristicsForService: ",connect4)
            this.setState({Characteristic:connect4});
         

          device.descriptorsForService(connect2[0].uuid, connect4[0].uuid) //serviceUUID: UUID, characteristicUUID: UUID
          .then((descriptorsForService)=> {
            console.log("descriptorsForService: ",descriptorsForService)
            this.setState({descriptorsForServiceChar1:descriptorsForService})

            // this.setState({Characteristic:connect4});

          }) 

        }) 
          
      })
         .catch((error) => {               
         console.log("charachterstics of services error here: ", error);
        })
    })    
    devivice.cancelConnection()
        .then((cancelConnection)=> {
          console.log("cancelConnection here: ",cancelConnection)
      })                 
    }


    //   if (device.name ==='Weir BLE') {
    //       this.manager.stopDeviceScan()
    //       console.log("Weir Ble GOT!!!");    
      
    //   device.connect()
    //   .then((connect) => {                
    //     console.log("Device connected details", connect);  
      

    //   device.isConnected()
    //   .then ((connect)=>{  
                        
    //     console.log("connected or not: ", connect);
    //     this.setState({isConnected: true}); 
    // //     this.discoverAllServiceChar(device);
    //   })
    //   })     
    // }
  

UNSAFE_componentWillMount()  {
      const subscription = this.manager.onStateChange(state => {
        if (state === "PoweredOn") {
          this.scanAndConnect();
          subscription.remove();
        }
      }, true);
    }

    async requestBlePermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
              title: 'Ble Permission',
              message:
                'needs access to your Bleu ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the Ble');
          } else {
            console.log('Blue permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
   
  renderItem = (item) => {
      console.log("CharacteristicCharacteristicCharacteristicCharacteristic: ", this.state);
      // const { navigate } = this.props.navigation;
      return (
       <View >
  
  {/* <TouchableNativeFeedback>     */}
       <View  
       elevation ={30}
       style = {{padding: 10, 
        backgroundColor:"steelblue", 
        margin:10, 
        width: 320, 
        height: 170, 
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,                
        }}>
  <TouchableOpacity 
  title="More Details!!"
  onPress={
    () => {
      console.log("onpress passing data here", this.state)
      this.props.navigation.navigate('FullDetails', 
      {item2:item.item, 
        item3:this.state.Characteristic[0].uuid, 
        services: this.state.services,
        descriptorsForServiceChar2: this.state.descriptorsForServiceChar1[0].characteristicUUID

      })
    }    
    }>
                    
          <View style ={{flexDirection:"row",  justifyContent: 'center', alignItems:"center"}}>                          
          <Text style={{ color: "#ffffff", fontSize: 14, color: "white" }}> Touch Me<Ladybug1 style={{paddingRight: 2, color: "#35e841"}}  name = "ladybug" size={25} />To Explore More!!!</Text>
          </View>
          </TouchableOpacity>
  
          <View style= {{borderStyle:"solid", borderColor:"white", borderBottomWidth: 1}}>
  </View>



          <View style ={{flex: 1, flexDirection:"row", alignItems: "center"}}>
              <View style ={{flex: 1}}>
                <FontIcons style={{paddingRight: 5, color: "#2febde"}}  name = "mobile-signal" size={25} />
              </View>
              <View style ={{flex: 8}}>
                <Text style={styles.itemId}> SensoreID: {(item.item.id === null) ? "UnDefined" : item.item.id}</Text>
              </View>
          </View>

  
          <View style ={{flex: 1, flexDirection:"row", alignItems: "center"}}>
          <View style ={{flex: 1}}>
            <Icon  style={{paddingRight: 5, color: "#2febde"}} name = "logo-rss" size={25} />
            </View>
            <View style ={{flex: 8}}>
            <Text style={{ color: "#ffffff", fontSize: 14, }}> SignalStrength: {(item.item.rssi === null) ? "UnDefined" : item.item.rssi}</Text>
            </View>
          </View>
  
          <View style ={{flex: 1, flexDirection:"row", alignItems: "center"}}>
          <View style ={{flex: 1}}>
             <Dname style={{paddingRight: 5, color: "#2febde"}} name = "devices-other" size={25} />
             </View>
             <View style ={{flex: 8}}>
              <Text style={{ color: "#ffffff", fontSize: 14}}> SensoreName: {(item.item.name === null) ? "UnDefined" : item.item.name }</Text>
              </View>
          </View>
            
          <View style ={{flex: 1, flexDirection:"row", alignItems: "center"}}>
          <View style ={{flex: 1}}>
              <Dname style={{paddingRight: 5, color: "#2febde"}} name = "local-laundry-service" size={25} />
              </View>
              <View style ={{flex: 8}}>
              <Text style={{ color: "#ffffff", fontSize: 14}}> SensoreLocalName: {(item.item.localName === null) ? "UnDefined" : item.item.localName}</Text>
              </View>
          </View> 
                    
  
        </View>
        {/* </TouchableNativeFeedback> */}
        </View>
        
        
      );
    }

    render() {
      //console.log("$$$ checking 11", this.props);
      
      return (
        <View>
        <View style ={{backgroundColor: 'skyblue', padding: 2}}>
          <FlatList  data={this.state.BLDevices}  renderItem={this.renderItem} />
          {/* <Button onPress={this.scanAndConnect} title={"CLICK!"}><Text style={{ color: "black", fontSize: 20 }}>Scan</Text></Button>  */}
          </View> 
          </View>          
          
          
          );
    }
  }
  // renderItem={this.renderItem}


  



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
  