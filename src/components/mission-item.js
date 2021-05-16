import React, { useEffect, useState } from 'react';
import { StyleSheet, View,TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import MissionDetailComponent from './mission/mission-detail.component';
import * as CustomNavigation from './navigations/CustomNavigation';

const MissionItem = (props) => { 

    const [missionItem, setMissionItem] = useState(null)

    useEffect(() => {
        console.log('dans mission item: ', props.isCarrier)
        if(props.item){
            setMissionItem(props.item._data)
        }
    },[])

    return(
        <TouchableOpacity 
            style={styles.item_container}
            onPress={()=> CustomNavigation.customNavigate(
                    'Details',
                    {isCarrier:props.isCarrier, isAdmin:props.isAdmin, infos:missionItem}
                ) 
            }
            // onPress={ () => <MissionDetailComponent /> }
        >
            <View style={styles.item_image}>
                <Text>Image Item</Text>
            </View>
            <View style={styles.item_text}>
                { missionItem && <Text>destination : {missionItem.depature_place} vers {missionItem.mission_destination}</Text>}
                <Text>Heure départ : heure</Text>
                { missionItem && <Text>Type mission : {missionItem.miision_type}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item_container:{
        backgroundColor:'#fff',
        flexDirection:'row',
        width:'100%',
        justifyContent:'flex-start',
        marginVertical:10,
        borderColor:'black',
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
        height:90,
        backgroundColor:'grey',
        // marginRight:5
    },
    item_text:{
        // backgroundColor:'blue',
        // height:90,
        flex:1,
        paddingHorizontal:10,
        // paddingVertical:10
        justifyContent:'center',
    }
})

export default MissionItem