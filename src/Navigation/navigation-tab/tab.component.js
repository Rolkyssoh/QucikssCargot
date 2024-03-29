import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text} from 'react-native-elements';
import IconHome from 'react-native-vector-icons/AntDesign';

const TabHome = ({tab, icon, color, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icon && <IconHome name={icon} size={20} color={color} />}
      <Text style={{color, fontFamily: 'Nunito-Black'}}>{tab.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default TabHome;
