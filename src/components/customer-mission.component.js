import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';

const CustomerMissionComponent = (props) => {
    const [missionItem, setMissionItem] = useState()

    useEffect(() => {
        if(props.missions) {
            console.log('contenu venant de pending : ', props.missions._data.mission_description)
            setMissionItem(props.missions._data)
        }
        
    },[])

    return(
        <View style={styles.view_content_style}>
            <View style={styles.view_image_style} >
                <Image style={styles.image_style} />    
            </View> 
            <View style={styles.view_title_style}>
                {missionItem && <Text>{missionItem.mission_description}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view_content_style:{
        // padding:10,
        margin:5,
        width:'47%',
        height: 150 ,
        borderColor:'blue',
        borderWidth:1
    },
    view_image_style:{
        backgroundColor:'grey', 
        width:'100%', 
        height:'74%',
        borderColor:'green',
        borderWidth:1
    },
    image_style:{
        backgroundColor:'grey', 
        width:'100%', 
        height:'100%',
        borderColor:'yellow',
        borderWidth:2
    },
    view_title_style:{
        padding:5
    }
})

export default CustomerMissionComponent