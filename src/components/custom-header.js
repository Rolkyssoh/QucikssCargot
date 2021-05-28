import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
  
const CustomHeader = ({customTitle}) => {
    return(
        <View style={styles.custom_header_container}>
            <Text style={{ color:'#42a3aa'}} h3>{customTitle}</Text>
            {/* <View style={{ borderBottomColor:'gray', borderBottomWidth:1}} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    custom_header_container:{
        alignItems:'center',
        // backgroundColor:'#42a3aa',
        justifyContent:'center',
        height:60
    }
})

export default CustomHeader