import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'

const DisplayImage = () => {
    return(
        <View style={styles.display_image_container}>
            <TouchableOpacity>
                <Ionicons name="add-circle" size={50} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    display_image_container:{
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        marginHorizontal:15,
        marginVertical:10
    }
})

export default DisplayImage