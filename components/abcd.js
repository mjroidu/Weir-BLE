import React, { Component } from 'react';

import { Device, BleManager, bleManager, Characteristic  } from 'react-native-ble-plx';

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
//import { Decipher } from 'crypto';

console.disableYellowBox = true;

export default class SampleSenConfig extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            manager: new BleManager() 
        }
        //this.manager = 
    }
    componentWillMount() {
        console.log("mounted")
        const subscription = this.state.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }

  scanAndConnect() 
    {
      this.state.manager.startDeviceScan(null, null, (error, device) => {
          console.log(device);   
          if (error) {
            console.log(error);
            //this.error(error.message);
            return
          }   
          if (device.name ==='Weir BLE') {
            this.state.manager.stopDeviceScan()
            console.log("Weir Ble GOT!!!");
            // this.state.manager.connectToDevice()

            device.connect()
            .then((connect) => {                
              console.log("Device connected details", connect);              
              
            device.isConnected()
              .then ((connect)=>{
                console.log("connected or not: ", connect);
             // this.discoverAllServiceChar(device);
              })
            })                
          }       
        });
    }     

//   discoverAllServiceChar(device)
//   {
//           device.discoverAllServicesAndCharacteristics(device.id)
//           .then ((connect1)=> {
//             console.log("Char and services", connect1);
          
//             device.services()
//             .then ((connect2)=> {
//               console.log("only services", connect2);
              
//               let SuuidArr = connect2.map(
//                 item => {
//                   return item.uuid;
//                 }
//               );
//               console.log("uuidArr: ", SuuidArr);   
              
//               device.characteristicsForService(item)
//               .then ((connect3)=> {
//                 console.log("only services", connect3);


//               })


//           })

//             .catch((error) => {               
//               console.log("charachterstics of services error here: ", error);
//             })
//           })                     
// }



// handleAppStateChange(nextAppState) {
//   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
//     console.log('App has come to the foreground!')
//     BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
//       console.log('Connected peripherals: ' + peripheralsArray.length);
//     });
//   }
//   this.setState({appState: nextAppState});
// }

                    
                    // SuuidArr.map(
                    //   item => {
                    //     device.characteristicsForService(item) //serviceUUID
                    //     .then((connect3, index)=> {
                    //       console.log("charachterstics of services: ", connect3);

                    //       let charUUID = connect3.map(
                    //         item => {
                    //           return item.uuid
                    //         }
                    //       );
                    //       console.log("charUUID: ", charUUID); 
                                   
                                  
                    //       device.descriptorsForService(SuuidArr, charUUID)
                    //       .then((connect4)=> {
                    //         console.log("Descriptors For Service: ", connect4);                                
                    // })

                  



                    // let charUUID = connect3.map(
                    //   item => {
                    //     return item.uuid
                    //   }
                    // );
                    // console.log("charUUID: ", charUUID); 


                    // device.descriptorsForService(SuuidArr, charUUID) //serviceUUID, characteristicUUID
                    // .then((connect4)=> {
                    //    console.log("Descriptors For Service: ", connect4);
                    // })              

                    // device.descriptorsForService(connect2[0].uuid, connect3[0].uuid) //serviceUUID, characteristicUUID
                    // .then((connect4)=> {
                    //   console.log("Descriptors For Service: ", connect4, connect4[0].id);


                      // device.readCharacteristicForService(connect2[0].uuid, connect3[0].uuid, connect4[0].id) //serviceUUID, characteristicUUID, transactionId
                      // .then((connect5)=> {
                      //   console.log("Read Characteristic For Service: ", connect5);


                      // })
                      // .catch((error) => {               
                      //   console.log("readCharacteristicForService error here!", error);
                      // })                    
                    
                  // })

                                       
            // .catch((error) => {               
            //     console.log("Weirerror", error);
            //   })

            //   .then((device) => {
            //     this.info(device.id);
            //     device.writeCharacteristicWithResponseForService('12ab', '34cd', 'aGVsbG8gbWlzcyB0YXBweQ==')
            //       .then((characteristic) => {
            //         this.info(characteristic.value);
            //         return 
            //       })
              
            //     })
             
    // send() 
    // {
    //     this.state.manager.writeCharacteristicWithResponseForDevice("14:B4:57:A4:A6:D9",
    //         this.device.serviceUUIDs[0],
    //         this.state.manager.characteristicsForDevice(this.device.id),
    //         "ok")
    //         .catch((error) => {
    //             console.log('error in writing data');
    //             console.log(error);
    //         })
    // }

    render() {
        console.log("$$$ checking 11", this.props);
        return (
          <View>
          <View style ={{backgroundColor: 'skyblue', padding: 2}}>
            <FlatList data={this.state.device}/>
            {/* <Button onPress={this.scanAndConnect} title={"CLICK!"}><Text style={{ color: "black", fontSize: 20 }}>Scan</Text></Button>  */}
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


