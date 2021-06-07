import { connect } from 'react-redux';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconArrow from 'react-native-vector-icons/AntDesign'

import { 
    userNameChanged, 
    userEmailChanged, 
    userNumberChanged, 
    userCityChanged,

    drivingPictSelected, 
    vehiclePictureChanged,

    vehicleMatriculeChanged,
    vehicleMarkChanged,
    vehicleCapacityChanged,
    vehicleTypeChanged, } from '../../../actions'
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

    const leaveSignupCarrierScreen = () => {
        props.userNameChanged('') 
        props.userEmailChanged('')
        props.userNumberChanged('')
        props.userCityChanged('')

        props.drivingPictSelected('')
        props.vehiclePictureChanged('')

        props.vehicleMatriculeChanged('')
        props.vehicleMarkChanged('')
        props.vehicleCapacityChanged('')
        props.vehicleTypeChanged('')
        
        props.navigation.navigate('Login')
    }

    return(
        <>
            <CustomHeader customTitle="Devnir transporteur" />
            <View style={styles.title_view_style}>
                <Text style={{ fontSize:22, fontFamily:'Nunito-Black'}}>Infos du transporteur</Text>
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
                         inputStyle={styles.inputs_styles}
                    /> 
                     <Input 
                        value={props.email}
                        // onChangeText={text => setEmail(text)}
                        onChangeText={onEmailChange}
                        placeholder="Email"
                        leftIcon={
                            <MaterialCommunityIcons name="email" size={20} />
                        }
                        inputStyle={styles.inputs_styles}
                    />
                     <Input
                        value={props.phone}
                        onChangeText={onPhoneChange}
                        placeholder="Téléphone"
                        keyboardType="phone-pad"
                        leftIcon={
                            <FontAwesome name="phone" size={20} />
                         }
                         inputStyle={styles.inputs_styles}
                    />
                     <Input 
                        value={props.city}
                        onChangeText={onCityChange}
                        placeholder="Ville"
                        leftIcon={
                            <MaterialIcons name="place" size={20} />
                        }
                        inputStyle={styles.inputs_styles}
                    />
                </View>
            </View>
            <View style={styles.button_view_style}>
                <Button 
                    title="Annuler"
                    type="outline"
                    onPress={leaveSignupCarrierScreen}
                    titleStyle={{ color:'#42a3aa',fontFamily:'Nunito-Black'}}
                    buttonStyle={{ borderRadius:20, borderColor:'#42a3aa',}}
                />
                <IconArrow name="arrowright" size={30} color='#42a3aa' /> 
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
    inputs_styles:{
        fontFamily:'Nunito-Regular'
    },
    button_view_style:{
        // flex:1
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
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
        userCityChanged,

        drivingPictSelected, 
        vehiclePictureChanged,

        vehicleMatriculeChanged,
        vehicleMarkChanged,
        vehicleCapacityChanged,
        vehicleTypeChanged,
    })(CarrierInfosScreen);