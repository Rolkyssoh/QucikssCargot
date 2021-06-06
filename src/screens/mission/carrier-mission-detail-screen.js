import React, { useEffect, useState } from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import CustomButton from '../../components/custom-button'; 
import CustomHeader from '../../components/custom-header';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import CustomModalComponent from '../../components/custom-modal.component';

const MissionDetailComponent = ({navigation,route}) => {
    const [missionPictures, setMissionPictures] = useState()

    useEffect(() => {
        console.log('params recue: ', route.params)
        const { id, docIdMission} = route.params
        if(id && docIdMission){
            getMissionImages(id, docIdMission)
        }
    },[])

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
                                    {/* <Text style={styles.text}>{picture.path}</Text> */}
                                    <Image source={{ uri: picture._data.imageUrl}} style={{ height:'100%', width:'100%'}} />
                                    {/* <Image source={require('../../../assets/images/mon-logo.jpeg')} style={{ width:'100%', height:'100%'}} /> */}
                                </View>
                            // console.log('contenu de picture ', picture._data.imageUrl)
                            
                            ))
                            
                          }
                        </SwiperFlatList>
                    </View>
                    <View style={{ padding:10, flex:1, justifyContent:'center' }}>
                        { route.params.infosMission.mission_destination && 
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
                            <Text>{route.params.infosBaggage.baggage_type }</Text>
                        </View>
                        <View style={{ flexDirection:'row', justifyContent:'center'}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>Vulume : </Text>
                            <Text>{route.params.infosBaggage.baggage_volume}</Text>
                        </View>
                        {/* { route.params.infosBaggage && <Text>Type de bagage : {route.params.infosBaggage.baggage_type } </Text>}
                        { route.params.infosBaggage && <Text>Vulume : {route.params.infosBaggage.baggage_volume} </Text>} */}
                    </View>
                </View>
            }
                {/* For Admin */}
            {   route.params.isAdmin &&
                <View style={styles.button_view}>
                    <Button 
                        customTitle="Retour"
                        type="clear"
                        customPress={() =>navigation.navigate("AdminNav")}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    /> 
                    <Button 
                        customTitle="Valider"
                        type="clear"
                        customPress={() => navigation.navigate('Map')}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    /> 
                    <Button 
                        customTitle="Rejeter"
                        type="clear"
                        customPress={() => navigation.navigate('Rejection')}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                    />
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
                    <Button 
                        title="Intéressé"
                        type="clear"
                        onPress={() => navigation.navigate('Rejection')}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
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
                    {/* <Button 
                        title="Suprimer"
                        type="clear"
                        onPress={() => navigation.navigate('Rejection')}
                        titleStyle={{ color:'#42a3aa'}}
                    /> */}
                    <CustomModalComponent 
                        pressableTitle="Supprimer" 
                        modalText="Voulez-vous vraiment supprimer cette mission?"
                        missionId={route.params.id}
                        docIdMission={route.params.docIdMission}
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
        flex:6,
        // borderColor:'red',
        // borderWidth:1
    },
    description_view:{
        flex:5,
        // backgroundColor:'green'
        padding:20
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
        // paddingBottom:10
    }
})

export default MissionDetailComponent