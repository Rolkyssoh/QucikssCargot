import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import CustomButton from './custom-button';
import * as CustomNavigation from './navigations/CustomNavigation';
import Entypo from 'react-native-vector-icons/Entypo';

const NewMissionHeader = ({ title }) => { 
    return(
        <View style={styles.header_container}> 
            <View style={styles.buttons_view}>
                <CustomButton 
                    customTitle="Annuler"
                    customPress={() => CustomNavigation.customNavigate("Drawer")}
                />
                <View style={styles.userinfos_view}> 
                    <View style={styles.avatar_view}>
                        <Entypo name="user" size={32} color="#fff" />
                    </View>
                    <Text>username</Text>
                </View>
                <CustomButton 
                    customTitle="Modifier mission"
                />
            </View>
            <View>
                <Text h4>{title}</Text>
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