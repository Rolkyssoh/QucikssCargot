import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { userIdChanged,authStateChanged } from '../actions';

const LoadingAuthScreen = (props) => {
    const [loading, setLoading] = useState(true)
 
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user)=>{
            if(user){ 
                props.userIdChanged(user._user.uid)
                props.authStateChanged(user._user)
                console.log('Dans le loading auth screen le user est:', user._user.uid)
                firestore()
                    .collection('Users')
                    .where("userPhoneNumber", "==", user._user.phoneNumber)
                    .get()
                    .then((response) =>{
                        setLoading(false)
                        console.log('verif de correspondence profil: ', response.docs[0]._data)
                        response.docs[0]._data.activated ?
                            response.docs[0]._data.isAdmin ?
                                props.navigation.navigate('AdminNav')
                                :response.docs[0]._data.isCarrier ?
                                    props.navigation.navigate('CarrierNav')
                                    : response.docs[0]._data.username =='' ? 
                                        props.navigation.navigate('AddInfos')
                                        :props.navigation.navigate('NavTab') 
                        : props.navigation.navigate('Awaiting')
                    })
            }
            if(!user){
                props.navigation.navigate('Login')
            }
        });
        return subscriber
    },[])

    return(
        <View style={styles.container_loading_screen}>
            { loading && <ActivityIndicator size="large" color='black' />}
        </View>
    )
}

const styles = StyleSheet.create({
    container_loading_screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#d5dde0'
    }
})

export default connect(null, { userIdChanged,authStateChanged })(LoadingAuthScreen)