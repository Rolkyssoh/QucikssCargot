import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text,Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loggedOut } from '../actions';

const ProfileScreen = (props) => {

    useEffect(() =>{
        console.log('Dans le profile screen : ', props.currentUser)
    })

    const doLogOut = () => {
        props.loggedOut()
    }

    return(
        <View style={styles.profile_container}>
            <View style={styles.settin_view_style}>
                <Ionicons 
                    onPress={() => props.navigation.navigate('Setting')} 
                    name="settings-outline" 
                    size={25} 
                    color='#000'
                />
            </View>
            <View style={styles.username_view}>
                <Text h3>Prénom</Text>
            </View>
            <View style={styles.divide_view} />
            <View style={styles.phone_view}>
                <Text style={styles.text_style}>Phone number: {props.currentUser.phoneNumber}</Text>
                <Text>Aide</Text>
            </View>
            <View style={styles.divide_view} />
            <View style={styles.deconnexion_view}>
                <Text style={styles.text_style}>Evaluer l'application</Text>
                {/* <Text>Se déconnecter</Text> */}
                <Button 
                    title="Se déconnecter"
                    type="clear"
                    onPress={doLogOut}
                />
            </View>
            <View style={styles.divide_view} />
            <View style={styles.cgv_view}>
                <Text>Conditions générales</Text>
                <Text>Version de l'application </Text>
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
        marginBottom:15
    }

})

const mapStateToProps = (state) =>{
    return{
        currentUser: state.confirmationCode.currentUser
    }
}

export default connect(mapStateToProps,{loggedOut})(ProfileScreen)