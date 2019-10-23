import React from 'react';
import DeviceConfig1 from '../components/DeviceConfig'
//import SensoreConfig1 from '../components/SensorConfig'
import SampleSenConfig from '../components/abcd'
import FullDetails from '../components/DeviceConfigFulldetails'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
    StyleSheet,
    NativeAppEventEmitter,
    Text, 
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    Button,
  } from 'react-native';

// class DetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Details ComigSoon!!!</Text>
//       </View>
//     );
//   }
// }


class DetailsScreen extends React.Component {
    render() {
      return (
        // < SensoreConfig1 />
        <SampleSenConfig />
      );
    }
  }
  

class SensorScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Click to explore SensorConfig "
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DeviceScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Click to explore Device Config"
          onPress={() => this.props.navigation.navigate('Details2')}
        />
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home:  { screen: SensorScreen, 
  navigationOptions :{
    activeColor: '#2febde',  
              inactiveColor: 'gray',  
              barStyle: { backgroundColor: '#1e2140' },
  }
  },
  Details: { screen: DetailsScreen },
  // navigationOptions: {
  //   headerTitle: 'FullDetails',
  // },
});

const SettingsStack = createStackNavigator({
  DeviceScreen: DeviceScreen,
  Details: DetailsScreen,
  Details2: DeviceConfig1,
  FullDetails: FullDetails
  
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      SensoreConfigs: HomeStack,
      DeviceConfigs: SettingsStack,
    },
    {
      /* Other configuration remains unchanged */
    }
  )
);

