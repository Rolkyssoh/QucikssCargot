import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { StyleSheet, View, TouchableOpacity,ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baggageImage1Changed, baggageImage2Changed, baggageImage3Changed, baggageImage4Changed} from '../actions';

const DisplayImage = (props) => {
    // var getImage = ''
    // const getImage = props.imgOne ? {uri: props.baggageImage1 } : { uri: props.baggageImage2 }
    // const getImage3 = props.img2 ? { uri: props.baggageImage3 } : { uri: props.baggageImage4 }
    
    // useEffect(() => {
    //     imageToDisplay()
    // })

    const imageToDisplay = () => {
        if(props.imgOne){
            if(props.baggageImage1 == ''){
                return  {uri: null } 
            } else {
                return  {uri: props.baggageImage1} 
            }
        } else if(props.img2) {
            if(props.baggageImage2 == ''){
                return  {uri: null } 
            } else {
                return  {uri: props.baggageImage2}
            }
        } else if(props.img3) {
            if(props.baggageImage3 == ''){
                return  {uri: null } 
            } else {
                console.log('baggaeImage3 : ', props.baggageImage3 )
                return  {uri: props.baggageImage3}
            }
        } else if(props.img4) {
            if(props.baggageImage4 == ''){
                return  {uri: null } 
            } else {
                return  {uri: props.baggageImage4}
            }
        }
    }

    const doSelectImage1 = (baggageImage1) => {
        props.baggageImage1Changed(baggageImage1)
    }
    const doSelectImage2 = (baggageImage2) => {
        props.baggageImage2Changed(baggageImage2)
    }
    const doSelectImage3 = (baggageImage3) => {
        props.baggageImage3Changed(baggageImage3)
    }
    const doSelectImage4 = (baggageImage4) => {
        props.baggageImage4Changed(baggageImage4)
    }

    const uploadImage = () => {
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
            if(props.imgOne){
                // setDrivingPict(image.path)
                doSelectImage1(image.path)
            } else if(props.img2) {
                // setCarPict(image.path)
                doSelectImage2(image.path)
            } else if(props.img3){
                doSelectImage3(image.path)
            } else if(props.img4){
                doSelectImage4(image.path)
            }
        });
    }

    return(
        <View style={styles.display_image_container}>
            <ImageBackground source={imageToDisplay()} style={{ width:'100%', height:'100%',justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity>
                    <Ionicons onPress={uploadImage} name="add-circle" size={50} />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
} 

const styles = StyleSheet.create({
    display_image_container:{
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        marginHorizontal:15,
        marginVertical:10
    }
})

const mapStateToProps = (state) => {
    return{
        baggageImage1: state.NewMission.baggageImage1,
        baggageImage2: state.NewMission.baggageImage2,
        baggageImage3: state.NewMission.baggageImage3,
        baggageImage4: state.NewMission.baggageImage4
    }
}

export default connect(
    mapStateToProps, 
    {
        baggageImage1Changed,
        baggageImage2Changed,
        baggageImage3Changed,
        baggageImage4Changed,
    }
    )(DisplayImage)