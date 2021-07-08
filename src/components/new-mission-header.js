import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import { StyleSheet, View } from 'react-native';
import { Text, Image, Button } from 'react-native-elements';
import CustomButton from './custom-button';  
import * as CustomNavigation from './navigations/CustomNavigation';
import Entypo from 'react-native-vector-icons/Entypo';

const NewMissionHeader = ({ title, doNav }) => {
    // const [profilePicture, setProfilePicture] = useState('')
    const [userCurrent, setUserCurrent] = useState()

    useEffect(() => {
        console.log('Dans le header mission: ', auth().currentUser._user.phoneNumber)
        if(auth().currentUser){
            firestore()
                .collection('Users')
                .where("userPhoneNumber", "==", auth().currentUser._user.phoneNumber) 
                .get()
                .then((resp) => { 
                    console.log('response getting in new mission heaser : ', resp.docs[0]._data)
                    setUserCurrent(resp.docs[0]._data)
                })
                .catch((error) => { console.log('error while getting user current infos : ', error)})
        }
    },[])

    // const choisirImage = () => {
    //     console.log('choit de image');
    //     ImagePicker.openPicker({  
    //         compressImageQuality: 0.8,
    //         compressImageMaxWidth: 300,
    //         compressImageMaxHeight: 400,
    //         cropping: true
    //     }).then(image => {
    //         console.log('Dans le new mission header',  image)
    //         console.log(image.path)
    //         setProfilePicture(image.path)
    //     });
    // }

    return(
        <View style={styles.header_container}> 
            <View style={styles.buttons_view}>
                <Button 
                    title="Annuler"
                    type="clear"
                    onPress={doNav}
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                />
                <View style={styles.userinfos_view}> 
                    <View style={styles.avatar_view}>
                        {/* {   profilePicture === '' ? */}
                                <Entypo name="user" size={32} color="#fff" />
                        {/* //         : <Image source={{uri: profilePicture}} /> */}
                        {/* // } */}
                    </View>
                    {userCurrent && <Text style={{ fontFamily:'Nunito-Black' }}>{userCurrent.username}</Text>}
                </View>
                <Button 
                    title="Modifier"
                    type="clear"
                    onPress={() => CustomNavigation.customNavigate(
                        'Customer',{
                            screen:'Validée'
                        }
                    )}
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                />
            </View>
            <View>
                <Text style={{ fontFamily:'Nunito-Black', fontSize:22}}>{title}</Text>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    header_container:{
        alignItems:'center',
        justifyContent:'space-between',
        flex:1,
        padding:15
    },
    buttons_view:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    userinfos_view:{
        alignItems:'center'
    },
    avatar_view:{
        backgroundColor:'grey',
        height:45,
        width:45,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default NewMissionHeader