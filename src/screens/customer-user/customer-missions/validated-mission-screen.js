import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text,Button } from 'react-native-elements';
import CustomerMissionComponent from '../../../components/customer-mission.component';
import CustomHeader from '../../../components/custom-header';
import IconArrow from 'react-native-vector-icons/AntDesign';

const ValidateMissionScreen = (props) => {
    const [missionValidated, setMissionValidated] = useState()

    useEffect(() => {
        firestore()
            .collection('Mission')
            .where("activated", "==", false) 
            .get()
            .then((resp) => { 
                console.log('response getting mission: ', resp.docs)
                setMissionValidated(resp.docs)
            })
            .catch((error) => { console.log('error while getting mission : ', error)})
    },[])

    return(
        <>
        <CustomHeader customTitle="Validée(s)" />
        <ScrollView >
            <View style={styles.container_validated}>
                {
                        missionValidated && missionValidated.map((item) => {
                        return <CustomerMissionComponent key={item.id.toString()} missions={item} isCustomer />
                    })
                }
            </View> 
            {/* {
                missionValidated.length ==0 &&
                <View style={{ alignItems:'center', marginTop:100}}>
                    <Text>Aucune mission trouvée</Text>
                </View>
            } */}
        </ScrollView>
        <View style={styles.view_button_style}>
            <IconArrow name="arrowleft" color='#42a3aa' size={30} />
            <Button 
                title="Retour"
                type="clear"
                onPress={() => props.navigation.navigate('NavTab')}
                titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
            />
            <IconArrow name="arrowright" color='#42a3aa' size={30} />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container_validated:{
        flex:1,
        flexWrap:'wrap',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        borderTopColor:'#42a3aa',
        borderTopWidth:1
    },
    view_button_style:{
        marginTop:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    }
})

export default ValidateMissionScreen