import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import MissionItem from '../../components/mission-item';

const MissionRejected = (props) => {

    const [missionItems, setMissionItems] = useState(null) 

    useEffect(() => { 

        const unsubscribe = props.navigation.addListener('focus', () => {
            firestore()
                .collection('Mission')
                .where("activated", "==", false) 
                .where("rejected", "==", true)
                .get() 
                .then((response)=>{
                    console.log('result on rejected mission: ', response.docs);
                    setMissionItems(response.docs)
                })
                .catch((error)=> { console.log('error while getting rejected mission : ', error)})
        });
        return() => {
            unsubscribe;
        }
    },[props.navigation])


    return(
        <View style={styles.rejected_container}> 
            <Text style={{ fontFamily:'Nunito-Black', fontSize:30, color:'#42a3aa'}}>Refusée(s)</Text>  
            <View style={styles.items_list}>
                <FlatList 
                    data={missionItems}
                    renderItem={({item})=> <MissionItem item={item} isAdmin rejectedScreen /> }
                    keyExtractor={(item)=>item.id.toString()}
                />
            </View> 
        </View> 
    )
}

const styles = StyleSheet.create({
    rejected_container:{
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

export default MissionRejected