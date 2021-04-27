import { connect } from 'react-redux';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { userNameChanged, userEmailChanged, userNumberChanged, userCityChanged } from '../../../actions'

const CarrierInfosScreen = (props) => {

    const onNameChange = (name) => {
        props.userNameChanged(name)
    }
    const onEmailChange = (email) => {
        props.userEmailChanged(email)
    }
    const onPhoneChange = (phone) => {
        props.userNumberChanged(phone)
    }
    const onCityChange = (city) => {
        props.userCityChanged(city)
    }

    return(
        <View style={styles.carrier_container}>
            <Text>Carrier Informations</Text>
            <View style={styles.input_view}>
                <Input
                    value={props.name}
                    // onChangeText={text=>setName(text)}
                    onChangeText={onNameChange}
                    placeholder="Nom"
                    leftIcon={
                        <FontAwesome name="user" size={20} />
                     }
                />
                 <Input 
                    value={props.email}
                    // onChangeText={text => setEmail(text)}
                    onChangeText={onEmailChange}
                    placeholder="Email"
                    leftIcon={
                        <MaterialCommunityIcons name="email" size={20} />
                    }
                />
                 <Input
                    value={props.phone}
                    onChangeText={onPhoneChange}
                    placeholder="Téléphone"
                    keyboardType="phone-pad"
                    leftIcon={
                        <FontAwesome name="phone" size={20} />
                     }
                />
                 <Input 
                    value={props.city}
                    onChangeText={onCityChange}
                    placeholder="Ville"
                    leftIcon={
                        <MaterialIcons name="place" size={20} />
                    }
                />
            </View>
            <Button 
                title="Valider"
                type="outline"
                // onPress={doSignup}
            />
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

const mapStateToProps = (state) => {
    return{
        name: state.authCarrier.name,
        email: state.authCarrier.email,
        phone: state.authCarrier.phone,
        city: state.authCarrier.city,
    }
}

export default connect(
    mapStateToProps, 
    {
        userNameChanged, 
        userEmailChanged,
        userNumberChanged,
        userCityChanged
    })(CarrierInfosScreen);