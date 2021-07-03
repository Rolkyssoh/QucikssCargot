import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AwaitingScreen = () => {
    return(
        <View style={styles.awaiting_container}>
            <Text style={{ fontFamily:"Nunito-Black", marginBottom:10}}>Compte en attente de validation!</Text>
            <FontAwesome name="hourglass-2" size={40} color='#42a3aa'/>
        </View>
    )
}

const styles = StyleSheet.create({
    awaiting_container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#d5dde0', 
    }
})

export default AwaitingScreen