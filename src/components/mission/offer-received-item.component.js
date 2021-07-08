import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import FontAwesomeCheck from 'react-native-vector-icons/FontAwesome'
import CustomModalComponent from '../custom-modal.component';
import { customNavigate } from '../navigations/CustomNavigation';
import Entypo from 'react-native-vector-icons/Entypo';

const OfferReceivedItemComponent = (props) => {
    const [offerInfos, setOfferInfos] = useState()
    const [infosMyOffer, setInfosMyOffer] = useState()
    const [offerSenderInfos, setOfferSenderInfos] = useState()
    const [infosMission, setInfosMission] = useState()
    const [isConfirm, setIsConfirm] = useState(false)
    const [missionIsOff, setMissionIsOff] = useState(false)
    const [startInfos, setStartInfos] = useState('')
    const [isStarted, setIsStarted] = useState(false)
    const [idForCarrier, setIdForCarrier] = useState('')
    const [carrierPicture, setCarrierPicture] = useState('')
    const carrierImage = carrierPicture == '' ? '' : { uri: carrierPicture }

    useEffect(() => {
        if(props.infos){
            console.log('dand le item offer: ', props.infos)
            setIdForCarrier(props.infos._data.carrier_id)
            setOfferInfos(props.infos)
            setIsConfirm(props.infos._data.validated)
            if(isConfirm == false){
                setMissionIsOff(true)
            }

            firestore()
                .collection('Users')
                .doc(props.infos._data.carrier_id)
                .get()
                .then((result) => { 
                    console.log('getting user who send offer:' , result)
                    if(result._data.photoURL){
                        downloadImage(result._data.photoURL)
                    }
                    setOfferSenderInfos(result._data)
                })
                .catch((error) => console.lor('error while getting user who send offer: ', error))
        }
        if(props.myOfferInfos){
            console.log('my offer infos: ', props.myOfferInfos)
            setInfosMyOffer(props.myOfferInfos)

            firestore()
                .collection('Mission')
                .doc(props.myOfferInfos._data.mission_id)
                .get()
                .then((result) => { 
                    console.log('getting mission who have offer:' , result._data)
                    if(result._data.started_at!=""){
                        setIsStarted(true)
                        customNavigate(
                            'StartMission',
                            { missionIdForStart: props.myOfferInfos._data.mission_id }
                        )
                    }
                    setInfosMission(result._data)
                })
                .catch((error) => console.lor('error while getting mission who have offer: ', error))
        }
    },[])

    const downloadImage = async (theRef) => {
        console.log('valeur de url photo profile : ')
        await storage()
            .ref(theRef)
            .getDownloadURL()
            .then(url => {
                console.log('conentu de url : ', url);
                setCarrierPicture(url)
            })
            .catch(error => console.log('erreur de url : ', error));
    }

    const doConfirmation = (offerId) => {
        if(offerId && isConfirm==false){
            firestore()
                .collection('Offer')
                .doc(offerId)
                .update({
                    validated:true
                })
                .then(()=> {
                    console.log('offer validated')
                    setIsConfirm(true)
                    setMissionIsOff(true)
                })
                .catch((error) => console.log('error while validate offer', error))
        }
    }

    const doRejection = (offerId) => {
        if(offerId){
            firestore()
                .collection('Offer')
                .doc(offerId)
                .update({
                    rejected:true
                })
                .then(()=> {
                    console.log('offer rejected')
                    props.goback()
                })
                .catch((error) => console.log('error while reject offer', error))
        }
    }

    const doStartMission = (missionIdForStart) => {
        const date = new Date()
        const currentDay = date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear()
        const currentHoure = date.getHours()+":"+date.getMinutes();
        
        console.log({missionIdForStart})
        firestore()
            .collection('Mission')
            .doc(missionIdForStart)
            .get()
            .then((response) => { 
                console.log('getting mission infos for start:' , response._data.depature_time)
                const{ depature_day, depature_time } = response._data
                const theDate = depature_day.substring(depature_day.lastIndexOf(' ') + 1)
                const theMinutes = depature_time.substring(depature_time.indexOf(':') + 1)
                const theHour = depature_time.substring(0, depature_time.lastIndexOf(':'))

                console.log({currentDay,theDate,currentHoure, theMinutes, theHour })

                if(currentDay == theDate){
                    console.log('les mm')
                    if(date.getHours() == theHour){
                        console.log('La mm heur') 
                        if(date.getMinutes() >= theMinutes){
                            //La mission peux débuter ici
                            // le transporteur lance mais le client doit confirmer avant 
                            // que la mission ne débute, donc ici on vas envoyer une 
                            // notification au client afin qu'il confirme le début
                            console.log('les mm minutes') 
                            firestore()
                                .collection('Mission')
                                .doc(missionIdForStart) 
                                .update({
                                    // started_at:currentHoure
                                    notified_customer:true
                                })
                                .then(()=> {
                                    console.log('mission notified_customer updated')
                                    customNavigate(
                                        'StartMission',
                                        { missionIdForStart }
                                    )
                                })
                                .catch((error) => console.log('error while reject offer', error))
                        } else{
                            console.log('Pas les mm minutes')
                            setStartInfos(`Pas encore disponible; début prévu aujoud'hui à ${depature_time}`)
                        }
                    } else {
                        console.log('Pas la mm heur:')
                        setStartInfos(`Pas encore disponible; début prévu aujoud'hui à ${depature_time}`)
                    }
                } else {
                    console.log('Pas encore disponible; début prévu à: !!!')
                    setStartInfos(`Pas encore disponible; début prévu le ${theDate} à ${depature_time}`)
                }
            })
            .catch((error) => console.lor('error while getting mission infos for start: ', error))
    }

    return(
        <View style={styles.container_offer_item}>
            {   offerInfos &&
                <View style={styles.view_image_style}>
                    {/* <Image style={styles.image_style} /> */}
                    {   carrierImage =='' &&
                        <View style={styles.image_avatar_style}>
                            <Entypo name="user" size={69} color="#fff" />
                        </View>
                    }
                    {   carrierImage !='' &&
                        <Image source={carrierImage} style={styles.image_Image_style} />
                    }
                </View>
            }
 
            <View style={styles.view_for_main_content}>
                {/* For customer */}
                {   offerInfos && 
                    <View style={styles.title_and_hour_view}>
                        <TouchableOpacity onPress={() => customNavigate('CarrierInfos', { idForCarrier })}>
                            {   offerSenderInfos && 
                                <Text style={{ fontFamily:'Nunito-Black'}}>{offerSenderInfos.username}</Text>
                            }
                        </TouchableOpacity>
                        <Text style={styles.regular_text_style}>{offerInfos._data.offer_hour}</Text>
                    </View>
                } 
                {/* For carrier */}
                {   infosMyOffer && 
                    <View style={styles.title_and_hour_view}> 
                        <View>
                            {   infosMission && infosMyOffer._data.rejected == false && infosMyOffer._data.validated == false &&
                                <Text style={{fontFamily:'Nunito-Black', color:'orange'}}>En attente</Text>
                            }

                            {   infosMission && infosMyOffer._data.rejected == true && infosMyOffer._data.validated == false &&
                                <Text style={{fontFamily:'Nunito-Black', color:'red'}}>Refusée</Text>
                            }
                            {   infosMission && infosMyOffer._data.rejected == false && infosMyOffer._data.validated == true &&
                                <Text style={{fontFamily:'Nunito-Black', color:'green'}}>Validée</Text>
                            }
                        </View>
                        <Text style={styles.regular_text_style}>{infosMyOffer._data.offer_hour}</Text>
                    </View>
                }

                {/* For customer */}
                {   offerInfos &&
                    <View style={styles.offer_content_view}>
                        <Text style={styles.regular_text_style}>{offerInfos._data.offer_content}</Text>
                    </View>
                }
                {/* For carrier */}
                {   infosMyOffer &&
                    <View style={styles.offer_content_view}>
                        <Text style={{fontFamily:'Nunito-Black'}}>{infosMyOffer._data.offer_content}</Text>
                    </View>
                }

                <View style={styles.buttons_view}>
                    {/* For customer */}
                    {   offerInfos && 
                        <Button 
                            { ...!isConfirm && {title:"Confirmer"}}
                            type="solid"
                            {...isConfirm && {icon:<FontAwesomeCheck name='check' size={25} color='#fff' />}}
                            onPress={() => doConfirmation(offerInfos.id)}
                            titleStyle={{ fontFamily:'Nunito-Black'}}
                            containerStyle={styles.button_container_style}
                            buttonStyle={{ backgroundColor:'#42a3aa' }}
                            // disabled={missionIsOff}
                            // disabledTitleStyle={{title:"prisss"}}
                        />
                    }
                    {/* For carrier */}
                    {   infosMyOffer && infosMyOffer._data.validated == false &&
                        <CustomModalComponent 
                            pressableTitle="Modifier" 
                            modalText="Entrez vos modifications"
                            // missionId={route.params.id}
                            offerInfos = {infosMyOffer}
                            // docIdMission={route.params.docIdMission}
                            forOfferModification
                        />
                    }
                    {   infosMyOffer && infosMyOffer._data.validated == true &&
                        <Button 
                            title="Lancer la mission"
                            type="solid"
                            // {...isConfirm && {icon:<FontAwesomeCheck name='check' size={25} color='#fff' />}}
                            onPress={() => doStartMission(infosMyOffer._data.mission_id )}
                            titleStyle={{ fontFamily:'Nunito-Black'}}
                            containerStyle={{ borderRadius:20, alignSelf:'center' }}
                            buttonStyle={{ backgroundColor:'#42a3aa' }}
                            disabled={isStarted}
                        />
                    }

                    {/* For customer */}
                    {   offerInfos && !isConfirm &&
                        <Button 
                            title="Rejeter"
                            type="solid"
                            onPress={() => doRejection(offerInfos.id)}
                            titleStyle={{ fontFamily:'Nunito-Black'}}
                            containerStyle={styles.button_container_style}
                            buttonStyle={{ backgroundColor:'#e3eae9' }}
                            // disabled={isConfirm}
                        /> 
                    }
                    {   offerInfos && isConfirm &&
                        <Button 
                            title="Débuter"
                            type="solid"
                            onPress={() => doStartMission(offerInfos._data.mission_id)}
                            titleStyle={{ fontFamily:'Nunito-Black'}}
                            containerStyle={styles.button_container_style}
                            buttonStyle={{ backgroundColor:'#e3eae9' }}
                            // disabled={isConfirm}
                        /> 
                    }
                    {/* For carrier */}
                    {   infosMyOffer && infosMyOffer._data.validated == false &&
                        // <Button 
                        //     title="Supprimer"
                        //     type="solid"
                        //     onPress={() => doRejection(infosMyOffer.id)}
                        //     titleStyle={{ fontFamily:'Nunito-Black'}}
                        //     containerStyle={styles.button_container_style}
                        //     buttonStyle={{ backgroundColor:'#e3eae9' }}
                        //     // disabled={isConfirm}
                        // /> 
                        <CustomModalComponent 
                            pressableTitle="Supprimer" 
                            modalText="Voulez-vous vraiment supprimer Votre offre?"
                            // missionId={route.params.id}
                            offerDeletedId = {infosMyOffer.id}
                            // // docIdMission={route.params.docIdMission}
                            forDeleteOffer
                        />
                    }
                </View>
                {   startInfos != '' &&
                    <View style={{ alignItems:'center', marginTop:20}}>
                            <Text style={{ fontFamily:'Nunito-Black', color:'brown'}}>{startInfos}</Text>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_offer_item:{
        flexDirection:'row', 
        padding:15,
        // borderWidth:1,
        // borderColor:'red',
        alignItems:'center'

    },
    view_image_style:{
        width:'25%',
        // height:96
    },
    image_Image_style:{
        width:'100%', 
        height:100, 
        borderRadius:60,
        alignItems:'center',
        justifyContent:'center'
    },
    image_avatar_style:{
        width:'100%', 
        height:96, 
        backgroundColor:'gray', 
        borderRadius:60,
        alignItems:'center',
        justifyContent:'center'
    },
    view_for_main_content:{
        flexDirection:'column', 
        width:'75%', 
        paddingLeft:10,
    },
    title_and_hour_view:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    regular_text_style:{
        fontFamily:'Nunito-Regular',
    },
    offer_content_view:{
        paddingBottom:10
    },
    buttons_view:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    button_container_style:{
        width:'45%', 
        borderRadius:20
    }
})

export default OfferReceivedItemComponent