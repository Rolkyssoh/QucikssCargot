import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {StyleSheet, View} from 'react-native';
import {Text, Image, Button} from 'react-native-elements';
import CustomButton from './custom-button';
import {useNavigation} from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo';

const NewMissionHeader = ({title, doNav}) => {
  const [userCurrent, setUserCurrent] = useState();
  const [userImage, setUserImage] = useState('');
  const userProfileImage = userImage == '' ? '' : {uri: userImage};

  const navigation = useNavigation();

  useEffect(() => {
    console.log(
      'Dans le header mission: ',
      auth().currentUser._user.phoneNumber,
    );
    if (auth().currentUser) {
      firestore()
        .collection('Users')
        .where('userPhoneNumber', '==', auth().currentUser._user.phoneNumber)
        .get()
        .then(resp => {
          console.log(
            'response getting in new mission heaser : ',
            resp.docs[0]._data,
          );
          setUserCurrent(resp.docs[0]._data);
          if (resp.docs[0]._data.photoURL) {
            downloadImage(resp.docs[0]._data.photoURL);
          }
        })
        .catch(error => {
          console.log('error while getting user current infos : ', error);
        });
    }
  }, []);

  const downloadImage = async theRef => {
    console.log('valeur de url photo profile : ');
    await storage()
      .ref(theRef)
      .getDownloadURL()
      .then(url => {
        console.log('conentu de url : ', url);
        setUserImage(url);
      })
      .catch(error => console.log('erreur de url : ', error));
  };

  return (
    <View style={styles.header_container}>
      <View style={styles.buttons_view}>
        <Button
          title="Annuler"
          type="clear"
          onPress={doNav}
          titleStyle={{color: '#42a3aa', fontFamily: 'Nunito-Black'}}
        />
        <View style={styles.userinfos_view}>
          <View style={styles.avatar_view}>
            {userProfileImage == '' ? (
              <Entypo name="user" size={32} color="black" />
            ) : (
              <Image
                source={userProfileImage}
                style={{height: 45, width: 45, borderRadius: 30}}
              />
            )}
          </View>
          {userCurrent && (
            <Text style={{fontFamily: 'Nunito-Black'}}>
              {userCurrent.username}
            </Text>
          )}
        </View>
        <Button
          title="Modifier"
          type="clear"
          onPress={() => navigation.navigate('customerMissions')}
          titleStyle={{color: '#42a3aa', fontFamily: 'Nunito-Black'}}
        />
      </View>
      <View>
        <Text style={{fontFamily: 'Nunito-Black', fontSize: 22}}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: 15,
  },
  buttons_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  userinfos_view: {
    alignItems: 'center',
  },
  avatar_view: {
    // backgroundColor:'grey',
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewMissionHeader;
