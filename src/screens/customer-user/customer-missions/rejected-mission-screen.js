import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomerMissionComponent from '../../../components/customer-mission.component';
import CustomHeader from '../../../components/custom-header';
import IconArrow from 'react-native-vector-icons/AntDesign';

const RejectedMissionScreen = (props) => {

    const [missionRejected, setMissionRejected] = useState()

    useEffect(() => {
        firestore()
            .collection('Mission')
            .where("activated", "==", false) 
            .get()
            .then((resp) => { 
                console.log('response getting mission: ', resp.docs)
                setMissionRejected(resp.docs)
            })
            .catch((error) => { console.log('error while getting mission : ', error)})
    },[])

    return(
        <>
        <CustomHeader customTitle="Rejetée(s)" />
        <ScrollView >
            <View style={styles.container_rejected}>
                {
                    missionRejected && missionRejected.map((item) => {
                        return <CustomerMissionComponent key={item.id.toString()} missions={item} />
                    })
                }
            </View>
        </ScrollView>
        <View style={styles.view_button_style}>
            <IconArrow name="arrowleft" size={30} />
            <Button 
                title="Retour"
                type="clear"
                onPress={() => props.navigation.navigate('NavTab')}
            />
            <View />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container_rejected:{
        flex:1,
        flexWrap:'wrap',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between'
    },
    view_button_style:{
        marginTop:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    }
})

export default RejectedMissionScreen