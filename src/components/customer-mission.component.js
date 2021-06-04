import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { customNavigate } from './navigations/CustomNavigation';

const CustomerMissionComponent = (props) => {
    const [missionItem, setMissionItem] = useState()
    const [baggageImage, setBaggageImage] = useState()
    const [baggageInfos, setBaggageInfos] = useState()
    const [missionIdDoc, setMissionIdDoc] = useState()

    useEffect(() => {
        if(props.missions) {
            console.log('contenu venant de pending : ', props.missions.id)
            setMissionItem(props.missions._data)
            getBaggageInfos(props.missions.id)
        }
        
    },[])

    const getBaggageInfos = async (missionIdCollection) => {
        await firestore()
            .collection('Baggage')
            .doc('Mission')
            .collection(missionIdCollection)
            .get()
            .then((resp) => { 
                console.log('response getting Baggage infos: ', resp.docs[0]._data)
                getOnceBaggageImage(missionIdCollection, resp.docs[0].id )
                setBaggageInfos(resp.docs[0]._data)
                setMissionIdDoc(resp.docs[0].id)
            })
            .catch((error) => { console.log('error while getting baggage images : ', error)})

    }
    const getOnceBaggageImage = async (missinIdCollection, missionIdDoc) => { 
        await firestore()
            .collection('Baggage') 
            .doc('Mission')
            .collection(missinIdCollection)
            .doc(missionIdDoc)
            .collection('BaggagePicture')
            .get()
            .then((resp) => { 
                console.log('response getting Baggage image once: ', resp.docs)
                if(resp.docs[0]){
                    setBaggageImage(resp.docs[0]._data.imageUrl)
                }
            })
            .catch((error) => { console.log('error while getting baggage image once : ', error)})
    }

    return(  
        <TouchableOpacity 
            style={styles.view_content_style}
            onPress={() => customNavigate(
                'Details',
                { 
                    isCustomer: props.isCustomer, 
                    infosMission: missionItem,
                    infosBaggage: baggageInfos,
                    docIdMission: missionIdDoc,
                    id:props.missions.id
                }
            )} 
        >
            <View style={styles.view_image_style} >
                { baggageImage && <Image source={{ uri: baggageImage }} style={styles.image_style} /> }   
            </View> 
            <View style={styles.view_title_style}>
                {missionItem && <Text style={{ fontWeight:'bold'}}>{missionItem.mission_description}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view_content_style:{
        margin:5,
        width:'47%',
        height: 170 ,
        backgroundColor:'#7bc7cb',
        // opacity:0.4,
        borderRadius:20
    },
    view_image_style:{
        backgroundColor:'grey', 
        width:'100%', 
        height:'74%',
        borderTopEndRadius:20,
        borderTopStartRadius:20
    },
    image_style:{
        width:'100%', 
        height:'100%',
        borderTopRightRadius:20,
        borderTopLeftRadius:20
    },
    view_title_style:{
        padding:5,
        alignItems:'center',
        // opacity:0.4,
    }
})

export default CustomerMissionComponent