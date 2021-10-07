import React from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {Text, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';

const Medium = ({name}) => {
  const navigation = useNavigation();

  const doNavigation = givenParam => {
    navigation.navigate('newMission', {
      screen: 'Mission',
      params: {moyen: `${givenParam}`},
    });
  };

  return (
    <View style={styles.medium_container}>
      {name == 'Camionnette' && (
        <Pressable onPress={() => doNavigation('camionnette')}>
          <Image
            source={require('../../assets/images/ptit_camion.png')}
            style={styles.image_style}
          />
        </Pressable>
      )}
      {name == 'Tricycle' && (
        <Pressable onPress={() => doNavigation('tricycle')}>
          <Image
            source={require('../../assets/images/tricycle.png')}
            style={styles.image_style}
          />
        </Pressable>
      )}
      <Text style={{fontFamily: 'Nunito-Black'}}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  medium_container: {
    height: 150,
    width: 150,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 15,
    borderRadius: 20,
  },
  image_style: {
    height: 100,
    width: 130,
    // backgroundColor:'#e3e2e7'
  },
});

export default Medium;
