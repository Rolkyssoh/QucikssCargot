import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

const CarrierInfosScreen = (props) => { 
    const [carrierInfos, setCarrierInfos] = useState()
    const [carrierPhoto, setCarrierPhoto] = useState('')
    const carrierProfileImage = carrierPhoto == '' ? '' : { uri: carrierPhoto }

    useEffect(() => {
        console.log('dansle carrierInfosscreen: ', props.route.params.idForCarrier)
        if(carrierPhoto!=''){
            console.log({carrierPhoto})
        }
        if(props.route.params) {
            firestore()
                .collection('Users')
                .doc(props.route.params.idForCarrier)
                .get()
                .then((response) => {
                    console.log('result gettint infos carrier: ', response._data)
                    setCarrierInfos(response._data)
                    if(response._data.photoURL){
                        downloadImage(response._data.photoURL)
                    }
                })
                .catch((error) => console.log('error getting infos carrier : ', error))
        }
    },[])

    const downloadImage = async (theRef) => {
        console.log('valeur de url photo profile : ')
        await storage()
            .ref(theRef)
            .getDownloadURL()
            .then(url => {
                console.log('conentu de url : ', url);
                setCarrierPhoto(url)
            })
            .catch(error => console.log('erreur de url : ', error));
    }

    return(
        <View style={styles.carrier_infos_container}>
            <View style={{ alignItems:'center'}}>
                <View style={{ height:90, width:90,  marginTop: 20, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
                    {   carrierPhoto !='' &&
                        <Image source={carrierProfileImage} style={{ height:90, width:90, borderRadius:50, }} />
                    }
                    {   carrierPhoto =='' &&
                        <Entypo name="user" size={65} color="#fff" />
                    }
                </View>

                { carrierInfos &&  <Text style={{fontFamily:'Nunito-Black'}}>{carrierInfos.username}</Text>}
            </View>
            {   carrierInfos &&
                <View>
                    <View style={{ flexDirection:'row'}}>
                        <Text style={styles.first_text_style}>Ville : </Text>
                        <Text style={styles.second_text_style}>{carrierInfos.userCity} </Text>
                    </View>
                    <View style={{ flexDirection:'row'}}>
                        <Text style={styles.first_text_style}>Marque du véhicule : </Text>
                        <Text style={styles.second_text_style}>Marque </Text>
                    </View>
                    <View style={{ flexDirection:'row'}}>
                        <Text style={styles.first_text_style}>Type de véhicule : </Text>
                        <Text style={styles.second_text_style}>Type </Text>
                    </View>
                    <View style={{ flexDirection:'row'}}>
                        <Text style={styles.first_text_style}>Capacité : </Text>
                        <Text style={styles.second_text_style}>Cap</Text>
                    </View>
                    <View style={{ flexDirection:'row'}}>
                        <Text style={styles.first_text_style}>Mission effectuée(s) : </Text>
                        <Text style={styles.second_text_style}>Mission</Text>
                    </View>
                    <View style={{ flexDirection:'row'}}>
                        <Text style={styles.first_text_style}>Note générale : </Text>
                        <Text style={styles.second_text_style}>Note </Text>
                    </View>
                    
                    
                    
                    
                    
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    carrier_infos_container:{
        flex:1,
        backgroundColor:'#d5dde0',
        // alignItems:'center'
        padding:15
    },
    first_text_style:{
        fontFamily:'Nunito-Black'
    },
    second_text_style:{
        fontFamily:'Nunito-Regular'
    }
})

export default CarrierInfosScreen