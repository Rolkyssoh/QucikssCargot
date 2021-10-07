import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

const SwitchTab = ({tabSlip, onPress, indx}) => {
  console.log('dans le switch tab: ', indx);
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{tabSlip.name}</Text>
    </TouchableOpacity>
    // <TouchableOpacity onPress={onPress}>
    //     <Text>{tabSlip.name}</Text>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container_opacity: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '80%',
    backgroundColor: 'red',
  },
});

export default SwitchTab;
