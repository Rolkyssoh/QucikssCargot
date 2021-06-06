import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text,Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loggedOut } from '../actions';

const UserProfileComponent = ({infosCurrentUser, doPress, disconnectUser}) => {

    // const doLogOut = () => {
    //     loggedOut()
    // }

    useEffect(() => {
        console.log('dans le userprofile component : ', infosCurrentUser)
    }, [])

    return(
        <View style={styles.profile_container}>
            <View style={styles.settin_view_style}>
                <Ionicons 
                    onPress={doPress} 
                    name="settings-outline" 
                    size={25} 
                    color='#000'
                />
            </View>
            <View style={styles.username_view}>
                { infosCurrentUser && 
                    <Text style={{ fontFamily:'Nunito-Black', fontSize:30 }}>
                        {infosCurrentUser.username}
                    </Text> 
                } 
            </View>
            <View style={styles.divide_view} /> 
            <View style={styles.phone_view}>
                <View style={{ flexDirection:'row'}}>
                    <Text style={styles.text_style}>
                        Phone number:
                    </Text>
                    <Text style={{ fontFamily:'Nunito-Regular'}}> {infosCurrentUser.userPhoneNumber}</Text>
                </View>
                <Text style={styles.text_style}>Aide</Text>
            </View>
            <View style={styles.divide_view} />
            <View style={styles.deconnexion_view}>
                <Text style={styles.text_style}>Evaluer l'application</Text>
                {/* <Text>Se déconnecter</Text> */}
                <Button  
                    title="Se déconnecter"
                    type="clear"
                    onPress={disconnectUser}
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    // onPress={()=>props.navigation.navigate('Customer')}
                />
            </View>
            <View style={styles.divide_view} />
            <View style={styles.cgv_view}>
                <Text style={{ fontFamily:'Nunito-Regular'}}>Conditions générales</Text>
                <Text style={{ fontFamily:'Nunito-Regular'}}>Version de l'application </Text>
            </View>

        </View>
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
        marginBottom:15,
        fontFamily:'Nunito-Black'
    }

})

const mapStateToProps = (state) =>{
    return{
        currentUser: state.confirmationCode.currentUser
    }
}

export default connect(mapStateToProps,{loggedOut})(UserProfileComponent)