import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

const CustomTouchable = ({iconName, libelle, inputValue}) => {
    return(
        <TouchableOpacity style={styles.touchableOpacity_style}>
            <View><Text>{iconName}</Text></View>
            <View style={styles.content_touchable_view}>
                <Text>{libelle}</Text>
                <Text>{inputValue}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchableOpacity_style:{
        flexDirection:'row',
        alignItems:'center',
    },
    content_touchable_view:{
        marginHorizontal:30
    },
})

export default CustomTouchable