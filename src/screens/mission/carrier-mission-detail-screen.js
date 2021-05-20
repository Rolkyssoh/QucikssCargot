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
        console.log('params recue: ', route.params.id)
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
                    <View style={{ flex:3, borderColor:'blue', borderWidth:2}}>
                        {/* <Text>Slider ici</Text> */}
                        {/* <SwiperFlatList
                            autoplay
                            autoplayDelay={2}
                            autoplayLoop
                            index={2}
                            showPagination
                            renderItem={() => (
                                  <View style={styles.child}>
                                      <Text style={styles.text}>item ici</Text>
                                      <Text style={styles.text}>item ici</Text>
                                  </View>
                            )}  
                        /> */}
                        <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop index={3} showPagination>
                          {/* <View style={[styles.child, { backgroundColor: 'tomato' }]}>
                            <Text style={styles.text}>1</Text>
                          </View> */}
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
                          {/* <View style={[styles.child, { backgroundColor: 'thistle' }]}>
                            <Text style={styles.text}>2</Text>
                          </View>
                          <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
                            <Text style={styles.text}>3</Text>
                          </View>
                          <View style={[styles.child, { backgroundColor: 'teal' }]}>
                            <Text style={styles.text}>4</Text>
                          </View> */}
                        </SwiperFlatList>
                    </View>
                    <View style={{ padding:10, flex:1, justifyContent:'center' }}>
                        <Text h4>Titre</Text>
                    </View>
                </View>
            }
            {route.params.infos && 
                <View style={styles.description_view}>
                    <Text>{route.params.infos.mission_description}</Text>
                    <Text>Départ : {route.params.infos.depature_place} </Text>
                    <Text>Destination : { route.params.infos.mission_destination}</Text>
                </View>
            }
                {/* For Admin */}
            {   route.params.isAdmin &&
                <View style={styles.button_view}>
                    <CustomButton 
                        customTitle="Retour"
                        customPress={() =>navigation.navigate("AdminNav")}
                    /> 
                    <CustomButton 
                        customTitle="Valider" 
                        customPress={() => navigation.navigate('Map')}
                    />
                    <CustomButton 
                        customTitle="Rejeter" 
                        customPress={() => navigation.navigate('Rejection')}
                    />
                </View>
            }
                {/* For carrier */}
            {   route.params.isCarrier &&
                <View style={styles.button_view}>
                    <CustomButton 
                        customTitle="Retour"
                        customPress={() =>navigation.navigate("CarrierNav")}
                    /> 
                    <CustomButton 
                        customTitle="Intéressé" 
                        customPress={() => navigation.navigate('Rejection')}
                    />
                </View> 
            }
            {   route.params.isCustomer &&
                <View style={styles.button_view}>
                    <CustomButton 
                        customTitle="Retour"
                        customPress={() =>navigation.navigate("Customer")}
                    /> 
                    <CustomButton 
                        customTitle="Modifier" 
                        customPress={() => navigation.navigate('Map')}
                    />
                    <CustomButton 
                        customTitle="Suprimer" 
                        customPress={() => navigation.navigate('Rejection')}
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
        borderColor:'red',
        borderWidth:1
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
        borderTopWidth:3
        // paddingBottom:10
    }
})

export default MissionDetailComponent