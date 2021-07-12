import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import CustomHeader from '../../../components/custom-header';
import CustomImagePicker from '../../../components/images-upload/custom-image-picker';
// import IconArrow from 'react-native-vector-icons/AntDesign'

const CarImageScreen = () => {
    return(
        <View style={{ flex:1 }}>  
            <CustomHeader customTitle="Devenir transporteur" />
            <CustomImagePicker carImage screenTitle="Image de votre voiture" /> 
            {/* <View><Text>testetet</Text></View> */}
        </View>
    )
}

const styles = StyleSheet.create({})

export default CarImageScreen 