import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const MapScreen = () => {
    return(
        <View>
            <Text>Ici on met la carte en font et les boutons au dessus</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    map_container:{
        flex:1,
        alignItems:'center'
    }
})

export default MapScreen