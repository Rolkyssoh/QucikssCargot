import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import MissionItem from '../../components/mission-item';
import IonIcons from 'react-native-vector-icons/Ionicons';

const PublishedMissionScreen = (props) => {
    const [missionItems, setMissionItems] = useState(null)

    useEffect(() => {
        let isUnmount = false

        // return () => {
        //     isUnmount = true;
        // }

        // Subscribe for the focus Listener
        const unsubscribe = props.navigation.addListener('focus', () => {
            firestore()
                .collection('Mission')
                .where("activated", "==", true)
                .where("rejected", "==", false)
                .where("started_at", "==", "") 
                // .where("desactivated", "==", false) 
                .get()
                .then((response)=>{
                    console.log('result on publishe: ', response.docs);
                    if(!isUnmount){
                        setMissionItems(response.docs)
                    }
                }) 
                .catch((error)=> { console.log('error while getting publish mission : ', error)})
        });

        return() => {
            unsubscribe;
            isUnmount = true;
        }
    },[props.navigation])


    return( 
        <View style={styles.published_view_container}>
            <View style={{ alignItems:'center'}}>
                <Text style={{ fontFamily:'Nunito-Black', fontSize:28}}>Missions Disponible</Text>
                <View style={{ alignSelf:'flex-start'}}>
                    <IonIcons 
                        name="cloud-done" 
                        size={40} color='#42a3aa'
                        onPress={()=>props.navigation.navigate('CarrierExec')}
                    />
                </View>
            </View>
            { missionItems && missionItems.length <= 0 &&
                <View style={{ alignItems:'center', marginTop:150 }}>
                    <Text style={{ fontFamily:'Nunito-Black'}}>Aucune mission trouvée</Text>
                </View>
            } 
            <FlatList  
                data={missionItems} 
                renderItem={({item})=> <MissionItem isCarrier item={item} /> }
                keyExtractor={(item)=>item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    published_view_container:{
        flex:1,
        backgroundColor:'#d5dde0', 
        padding:15,
        // marginBottom:55 
        paddingBottom:71
    },
    view_item_style:{

    }
})

export default PublishedMissionScreen