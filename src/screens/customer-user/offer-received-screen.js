import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import OfferReceivedItemComponent from '../../components/mission/offer-received-item.component';

const OfferReceivedScreen = (props) => {
    const [offerItems, setOfferItems] = useState()
    const [myOfferItems, setMyOfferItems] = useState()
    const [loadingIndicator, setLoadingIndicator] = useState(false)

    useEffect(() => {
        console.log('mission recu', props.route.params)
        const { idMission, currentCarrierId, currentCustomerId } = props.route.params

        // Get mission is offer
        if(idMission && currentCustomerId){
            setLoadingIndicator(true)
            firestore()
                .collection('Offer')
                // .where('validated', '==', false)
                .where('mission_id', '==', `${idMission}`)
                .where('rejected', '==', false)
                .get()
                .then((resp) => { 
                    console.log('get offer', resp.docs.length)
                    setLoadingIndicator(false)
                    setOfferItems(resp.docs)
                })
                .catch((error) => console.log('error while getting offer: ', error))
        }

        //Get carrier is offer
        if(currentCarrierId && idMission){
            setLoadingIndicator(true) 
            firestore()
                .collection('Offer')
                .where('carrier_id', '==', `${currentCarrierId}`)
                .where('mission_id', '==', `${idMission}`)
                .get()
                .then((resp) => { 
                    console.log('get carrier is offer', resp.docs)
                    setLoadingIndicator(false)
                    setMyOfferItems(resp.docs)
                })
                .catch((error) => console.log('error while getting carrier is offer: ', error))
        }
    },[])

    const previousScreen = () => {
        props.navigation.goBack()
    }

    return( 
        <ScrollView style={styles.container_offer_receiver}>
            {   offerItems && offerItems.length<=0 &&
                <View style={{ alignItems:'center', marginTop:'30%'}}>
                    <Text style={{ fontFamily:'Nunito-Black'}}> Aucune offre pour le moment! </Text>
                </View>
            }
            {/* {   offerItems && offerItems.length!=0 &&
                <View style={{ flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15, paddingTop:10}}>
                    <Text>Offres </Text>
                    <Text>Voir tout</Text>
                </View>
            } */}
            {   loadingIndicator && 
                <View style={{ marginTop:'80%'}}>
                    <ActivityIndicator size="large" color='#42a3aa' /> 
                </View>
            }
            {/* For customer */}
            {
                offerItems && offerItems.map((item) => {
                    return <OfferReceivedItemComponent key={item.id.toString()} infos={item} goback={previousScreen} />
                })
            }
            {/* For carrier */}
            {
                myOfferItems && myOfferItems.map((item) => {
                    return <OfferReceivedItemComponent key={item.id.toString()} myOfferInfos={item} />
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container_offer_receiver:{
        flex:1,
        backgroundColor:'#d5dde0',
    }
})

export default OfferReceivedScreen