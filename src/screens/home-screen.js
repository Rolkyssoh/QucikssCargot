import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import { Button } from 'react-native-elements';


const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.home_container}>
            <Text>Quickss</Text>
            <Text>Ici on affiche le choix entre camion et tricycle</Text>
            <Button 
                title="Go to Map" 
                type="outline"
                onPress={() => navigation.navigate('Map')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    home_container: {
        backgroundColor: "#dee1e3",
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
});

export default HomeScreen