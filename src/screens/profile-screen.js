import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const ProfileScreen = () => {
    return(
        <View style={styles.profile_container}>
            <View style={styles.username_view}>
                <Text h3>Prénom</Text>
            </View>
            <View style={styles.divide_view} />
            <View style={styles.phone_view}>
                <Text style={styles.text_style}>Phone number</Text>
                <Text>Aide</Text>
            </View>
            <View style={styles.divide_view} />
            <View style={styles.deconnexion_view}>
                <Text style={styles.text_style}>Evaluer l'application</Text>
                <Text>Se déconnecter</Text>
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
        paddingTop:40
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
    },
    cgv_view:{
        padding:20,
        alignItems:'center'
    },
    text_style:{
        marginBottom:15
    }

})

export default ProfileScreen