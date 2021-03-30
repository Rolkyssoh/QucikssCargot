import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';

const CarInfosScreen = () => {
    return(
        <View style={styles.car_container}>
            <Text>Car Informations</Text>
            <View style={styles.view_input}>
                <Input 
                    placeholder="Matricule"
                />
                <Input 
                    placeholder="Marque"
                />
                <Input 
                    placeholder="Capacité"
                />
                <Input 
                    placeholder="Type"
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    car_container:{
        alignItems:'center'
    },
    view_input:{
        width:'100%',
        padding:40
    }
})

export default CarInfosScreen;