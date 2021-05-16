import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import MissionItem from '../../components/mission-item';

const MissionValidate = ({ navigation }) => {
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
        <View style={styles.validate_container}> 
            <Text h3>Valider mission</Text> 
            <View style={styles.items_list}>
                <FlatList 
                    data={missionItems}
                    renderItem={({item})=> <MissionItem item={item} isAmiiin /> }
                    keyExtractor={(item)=>item.id.toString()}
                />
            </View> 
        </View> 
    )
}

const styles = StyleSheet.create({
    validate_container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#d5dde0'
    },
    items_list:{
        // backgroundColor:'red',
        paddingHorizontal:25,
        paddingVertical:10,
        width:'100%',
    }
})

export default MissionValidate