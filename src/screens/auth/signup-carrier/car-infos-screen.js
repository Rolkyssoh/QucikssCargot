import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { vehicleMatriculeChanged, vehicleMarkChanged, vehicleCapacityChanged, vehicleTypeChanged, createNewCarrier } from '../../../actions';
import CustomHeader from '../../../components/custom-header';
import IconArrow from 'react-native-vector-icons/AntDesign';

const CarInfosScreen = (props) => {

    const onMatriculeChange = (matricule) => {
        props.vehicleMatriculeChanged(matricule)
    }
    const onMarkChange = (mark) => {
        props.vehicleMarkChanged(mark)
    }
    const onTypeChange = (type) => {
        props.vehicleTypeChanged(type)
    }
    const onCapacityChange = (capacity) => {
        props.vehicleCapacityChanged(capacity)
    }

    const doSignup = () => {
        const { name, email, phone, city, matricule, mark, type, capacity, drivingPicture, carPicture} = props;
        props.createNewCarrier({ name, email, phone, city, matricule, mark, type, capacity, drivingPicture, carPicture })
    }

    return(
        <>
            <CustomHeader customTitle="Devenir transporteur" />
            <View style={styles.view_title_style}>
                <Text h4>Car Informations</Text>  
            </View>
            <View style={styles.car_container}> 
                <View style={styles.view_input}>
                    <Input 
                        placeholder="Matricule"
                        value={props.matricule}
                        onChangeText={onMatriculeChange}
                    />
                    <Input 
                        placeholder="Marque"
                        value={props.mark}
                        onChangeText={onMarkChange}
                    />
                    <Input 
                        placeholder="Type"
                        value={props.type}
                        onChangeText={onTypeChange}
                    />
                    <Input 
                        placeholder="Capacité"
                        value={props.capacity}
                        onChangeText={onCapacityChange}
                    />
                </View>
            </View>
            <View style={styles.view_button_style}>
                {
                    props.loading ? <ActivityIndicator size="large" color='green' />
                    : (
                        <Button 
                        title="Enregistrer"
                        type="outline"
                        onPress={doSignup} 
                    /> 
                    )
                }
                <IconArrow name="arrowright" size={30} />
            </View>
        </>
    )
};
 
const styles = StyleSheet.create({
    view_title_style:{
        alignItems:'center',
        marginVertical:40
    },
    car_container:{
        marginBottom:40
    },
    view_input:{
        // width:'100%',
        padding:40
    },
    view_button_style:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})

const mapStateToProps = (state) => {
    return {
        matricule: state.authCarrier.matricule,
        mark: state.authCarrier.mark,
        capacity: state.authCarrier.capacity,
        type: state.authCarrier.type,
        carPicture: state.authCarrier.carPicture,

        name: state.authCarrier.name,
        email: state.authCarrier.email,
        phone: state.authCarrier.phone,
        city: state.authCarrier.city,
        drivingPicture: state.authCarrier.drivingPicture,
        loading: state.authCarrier.loading,
    }
}

export default connect(
    mapStateToProps,
    {
        vehicleMatriculeChanged,
        vehicleMarkChanged,
        vehicleCapacityChanged,
        vehicleTypeChanged,
        createNewCarrier,
    })(CarInfosScreen);