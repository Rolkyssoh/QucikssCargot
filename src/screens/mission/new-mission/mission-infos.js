import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input } from 'react-native-elements';
import NewMissionHeader from '../../../components/new-mission-header';

const MissionInfos = () => {
    return(
        <View style={styles.mission_infos_container}>
            <NewMissionHeader title="Infos nouvelle mission" />
            <View style={styles.content_style}>
                <View style={styles.input_view}>
                    <Input 
                        placeholder="Destination"
                    />
                    <Input 
                        placeholder="Lieu de départ"
                    />
                    <Input 
                        placeholder="Heure de départ"
                    />
                    <Input 
                        placeholder="Description"
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mission_infos_container:{
        flex:1,
        backgroundColor:'#fff'
    },
    input_view:{
        padding:10,
        // backgroundColor:'yellow'
    },
    content_style:{
        flex:5,
        // backgroundColor:'red'
    }
})

export default MissionInfos