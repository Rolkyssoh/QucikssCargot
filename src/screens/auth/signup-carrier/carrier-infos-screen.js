import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CarrierInfosScreen = () => {
    return(
        <View style={styles.carrier_container}>
            <Text>Carrier Informations</Text>
            <View style={styles.input_view}>
                <Input 
                    placeholder="Nom"
                    leftIcon={
                        <FontAwesome name="user" size={20} />
                     }
                />
                 <Input 
                    placeholder="Email"
                    leftIcon={
                        <MaterialCommunityIcons name="email" size={20} />
                    }
                />
                 <Input 
                    placeholder="Téléphone"
                    keyboardType="phone-pad"
                    leftIcon={
                        <FontAwesome name="phone" size={20} />
                     }
                />
                 <Input 
                    placeholder="Ville"
                    leftIcon={
                        <MaterialIcons name="place" size={20} />
                    }
                />
            </View>
            {/* <Button 
                title="Car infos"
                type="outline"
                // onPress={() => navigation.push('CarInfos')}
            /> */}
        </View>
    )
};

const styles = StyleSheet.create({
    carrier_container:{
        alignItems:'center'
    },
    input_view:{
        width:'100%',
        padding:40
    }
})

export default CarrierInfosScreen;