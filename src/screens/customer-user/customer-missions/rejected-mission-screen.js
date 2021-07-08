import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomerMissionComponent from '../../../components/customer-mission.component';
import CustomHeader from '../../../components/custom-header';
import IconArrow from 'react-native-vector-icons/AntDesign';

const RejectedMissionScreen = (props) => {

    const [missionRejected, setMissionRejected] = useState()
    const [user_id, setUserId] = useState(props.userId)

    useEffect(() => { 
        let isCancelled = false;
        firestore()
            .collection('Mission')
            .where("activated", "==", false)
            .where("rejected", "==", true)
            .where("user_id", "==", user_id) 
            .where("started_at","==", "") 
            .get()
            .then((resp) => { 
                console.log('response getting mission: ', resp.docs)
                setMissionRejected(resp.docs)
            })
            .catch((error) => { console.log('error while getting mission : ', error)})
        
        return () => {
            isCancelled = true;
        };
    },[])

    return(
        <>
        <CustomHeader customTitle="Rejetée(s)" />
        <ScrollView >
            <View style={styles.container_rejected}>
                {
                    missionRejected && missionRejected.map((item) => {
                        return <CustomerMissionComponent key={item.id.toString()} missions={item} isCustomer />
                    })
                }
            </View>
            {
                missionRejected && missionRejected.length <=0 &&
                <View style={{ alignItems:'center', marginTop:100}}>
                    <Text style={{ fontFamily:'Nunito-Black'}}>Aucune mission trouvée!</Text>
                </View>
            } 
        </ScrollView>
        <View style={styles.view_button_style}>
            <IconArrow name="arrowleft" color='#42a3aa' size={30} />
            <Button 
                title="Retour"
                type="clear"
                onPress={() => props.navigation.navigate('NavTab')}
                titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black',}}
            />
            <IconArrow name="arrowright" color='#42a3aa' size={30} />
            {/* <View /> */}
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

const mapStateToProps = (state) => {
    return{
        userId: state.UpdateUserInfos.userId,
    }
}

export default connect(mapStateToProps)(RejectedMissionScreen)