import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import MissionItem from '../../components/mission-item';

const PublishedMissionScreen = () => {
    const [missionItems, setMissionItems] = useState(null)

    useEffect(() => {
        firestore()
        .collection('Mission')
        // .doc()
        .get()
        .then((response)=>{
            console.log('result on publishe: ', response.docs);
            setMissionItems(response.docs)
        })
        .catch((error)=> { console.log('error while getting publish mission : ', error)})
    },[])


    return( 
        <View style={styles.published_view_container}>
            <View style={{ alignItems:'center'}}>
                <Text h3>Missions Disponible</Text>
            </View>
            <FlatList 
                data={missionItems}
                renderItem={({item})=> <MissionItem isCarrier item={item} /> }
                keyExtractor={(item)=>item.id.toString()}
            />
            {/* <MissionItem /> 
            <MissionItem />
            <MissionItem />
            <MissionItem /> */}
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