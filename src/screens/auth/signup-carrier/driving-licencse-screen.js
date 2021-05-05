import React from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import Camera from 'react-native-vector-icons/MaterialCommunityIcons'

const DrivingLicenseScreen = () => {
    return(
        <View style={styles.container_view}>
            <Text>Prenez une image de votre permis de conduire</Text>
            <ImageBackground style={styles.view_content_style}>
                <TouchableOpacity>
                    <Camera name='camera-plus' size={30} color='#fff' />
                </TouchableOpacity>
            </ImageBackground>
            {/* <Text>DrivingLicenseScreen</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container_view:{
        flex:1,
        backgroundColor:'#fff',
        // justifyContent:'center',
        padding:20
    },
    view_content_style:{
        backgroundColor:'grey',
        height:'70%',
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default DrivingLicenseScreen