import { DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const headerCustom = () => {
    <View>
        <Text>Test for element</Text>
    </View>
}

const CustomDrawerContent = (props) => {
    console.log('dans le custom drawer : ', props)
    return(
        <View >
            <View style={styles.user_infos}>
                <View style={styles.profile_picture}>
                    <Entypo name="user" size={45} color='#d6d5db' />
                </View>
                <View>
                    <Text h4>Nom</Text>
                </View>
            </View>
            <View>
                <Text>
                    Offres reçus
                </Text>
            </View>
            <DrawerItem 
                label="Vos Missions"
            />
            <DrawerItem 
                icon={() => <Ionicons name="settings" size={25} color='#b0b4bd'/>}
                label="Paramètres"
                onPress={() => props.navigation.navigate('Setting')}
            />
            <DrawerItem
                icon={() => <Ionicons name="help-circle" size={25} color='#b0b4bd'/>}
                label="Aide" 
            />
            <DrawerItem 
                label={headerCustom}
            />
            <View style={{ backgroundColor:'black',position:'absolute', bottom:0, alignItems:'center', width:'100%'}}>
                <Text style={{ color:'red'}}>Devenir un transporteur</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    user_infos:{
        // backgroundColor:'yellow',
        height:'40%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#dee1e3',

    },
    profile_picture:{
        backgroundColor:'#b0b4bd',
        height:60,
        width:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default CustomDrawerContent