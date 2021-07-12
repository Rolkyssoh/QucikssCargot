import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { StyleSheet } from 'react-native';
import { View, Image } from 'react-native';
import { Text,Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { loggedOut } from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
 
const UserProfileComponent = ({infosCurrentUser, doPress, disconnectUser, currentUser}) => {
    const [photo, setPhoto] = useState()
    const image = photo === "" ? <Ionicons name='user' size={20} color='red' /> : { uri: photo }

    useEffect(() => {
        console.log('dans le userprofile component : ', infosCurrentUser.photoURL)
        if(infosCurrentUser.photoURL){
            downloadImage(infosCurrentUser.photoURL)
        }
    }, [])

    const downloadImage = async (theRef) => {
        console.log('valeur de url photo profile : ')
        await storage()
            .ref(theRef)
            .getDownloadURL()
            .then(url => {
                console.log('conentu de url : ', url);
                setPhoto(url)
                // this.setState({ profileImage: url })
            })
            .catch(error => console.log('erreur de url : ', error));
    }

    const uploadImage = async (profilePhoto) => {
        console.log('dans le upload photo de profile!!!!', profilePhoto)
        const uri = profilePhoto;
        const filename = uri.substring(
            uri.lastIndexOf('/') + 1
        );
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

        const reference = `/photo_profile_carrier/${currentUser.uid}/` + filename

        const task = await storage()
            .ref(reference)
            .putFile(uploadUri)
            .then((datas) => {
                console.log('Photo uploadée', datas)
                if (profilePhoto != null) {
                    firestore()
                        .collection('Users')
                        .doc(currentUser.uid)
                        .update({
                            photoURL: reference,
                        })
                }
            })
            .catch((error) => {
                console.log('erreur lors de l\'upload : ', error);
            });
    };

    const imageChoice = () => {
        console.log('choit de image');
        ImagePicker.openPicker({
            // compressImageQuality: 0.8,
            // width: 300,
            // height: 400,
            // cropping: true,
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            cropping: true
        }).then(image => {
            console.log(image)
            console.log(image.path)
            // this.setState({ photo: image.path });
            setPhoto(image.path)
            // this.onPhotoProfilChange.bind(this);
            if(image.path){
                uploadImage(image.path)
            }
        });
    }

    return(
        <View style={styles.profile_container}>
            <View style={styles.settin_view_style}>
                <Ionicons  
                    // onPress={doPress} 
                    name="settings-outline" 
                    size={25} 
                    color='#000'
                />
            </View>

            <View style={{ alignSelf:'center', backgroundColor:'grey', width:70, height:70, borderRadius:35}}>
                <Image source={image} style={{ width:'100%', height:'100%', justifyContent:'center',alignItems:'center',borderRadius:35}} />
                <Icon style={{ position:'absolute', alignSelf:'center'}} onPress={() => imageChoice()} name='add-a-photo' size={20} color="#81f0d2" />
            </View>

            <View style={styles.username_view}>
                { infosCurrentUser && 
                    <Text style={{ fontFamily:'Nunito-Black', fontSize:30 }}>
                        {infosCurrentUser.username}
                    </Text> 
                } 
            </View>
            <View style={styles.divide_view} /> 
            <View style={styles.phone_view}>
                <View style={{ flexDirection:'row'}}>
                    <Text style={styles.text_style}>
                        Phone number:
                    </Text>
                    <Text style={{ fontFamily:'Nunito-Regular'}}> {infosCurrentUser.userPhoneNumber}</Text>
                </View>
                <Text style={styles.text_style}>Aide</Text>
            </View>
            <View style={styles.divide_view} />
            <View style={styles.deconnexion_view}>
                <Text style={styles.text_style}>Evaluer l'application</Text>
                {/* <Text>Se déconnecter</Text> */}
                <Button  
                    title="Se déconnecter"
                    type="clear"
                    onPress={disconnectUser}
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    // onPress={()=>props.navigation.navigate('Customer')}
                />
            </View>
            <View style={styles.divide_view} />
            <View style={styles.cgv_view}>
                <Text style={{ fontFamily:'Nunito-Regular'}}>Conditions générales</Text>
                <Text style={{ fontFamily:'Nunito-Regular'}}>Version de l'application </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    profile_container:{
        // paddingTop:40
        flex:1,
        backgroundColor:'#d5dde0'
    },
    settin_view_style:{
        // backgroundColor:'red',
        alignItems:'flex-end',
        padding:10
    },
    divide_view:{
        borderBottomColor:'grey',
        borderBottomWidth:1
    },
    username_view:{
        padding:20,
        justifyContent:'space-evenly'
    },
    phone_view:{
        padding:20,
    },
    deconnexion_view:{
        padding:20,
        // alignItems:'flex-start'
    },
    cgv_view:{
        padding:20,
        alignItems:'center'
    },
    text_style:{
        marginBottom:15,
        fontFamily:'Nunito-Black'
    }

})

const mapStateToProps = (state) =>{
    return{
        currentUser: state.confirmationCode.currentUser
    }
}

export default connect(mapStateToProps,{loggedOut})(UserProfileComponent)