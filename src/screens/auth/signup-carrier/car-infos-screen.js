import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { vehicleMatriculeChanged, vehicleMarkChanged, vehicleCapacityChanged, vehicleTypeChanged, createNewCarrier } from '../../../actions';

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
        const { name, email, phone, city, matricule, mark, type, capacity} = props;
        props.createNewCarrier({ name, email, phone, city, matricule, mark, type, capacity })
    }

    return(
        <View style={styles.car_container}>
            <Text>Car Informations</Text>
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
            <Button 
                title="Valider"
                type="outline"
                onPress={doSignup}
            />
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

const mapStateToProps = (state) => {
    return {
        matricule: state.authCarrier.matricule,
        mark: state.authCarrier.mark,
        capacity: state.authCarrier.capacity,
        type: state.authCarrier.type,

        name: state.authCarrier.name,
        email: state.authCarrier.email,
        phone: state.authCarrier.phone,
        city: state.authCarrier.city,
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