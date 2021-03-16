import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import { Button } from 'react-native-elements';


const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.home_container}>
            <Text>Home Screen</Text>
            <Button 
                title="Go to" 
                type="outline"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    home_container: {
        backgroundColor: "white",
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
});

export default HomeScreen