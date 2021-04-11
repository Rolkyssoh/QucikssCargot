import React from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import * as CustomNavigation from './navigations/CustomNavigation';

const MissionItem = () => { 

    return(
        <TouchableOpacity 
            style={styles.item_container}
            onPress={()=> CustomNavigation.customNavigate('Details') }
        >
            <View style={styles.item_image}>
                <Text>Image Item</Text>
            </View>
            <View style={styles.item_text}>
                <Text>destination : A vers B</Text>
                <Text>Heure départ : heure</Text>
                <Text>Type mission : type</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item_container:{
        // backgroundColor:'yellow',
        flexDirection:'row',
        width:'100%',
        justifyContent:'flex-start',
        marginVertical:10,
        borderColor:'black',
        borderWidth:0.3,
        shadowColor:'blue',
        // shadowOffset:{
        //     width:-10,
        //     height:10
        // },
        // shadowOpacity:0.6,
        // shadowRadius:8.68,
        elevation:8
    },
    item_image:{
        width:90,
        height:90,
        backgroundColor:'grey',
        // marginRight:5
    },
    item_text:{
        // backgroundColor:'blue',
        // height:90,
        flex:1,
        paddingHorizontal:15,
        // paddingVertical:10
        justifyContent:'center'
    }
})

export default MissionItem