import { connect } from 'react-redux';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconArrow from 'react-native-vector-icons/AntDesign'

import { userNameChanged, userEmailChanged, userNumberChanged, userCityChanged } from '../../../actions'
import CustomHeader from '../../../components/custom-header';

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
        <>
            <CustomHeader customTitle="Devnir transporteur" />
            <View style={styles.title_view_style}>
                <Text h4>Carrier Informations</Text>
            </View>
            <View style={styles.carrier_container}>
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
            </View>
            <View style={styles.button_view_style}>
                <Button 
                    title="Annuler"
                    type="outline"
                    onPress={()=>props.navigation.navigate('Login')}
                />
                {/* <Button 
                    title="Valider"
                    type="outline"
                    // onPress={doSignup}
                /> */}
                <IconArrow name="arrowright" size={30} />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    title_view_style:{
        // flex:1
        alignItems:'center',
        marginVertical:40
    },
    carrier_container:{
        // alignItems:'center'
        marginBottom:40
    },
    input_view:{
        // width:'100%',
        padding:40
    },
    button_view_style:{
        // flex:1
        flexDirection:'row',
        justifyContent:'space-around'
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