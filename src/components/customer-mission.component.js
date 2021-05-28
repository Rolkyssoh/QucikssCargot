import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { customNavigate } from './navigations/CustomNavigation';

const CustomerMissionComponent = (props) => {
    const [missionItem, setMissionItem] = useState()

    useEffect(() => {
        if(props.missions) {
            console.log('contenu venant de pending : ', props.missions._data)
            setMissionItem(props.missions._data)
        }
        
    },[])

    return(
        <TouchableOpacity 
            style={styles.view_content_style}
            onPress={() => customNavigate('Details',{isCustomer: props.isCustomer, infos: missionItem, id:props.missions.id })} 
        >
            <View style={styles.view_image_style} >
                <Image style={styles.image_style} />    
            </View> 
            <View style={styles.view_title_style}>
                {missionItem && <Text style={{ fontWeight:'bold'}}>{missionItem.mission_description}</Text>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view_content_style:{
        // padding:10,
        margin:5,
        width:'47%',
        height: 150 ,
        // borderColor:'blue',
        // borderWidth:1,
        backgroundColor:'#7bc7cb',
        // opacity:0.4,
        borderRadius:20
    },
    view_image_style:{
        backgroundColor:'grey', 
        width:'100%', 
        height:'74%',
        // borderColor:'green',
        // borderWidth:1,
        borderTopEndRadius:20,
        borderTopStartRadius:20
    },
    image_style:{
        // backgroundColor:'brown', 
        width:'100%', 
        height:'100%',
        // borderColor:'yellow',
        // borderWidth:1,
        borderTopRightRadius:20,
        borderTopLeftRadius:20
    },
    view_title_style:{
        padding:5,
        alignItems:'center',
        // opacity:0.4,
    }
})

export default CustomerMissionComponent