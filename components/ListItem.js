import React from 'react';
import { View, Text } from 'react-native';

const ListItem = (props) => {  
    return (
      <View>
        <Text          
        >
          {props.deviceName}
        </Text>
      </View>     
    );  
};

export { ListItem };