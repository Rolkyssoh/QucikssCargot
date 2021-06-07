import React, { useState } from 'react';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import CameraIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { drivingPictSelected,vehiclePictureChanged } from '../../actions';
import IconArrow from 'react-native-vector-icons/AntDesign'

const CustomImagePicker = ({ drivingLicense, carImage, screenTitle, drivingPictSelected,vehiclePictureChanged, drivingPicture, carPicture }) => {
    // const [drivingPict, setDrivingPict] = useState('')
    // const [carPict, setCarPict] = useState('')
    const getImage = drivingLicense ? drivingPicture =='' ? { uri: null } : { uri: drivingPicture } 
                    : carPicture =='' ? { uri: null} : { uri: carPicture}

    const doSelectDrivingPict = (picture) => {
        drivingPictSelected(picture)
    } 
    const doSelectCarPicture = (photo) => {
        vehiclePictureChanged(photo)
    } 

    const choisirImage = () => {
        console.log('choit de image');
        ImagePicker.openPicker({
            compressImageQuality: 0.8,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true
        }).then(image => {
            console.log(image)
            console.log(image.path)
            // this.setState({ photo: image.path });
            // this.onPhotoProfilChange.bind(this);
            if(drivingLicense){
                // setDrivingPict(image.path)
                doSelectDrivingPict(image.path)
            } else if(carImage) {
                // setCarPict(image.path)
                doSelectCarPicture(image.path)
            }
        });
    }

    return(
        <View style={styles.container_view}>
            <View style={styles.view_title_style}>
                <Text style={{fontFamily:'Nunito-Black', fontSize:22}}>{screenTitle}</Text>
            </View>
            <View style={styles.view_content_style}>
                <ImageBackground source={getImage} style={styles.image_background_style}>
                    <TouchableOpacity>
                        <CameraIcon onPress={choisirImage} name='camera-plus' size={30} color='#8dc9cb' />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={{ marginTop: 30, flexDirection:'row', justifyContent:'space-between'}}>
                <IconArrow name="arrowleft" size={30} color='#42a3aa' />
                { drivingLicense && <IconArrow name="arrowright" size={30} color='#42a3aa' /> }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_view:{
        flex:1,
        backgroundColor:'#fff',
        // justifyContent:'center',
        // alignItems:'center',
        padding:20
    },
    view_title_style:{
        alignItems:'center',
        marginTop:15,
        marginBottom:30
    },
    view_content_style:{
        backgroundColor:'#e3e2e7',
        height:'70%',
        width:'100%',
        borderRadius:30,
        // marginTop:60
    },
    image_background_style:{
        width:'100%', 
        height:'100%', 
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    }
})

const mapStateToProps = (state) => {
    return {
        drivingPicture: state.authCarrier.drivingPicture,
        carPicture: state.authCarrier.carPicture,
    }
}

export default connect(mapStateToProps, {drivingPictSelected, vehiclePictureChanged})(CustomImagePicker)