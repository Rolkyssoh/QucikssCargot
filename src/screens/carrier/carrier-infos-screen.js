import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';

const CarrierInfosScreen = (props) => {
    const [carrierInfos, setCarrierInfos] = useState()

    useEffect(() => {
        console.log('dansle carrierInfosscreen: ', props.route.params.idForCarrier)
        if(props.route.params) {
            firestore()
                .collection('Users')
                .doc(props.route.params.idForCarrier)
                .get()
                .then((response) => {
                    console.log('result gettint infos carrier: ', response._data)
                    setCarrierInfos(response._data)
                })
                .catch((error) => console.log('error getting infos carrier : ', error))
        }
    },[])

    return(
        <View style={styles.carrier_infos_container}>
            <View style={{ alignItems:'center'}}>
                <Image 
                    style={{ height:90, width:90, borderRadius:50, marginTop: 20}}
                />
                { carrierInfos &&  <Text style={{fontFamily:'Nunito-Black'}}>{carrierInfos.username}</Text>}
            </View>
            {   carrierInfos &&
                <View>
                    <Text>Ville : {carrierInfos.userCity} </Text>
                    <Text>Marque du véhicule : </Text>
                    <Text>Type de véhicule : </Text>
                    <Text>Capacité : </Text>
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
    }
})

export default CarrierInfosScreen