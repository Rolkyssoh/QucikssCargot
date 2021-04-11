import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

const CustomHeader = ({customTitle}) => {
    return(
        <View style={styles.custom_header_container}>
            <Text h3>{customTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    custom_header_container:{
        alignItems:'center',
        backgroundColor:'#6e8a8e',
        justifyContent:'center',
        height:60
    }
})

export default CustomHeader