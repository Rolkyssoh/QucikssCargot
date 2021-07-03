import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Dimensions } from 'react-native'; 
import { Text, Button, Image } from 'react-native-elements';
import CustomButton from '../../components/custom-button'; 
import CustomHeader from '../../components/custom-header';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CustomModalComponent from '../../components/custom-modal.component';

const MissionDetailComponent = ({navigation,route, idCurrentUser}) => {
    const [missionPictures, setMissionPictures] = useState()
    const [numberOfOffer, setNumberOfOffer] = useState(0)
    const [load, setLoad] = useState(false)

    useEffect(() => { 
        console.log('params recue: ', route.params) 
        console.log({idCurrentUser})
        
        const { id, docIdMission} = route.params
        if(id && docIdMission){
            getMissionImages(id, docIdMission)
        }
        // if(route.params.id){
        //     countMissionIsOffer(route.params.id)
        //     missionStartIsReady(route.params.id)
        // }
        // Came from deleted offer
        // if(idCurrentUser && idMission){
        //     countCarrierIsOffer(idCurrentUser, idMission)
        // }
        // Subscribe for the focus Listener
        const unsubscribe = navigation.addListener('focus', () => {
            // For carrier
            if(idCurrentUser && route.params.id){
                countCarrierIsOffer(idCurrentUser, route.params.id)
            }
            // For customer
            if(route.params.id && idCurrentUser){
                countMissionIsOffer(route.params.id, idCurrentUser)
                missionStartIsReady(route.params.id)
            }
        });
        return() => {
            unsubscribe;
        }
    },[navigation]) 

    const missionStartIsReady = (idMission) => {
        firestore()
            .collection('Mission')
            .doc(idMission)
            // .where('notified_customer', '==', true)
            .get()
            .then((result) => {
                console.log('nav to start screen!!', result._data)
                if(result._data.notified_customer){
                    navigation.navigate(
                        'StartMission',
                        { missionIdForStart: idMission }
                    )
                }
            })
            .catch((error) => console.log('error while nav to start screen!!!', error))
            
    }

    const countMissionIsOffer = (idMission, idCarrier) => {
        //Count carrier is offer
        console.log({idMission})
        firestore()
            .collection('Offer')
            .where('carrier_id', '==', `${idCarrier}`)
            .where('mission_id', '==', `${idMission}`)
            // .where('rejected', '==', false)
            .get()
            .then((resp) => { 
                console.log('Count mission is offer', resp.docs.length)
                setNumberOfOffer(resp.docs.length)
            })
            .catch((error) => console.log('error while counting carrier is offer: ', error))
    }

    const countCarrierIsOffer = (idCarrier, idMission) => {
        //Count carrier is offer
        firestore()
            .collection('Offer')
            .where('carrier_id', '==', `${idCarrier}`)
            .where('mission_id', '==', `${idMission}`) 
            .get()
            .then((resp) => { 
                console.log('Count carrier is offer', resp.docs.length)
                setNumberOfOffer(resp.docs.length)
            })
            .catch((error) => console.log('error while counting carrier is offer: ', error))
    }

    const getMissionImages = async (missionIdCollection, missionIdDoc) => {
        await firestore()
            .collection('Baggage')
            .doc('Mission')
            .collection(missionIdCollection)
            .doc(missionIdDoc)
            .collection('BaggagePicture')
            .get()
            .then((resp) => { 
                console.log('response getting Mission images: ', resp.docs)
                setMissionPictures(resp.docs)
            })
            .catch((error) => { console.log('error while getting Mission images : ', error)})
    }

    const doActivateMission = (missionId) => {
        console.log({missionId})
        setLoad(true)
        firestore()
            .collection('Mission')
            .doc(missionId)
            .update({
                activated:true
            })
            .then(()=> {
                console.log('Success activation mission')
                setLoad(false)
                navigation.navigate(
                    'AdminNav',
                    {
                        screen:'Validée' 
                    }
                )
            })
            .catch((error) => {
                console.log('error while activate mission', error)
                setLoad(false)
            })
    }

    const doRejectMission = (rejectMissionId) => {
        setLoad(true)
        firestore()
            .collection('Mission')
            .doc(rejectMissionId)
            .update({
                rejected:true
            })
            .then(()=> {
                console.log('Success rejection mission')
                setLoad(false)
                navigation.navigate(
                    'AdminNav',
                    {
                        screen:'Rejetée'
                    }
                )
            })
            .catch((error) => {
                console.log('error while reject mission', error)
                setLoad(false)
            })
    }

    const doDésactivation = (desactivateMissionId) => {
        firestore()
            .collection('Mission')
            .doc(desactivateMissionId)
            .update({
                desactivated:true
            })
            .then(()=> {
                console.log('Success désactivation mission')
                navigation.navigate(
                    'AdminNav',
                    {
                        screen:'Validée'
                    }
                )
            })
            .catch((error) => console.log('error while désactivate mission', error))
    }


    return(
        <View style={styles.container_details}> 
            <CustomHeader customTitle="Details" />
            {route.params.infosMission && 
                <View style={styles.slider_view}>
                    <View style={{ flex:3 }}> 
                        <SwiperFlatList autoplay autoplayDelay={15} autoplayLoop showPagination>
                          {
                            missionPictures && missionPictures.map((picture) => (
                                <View key={picture._data.imageUrl} style={[styles.child, { backgroundColor: 'tomato' }]}>
                                    <Image source={{ uri: picture._data.imageUrl}} style={{ height:'100%', width:'100%'}} />
                                </View>                            
                            ))
                            
                          }
                        </SwiperFlatList>
                    </View>
                    <View style={{ paddingHorizontal:10, flex:1, justifyContent:'center' }}>
                        { route.params.infosMission.mission_title && 
                            <Text style={{ fontSize:22, fontFamily:'Nunito-Black'}}>{route.params.infosMission.mission_title}</Text>
                        }
                    </View>
                </View>
            }
            {   route.params.infosMission && 
                <View style={styles.description_view}> 
                    <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                        <View style={{ flexDirection:'row'}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>Publiée le:</Text>
                            <Text style={{ fontFamily:'Nunito-Regular'}}> {route.params.infosMission.creation_day} </Text>
                        </View>
                        <View style={{ flexDirection:'row'}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>Heure : </Text> 
                            <Text style={{ fontFamily:'Nunito-Regular'}}> { route.params.infosMission.creation_hour} </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection:'row', justifyContent:'space-around', marginVertical:20}}>
                        <View style={{ flexDirection:'row'}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>Départ : </Text> 
                            <Text style={{ fontFamily:'Nunito-Regular'}}> {route.params.infosMission.depature_place} </Text>
                        </View>
                        <View style={{ flexDirection:'row'}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>Destination : </Text> 
                            <Text style={{ fontFamily:'Nunito-Regular'}}> { route.params.infosMission.mission_destination} </Text>
                        </View>
                    </View>
 
                    <View style={{ flexDirection:'row', justifyContent:'center'}}>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Type : </Text>
                        <Text>{ route.params.infosMission.mission_type}</Text>
                    </View>
                    
                    <View style={{ marginVertical:25}}>
                        <Text style={{ fontSize:22, fontFamily:'Nunito-Black'}}>Description</Text>
                        <Text style={{fontFamily:'Nunito-Regular'}}>{route.params.infosMission.mission_description}</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection:'row', justifyContent:'center'}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>Type de bagage : </Text>
                            {route.params.infosBaggage && <Text>{route.params.infosBaggage.baggage_type }</Text>}
                        </View>
                        <View style={{ flexDirection:'row', justifyContent:'center'}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>Vulume : </Text> 
                            {route.params.infosBaggage && <Text>{route.params.infosBaggage.baggage_volume}</Text>}
                        </View>
                        {/* { route.params.infosBaggage && <Text>Type de bagage : {route.params.infosBaggage.baggage_type } </Text>}
                        { route.params.infosBaggage && <Text>Vulume : {route.params.infosBaggage.baggage_volume} </Text>} */}
                    </View>
                </View> 
            }
            {/* For received offer(Customer) */}
            {   route.params.isCustomer && route.params.infosMission.activated!=false && 
                <Button 
                    title={`Proposition(s) reçue (${numberOfOffer})`} 
                    type="outline"
                    onPress={() => navigation.navigate(
                        'OfferReceived',
                        { 
                            idMission: route.params.id,
                            currentCustomerId: idCurrentUser 
                        }
                    )}
                    titleStyle={{ color:'black',fontFamily:'Nunito-Black', fontSize:20 }}
                    buttonStyle={{ borderColor:'#42a3aa'}}
                    containerStyle={styles.offer_button_style}
                />
            }
            {/* For offer send(Carrier) */}
            {   route.params.isCarrier && 
                <Button 
                    title={`Mon offre (${numberOfOffer})` } 
                    type="outline"
                    onPress={() => navigation.navigate(
                        'OfferReceived',
                        { 
                            idMission: route.params.id,
                            currentCarrierId: idCurrentUser
                        }
                    )}
                    titleStyle={{ color:'black',fontFamily:'Nunito-Black', fontSize:20 }}
                    buttonStyle={{ borderColor:'#42a3aa'}}
                    containerStyle={styles.offer_button_style}
                    disabled={!numberOfOffer}
                />
            }
                {/* For Admin */}
            {   route.params.isAdmin && route.params.fromWaiting &&
                <View style={styles.button_view}>
                    <Button 
                        title="Retour"
                        type="clear"
                        onPress={() =>navigation.goBack()} 
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    /> 
                    <Button 
                        title="Valider"
                        type="clear"
                        onPress={() => doActivateMission(route.params.id)}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                        loading={load}
                    /> 
                    <Button 
                        title="Rejeter"
                        type="clear"
                        onPress={() => doRejectMission(route.params.id)}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                        loading={load}
                        loadingStyle={{ color:'#42a3aa' }}
                    />
                </View>
            }
            {   route.params.isAdmin && route.params.fromValidate &&
                <View style={styles.button_view}>
                    <Button 
                        title="Retour"
                        type="clear"
                        onPress={() =>navigation.goBack()} 
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    /> 
                    <Button 
                        title="Désactiver"
                        type="clear"
                        customPress={() => doDésactivation(route.params.id)}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    />
                </View>
            }
                {   route.params.isAdmin && route.params.fromRejected &&
                    <View style={styles.button_view}>
                        <Button 
                            title="Retour"
                            type="clear"
                            onPress={() =>navigation.goBack()} 
                            titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                        />
                        {/* <Button 
                            title="Désactiver"
                            type="clear"
                            customPress={() => navigation.navigate('Rejection')}
                            titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                        /> */}
                    </View>
                }
                {/* For carrier */}  
            {   route.params.isCarrier &&
                <View style={styles.button_view}>
                    <Button  
                        title="Retour"
                        type="clear" 
                        onPress={() =>navigation.navigate("CarrierNav")}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    /> 
                    <CustomModalComponent 
                        pressableTitle="Interessé" 
                        isDisabled={numberOfOffer}
                        modalText="Entrez votre proposition"
                        missionId={route.params.id}
                        // docIdMission={route.params.docIdMission}
                        forProposition
                    />
                </View> 
            }
            {   route.params.isCustomer &&
                <View style={styles.button_view}>
                    <Button 
                        title="Retour"
                        type="clear"
                        onPress={() =>navigation.navigate("Customer")}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    /> 
                    <Button 
                        title="Modifier"
                        type="clear"
                        onPress={() => navigation.navigate(
                            'ManageMission',
                            {   
                                screen: 'Mission',
                                params: {
                                    missionId: route.params.id  
                                }
                                 
                            }
                        )}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    />
                    <CustomModalComponent 
                        pressableTitle="Supprimer" 
                        modalText="Voulez-vous vraiment supprimer cette mission?"
                        missionId={route.params.id}
                        docIdMission={route.params.docIdMission} 
                        forDelete
                    />
                </View>
            }
        </View>
    )
}

const { width } = Dimensions.get('window') 
const styles = StyleSheet.create({
    child: { 
        width, 
        // justifyContent: 'center',
        // alignItems:'center'
    },
    text: { fontSize: width * 0.5, textAlign: 'center' },
    container_details:{
        flex:1,
        backgroundColor:'#d5dde0',
    },
    slider_view:{
        flex:5,
    },
    description_view:{
        flex:5,
        paddingHorizontal:20
    },
    offer_button_style:{ 
        backgroundColor:'#42a3aa',  
        justifyContent:'center',
        opacity:0.4
        
    },
    button_view:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#d5dde0',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        borderColor:'#fff',
        borderTopWidth:1
    }
})

const mapStateToProps = (state) => {
    return {
        idCurrentUser: state.UpdateUserInfos.userId
    }
}

export default connect(mapStateToProps)(MissionDetailComponent)