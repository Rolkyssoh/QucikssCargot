import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import CameraIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker'; 
import CustomImagePicker from '../../../components/images-upload/custom-image-picker';
import CustomHeader from '../../../components/custom-header';
// import IconArrow from 'react-native-vector-icons/AntDesign'

const DrivingLicenseScreen = () => {

    const uploadImage = async () => {
        console.log('dans le upload photo de profile!!!!', this.state.photo)
        const uri = this.state.photo;
        const filename = uri.substring(
            uri.lastIndexOf('/') + 1
        );
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        // create bucket storage reference to not yet existing image
        // const reference = firebase.storage().ref('photo_profile');
        const reference = `/photo_profile/${this.props.navigation.getParam('userId')}/` + filename

        const task = storage()
            .ref(reference)
            .putFile(uploadUri)
            .then((datas) => {
                console.log('Photo uploadée', datas)
                //Insertion de l'url dans firestore
                if (this.state.photo != null) {
                    firestore()
                        .collection('Users')
                        .doc(this.props.navigation.getParam('userId'))
                        .update({
                            photoURL: reference,
                        })
                }
            })
            .catch((error) => {
                console.log('erreur lors de l\'upload : ', error);
            });
    };

    return(
        <View style={{ flex:1 }}>
            <CustomHeader customTitle="Devenir transporteur" />
            <CustomImagePicker drivingLicense screenTitle="Image de votre permis de conduire" />
        </View>
    )
} 

const styles = StyleSheet.create({ 
})

export default DrivingLicenseScreen