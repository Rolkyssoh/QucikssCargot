import React from 'react';
import { View, StyleSheet, TouchableOpacity }  from 'react-native';
import { Text } from 'react-native-elements'; 
import IconHome from 'react-native-vector-icons/AntDesign'

const TabHome = ({tab, icon, color, onPress}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon && <IconHome name={icon} size={20} color={color} />}
            <Text style={{color}}>{tab.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center', 
        padding:5,
    }
})

export default TabHome
