import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet } from 'react-native'; 
import { View } from 'react-native';
import { Text,Button } from 'react-native-elements';  
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loggedOut } from '../../actions';
import UserProfileComponent from '../../components/user-profile-component';

const ProfileScreen = (props) => {
    const [infosCurrentUser, setInfosCurrentUser] = useState()

    useEffect(() =>{
        let isCancelled = false;
        if(props.currentUser){ 
            firestore()
            .collection('Users')
            .where("userPhoneNumber", "==", props.currentUser.phoneNumber)
            .get()
            .then((response) => {
                console.log('infos du curren user: ', response._docs[0]._data)
                setInfosCurrentUser(response._docs[0]._data)
            })
            .catch((error) => { console.log('error while getting infos current user: ', error)})
        } else {
            props.navigation.navigate('Login')
        }
        return () => {
            isCancelled = true;
          };
    },[])

    const doLogOut = () => {
        props.loggedOut()
    }

    const goToSetting = () => {
        props.navigation.navigate('Setting')
    }
 
    return(
        <>
            {
                infosCurrentUser && 
                <UserProfileComponent 
                    infosCurrentUser={infosCurrentUser} 
                    doPress={goToSetting}
                    disconnectUser={doLogOut}
                />
            }
        </>
    )
}

const styles = StyleSheet.create({
    profile_container:{
        // paddingTop:40
        flex:1,
        backgroundColor:'#d5dde0'
    },
    settin_view_style:{
        // backgroundColor:'red',
        alignItems:'flex-end',
        padding:10
    },
    divide_view:{
        borderBottomColor:'grey',
        borderBottomWidth:1
    },
    username_view:{
        padding:20,
        justifyContent:'space-evenly'
    },
    phone_view:{
        padding:20,
    },
    deconnexion_view:{
        padding:20,
        // alignItems:'flex-start'
    },
    cgv_view:{
        padding:20,
        alignItems:'center'
    },
    text_style:{
        marginBottom:15
    }

})

const mapStateToProps = (state) =>{
    return{
        currentUser: state.confirmationCode.currentUser
    }
}

export default connect(mapStateToProps,{loggedOut})(ProfileScreen)