import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';


const LoginScreen = ({navigation}) => {
    return(
        <View style={styles.login_container}>
            <Text>
                Login Screen
            </Text>
            <Button 
                title="To Home"
                type="outline"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    login_container:{
        flex:1,
        alignItems:'center'
    }
})

export default LoginScreen