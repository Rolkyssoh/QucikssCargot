import React, { useEffect, useState } from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import CustomButton from '../../components/custom-button';
import CustomHeader from '../../components/custom-header';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const MissionDetailComponent = ({navigation,route}) => {
    const [missionPicture, setMissionPicture] = useState()

    useEffect(() => {
        console.log('params recue: ', route.params.infos)
        if(route.params.id){
            getMissionImage(route.params.id)
        }
    },[])

    const  getMissionImage = async (idMission) => { 

        firestore()
            .collection('Baggage')
            .where("mission_id", "==", idMission) 
            .get()
            .then((response)=>{
                console.log('result on getMissioinImage: ', response._docs[0]._data.baggage_picture);
                // get image
                 console.log('valeur de url photo profile : ', response._docs[0]._data)
                // storage()
                //     .ref(response._docs[0]._data.baggage_picture)
                //     .getDownloadURL()
                //     .then(url => {
                //         console.log('conentu de url : ', url);
                //     })
                //     .catch(error => console.log('erreur de url : ', error));
                storage()
                    .ref(response._docs[0]._data.baggage_picture)
                    .list()
                    .then((result) => {
                        console.log('image dispo : ', result._items[0])
                        setMissionPicture(result._items)
                        result.items.forEach(ref => {
                            console.log('url image : ',ref.path);
                        });
                    })
                    .catch((error) => { console.log('erreur lors du chargement de la liste d\'image : ', error)})
            })
            .catch((error)=> { console.log('error while getting publish mission : ', error)})
    }

    return(
        <View style={styles.container_details}> 
            <CustomHeader customTitle="Details" />
            {route.params.infos && 
                <View style={styles.slider_view}>
                    <View style={{ flex:3 }}> 
                        <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop index={1} showPagination>
                          {
                            missionPicture && missionPicture.map((picture) => (
                                
                                <View key={picture.path} style={[styles.child, { backgroundColor: 'tomato' }]}>
                                    {/* <Text style={styles.text}>{picture.path}</Text> */}
                                    <Image source={{ uri: picture.path }} style={{ height:'100%', width:'100%'}} />
                                    {/* <Image source={require('../../../assets/images/mon-logo.jpeg')} style={{ width:'100%', height:'100%'}} /> */}
                                </View>
                            // console.log('dans le map : ', picture.path.substring(38))
                            
                            ))
                            
                          }
                        </SwiperFlatList>
                    </View>
                    <View style={{ padding:10, flex:1, justifyContent:'center' }}>
                        { route.params.infos.mission_destination && 
                            <Text h4>{route.params.infos.mission_title}</Text>
                        }
                    </View>
                </View>
            }
            {route.params.infos && 
                <View style={styles.description_view}>
                    <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                        <Text>Publiée: {route.params.infos.creation_day} </Text>
                        <Text>Heure : { route.params.infos.creation_hour}</Text> 
                    </View>
                    <View style={{ flexDirection:'row', justifyContent:'space-around', marginVertical:20}}>
                        <Text>Départ : {route.params.infos.depature_place} </Text>
                        <Text>Destination : { route.params.infos.mission_destination}</Text>
                    </View>

                    <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <Text>Type : </Text>
                        {route.params.infos.mission_type && <Text>{ route.params.infos.mission_type}</Text>}
                    </View>
                    
                    <View style={{ marginVertical:25}}>
                        <Text h4>Description</Text>
                        <Text>{route.params.infos.mission_description}</Text>
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
                        titleStyle={{ color:'#42a3aa'}}
                    /> 
                    <Button 
                        customTitle="Valider"
                        type="clear"
                        customPress={() => navigation.navigate('Map')}
                        titleStyle={{ color:'#42a3aa'}}
                    /> 
                    <Button 
                        customTitle="Rejeter"
                        type="clear"
                        customPress={() => navigation.navigate('Rejection')}
                        titleStyle={{ color:'#42a3aa'}}
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
                        titleStyle={{ color:'#42a3aa'}}
                    /> 
                    <Button 
                        title="Intéressé"
                        type="clear"
                        onPress={() => navigation.navigate('Rejection')}
                        titleStyle={{ color:'#42a3aa'}}
                    />
                </View> 
            }
            {   route.params.isCustomer &&
                <View style={styles.button_view}>
                    <Button 
                        title="Retour"
                        type="clear"
                        onPress={() =>navigation.navigate("Customer")}
                        titleStyle={{ color:'#42a3aa'}}
                    /> 
                    <Button 
                        title="Modifier"
                        type="clear"
                        onPress={() => navigation.navigate('Map')}
                        titleStyle={{ color:'#42a3aa'}}
                    />
                    <Button 
                        title="Suprimer"
                        type="clear"
                        onPress={() => navigation.navigate('Rejection')}
                        titleStyle={{ color:'#42a3aa'}}
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
        borderColor:'grey',
        borderTopWidth:1
        // paddingBottom:10
    }
})

export default MissionDetailComponent