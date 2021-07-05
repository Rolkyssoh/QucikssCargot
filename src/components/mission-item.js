import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { StyleSheet, View,TouchableOpacity,Image } from 'react-native';
import { Text, } from 'react-native-elements';
import MissionDetailComponent from './mission/mission-detail.component';
import * as CustomNavigation from './navigations/CustomNavigation';

const MissionItem = (props) => { 
    const [missionItem, setMissionItem] = useState(null)
    const [missionImage, setMissionImage] = useState()
    const [idSecondDocBaggage, setIdSecondDocBaggage] = useState()
    const [infosBaggage, setInfosBaggage] = useState()

    useEffect(() => {
        let isUnmount = false

        console.log('dans mission item: ', props.item.id)
        
        if(props.item){
            setMissionItem(props.item._data)

            firestore()
                .collection('Baggage') 
                .doc('Mission')
                .collection(props.item.id)
                .get()
                .then((response)=>{
                    console.log('result on getting path image by id mission: ', response.docs[0].id);
                    if(!isUnmount){
                        setIdSecondDocBaggage(response.docs[0].id)
                        setInfosBaggage(response.docs[0]._data)
                        //Get image once
                        getBaggageImageOnce(props.item.id, response.docs[0].id)
                    }
                })
                .catch((error)=> { console.log('error while getting path image in missionItem : ', error)})
        }

        return () => {
            isUnmount = true
        }
    },[])

    const getBaggageImageOnce = (idMissionInCollection, itemId) => {
        firestore()
        .collection('Baggage')
        .doc('Mission')
        .collection(idMissionInCollection)
        .doc(itemId)
        .collection('BaggagePicture')
        .get()
        .then((result) => { 
            // console.log('get image once in publish', result.docs[0]._data.imageUrl)
            setMissionImage(result.docs[0]._data.imageUrl)
        })
        .catch((error) => console.log('error while getting image once in published: ', error))
    }

    return(
        <TouchableOpacity 
            style={styles.item_container}
            onPress={()=> CustomNavigation.customNavigate(  
                    'Details',  
                    {   
                        isCarrier:props.isCarrier, 
                        isAdmin:props.isAdmin,
                        fromWaiting: props.waitScreen,
                        fromValidate: props.validateScreen, 
                        fromRejected: props.rejectedScreen,
                        infosMission:missionItem,
                        infosBaggage:infosBaggage,
                        docIdMission: idSecondDocBaggage,
                        id:props.item.id
                    }
                ) 
            }
            // onPress={ () => <MissionDetailComponent /> }
        >
            <View style={styles.item_image}>
                {/* <Text>Image Item</Text> */}
                {missionImage && <Image source={{ uri: `${missionImage}`}} style={{ height:'100%', width:90, borderTopLeftRadius:20, borderBottomLeftRadius:20,}} />}
            </View>
            <View style={styles.item_text}>
                { missionItem && <Text style={{ fontSize:22, fontFamily:'Nunito-Black'}}>{ missionItem.mission_title }</Text>}
                { missionItem &&
                    <View style={{ flexDirection:'row'}}>
                        <Text style={{ fontFamily:'Nunito-Black'}}>destination : </Text>
                        <Text style={{ fontFamily:'Nunito-Regular'}}>{missionItem.mission_destination}</Text>
                    </View>
                }
                { missionItem &&
                    <View style={{ flexDirection:'row'}}>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Heure départ : </Text>
                        <Text style={{ fontFamily:'Nunito-Regular'}}>{missionItem.depature_time}</Text>
                    </View>
                }
                { missionItem &&
                    <View style={{ flexDirection:'row'}}>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Type mission  : </Text>
                        <Text style={{ fontFamily:'Nunito-Regular'}}>{missionItem.mission_type}</Text>
                    </View>
                }
                { missionItem && missionItem.mission_type=='programmée' &&
                    <View style={{ flexDirection:'row'}}>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Date : </Text>
                        <Text style={{ fontFamily:'Nunito-Regular'}}>{missionItem.depature_day.substring(missionItem.depature_day.lastIndexOf(' '))}</Text>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item_container:{
        backgroundColor:'#fff',
        flexDirection:'row',
        width:'100%',
        // height:10,
        justifyContent:'flex-start',
        marginVertical:10,
        borderColor:'black',
        borderRadius:20,
        // borderWidth:0.3,
        shadowColor:'black',
        // shadowOffset:{
        //     width:-10,
        //     height:10
        // },
        // shadowOpacity:0.6,
        // shadowRadius:8.68,
        elevation:6
    },
    item_image:{
        width:90,
        height:150,
        backgroundColor:'#e3e2e7',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        alignItems:'center',
        justifyContent:'center'
        // marginRight:5
    },
    item_text:{
        // backgroundColor:'blue',
        // height:90,
        // flex:1,
        paddingHorizontal:10,
        // paddingVertical:10
        justifyContent:'center',
    }
})

export default MissionItem