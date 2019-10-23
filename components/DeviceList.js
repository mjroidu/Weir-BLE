import React, { Component } from 'react';
import { FlatList, Text }  from 'react-native';
import { ListItem } from './ListItem';

export default class DeviceList extends Component {
  constructor(props){
    super(props);       
    
  }

  
  

  render() {
    return (
      <FlatList
      data={[this.props.deviceList]}
      renderItem={({item}) => {
        console.log('Item da lista ' + item.name);
        return <ListItem deviceName={'texto'} />;}} 
    />
    )
  }
}