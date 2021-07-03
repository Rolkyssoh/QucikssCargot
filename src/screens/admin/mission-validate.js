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
        .where("activated", "==", true)  
        .where("rejected", "==", false)
        .get() 
        .then((response)=>{
            console.log('result on publishe: ', response.docs);
            setMissionItems(response.docs)
        })
        .catch((error)=> { console.log('error while getting publish mission : ', error)})
    },[])

    return(
        <View style={styles.validate_container}> 
            <Text style={{ fontFamily:'Nunito-Black', fontSize:30, color:'#42a3aa'}}>Validée(s)</Text>  
            <View style={styles.items_list}>
                <FlatList 
                    data={missionItems}
                    renderItem={({item})=> <MissionItem item={item} isAdmin validateScreen /> }
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
        backgroundColor:'#d5dde0',
        paddingBottom:105
    },
    items_list:{
        // backgroundColor:'red',
        paddingHorizontal:25,
        paddingVertical:10,
        width:'100%',
    }
})

export default MissionValidate