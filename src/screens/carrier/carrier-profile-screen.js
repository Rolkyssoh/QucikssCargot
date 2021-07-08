import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { loggedOut } from '../../actions';
import UserProfileComponent from '../../components/user-profile-component';

const CarrierProfileScreen = (props) => {
    const [infosCurrentUser, setInfosCurrentUser] = useState()

    useEffect(() =>{ 
        let isCancelled = false;
        
        console.log('Dans le profile screen du carrier : ', props.currentUser)
        firestore()
            .collection('Users')
            .where("userPhoneNumber", "==", props.currentUser.phoneNumber)
            .where("isCarrier", "==", true)
            .get()  
            .then((response) => {
                console.log('infos du curren user(carrier): ', response._docs[0]._data)
                setInfosCurrentUser(response._docs[0]._data)
            })
            .catch((error) => { console.log('error while getting infos current user: ', error)})

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

const styles = StyleSheet.create({})

const mapStateToProps = (state) =>{
    return{
        currentUser: state.confirmationCode.currentUser
    }
}

export default connect(mapStateToProps, {loggedOut})(CarrierProfileScreen)