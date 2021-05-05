import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import CustomTouchable from '../components/custom-touchable';

const SettingScreen = () => {
    return(
        <View style={styles.container_setting}>
            <View style={styles.title_view_style}>
                <Text>Profile</Text>
            </View>
            <View style={styles.profile_touchable_view_style}>
                <CustomTouchable iconName="icon" libelle="Nom" inputValue="input" />
                <CustomTouchable iconName="icon" libelle="Mobile" inputValue="input" />
                <CustomTouchable iconName="icon" libelle="Ton email" inputValue="input" />
                <CustomTouchable iconName="icon" libelle="Genre" inputValue="input" />
                <CustomTouchable iconName="icon" libelle="Date de naissance" inputValue="input" />
            </View>
            <View style={styles.title_view_style}>
                <Text>Général</Text>
            </View>
            <View style={styles.general_touchable_view_style}>
                <CustomTouchable iconName="icon" libelle="Langue" inputValue="input" />
                <CustomTouchable iconName="icon" libelle="Note App" inputValue="input" />
            </View>
            <View style={styles.last_view_style}>
                <Text>Termes et conditions</Text>
                <Text>App version...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_setting:{
        flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:20,
        borderColor:'red',
        borderWidth:2
    },
    title_view_style: {
        marginVertical:15,
        // flex:5,
    },
    profile_touchable_view_style:{
        height:300,
        justifyContent:'space-between',
        borderColor:'green',
        borderWidth:2
    },
    general_touchable_view_style:{
        height:110,
        justifyContent:'space-between',
        borderColor:'yellow',
        borderWidth:2
    },
    touchableOpacity_style:{
        flexDirection:'row',
        alignItems:'center',
    },
    content_touchable_view:{
        marginHorizontal:30
    },
    last_view_style:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    }
})

export default SettingScreen