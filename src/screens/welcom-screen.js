import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text,Button } from 'react-native-elements';

const WelcomeScreen = ({navigation}) => {
    return(
        <View style={styles.container_welcome}>
            <View><Text h3>Quickss</Text></View>
            <View><Text>Logo</Text></View>
            <View style={styles.view_text_style}>
                <Text style={styles.text_style}>Se déplacer en sécurité avec ses bagages</Text>
            </View>
            <Button 
                title="Commencer" 
                type="outline"
                onPress={() => navigation.navigate('Login')}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    container_welcome:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:30,
        paddingTop:66
    },
    view_text_style:{
        alignItems:'center',
    },
    text_style: {
        fontSize:20,
        fontWeight:'bold',
    }
})

export default WelcomeScreen