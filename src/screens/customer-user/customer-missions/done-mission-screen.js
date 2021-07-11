import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomHeader from '../../../components/custom-header';
import IconArrow from 'react-native-vector-icons/AntDesign';
import CustomerMissionComponent from '../../../components/customer-mission.component';

const DoneMissionScreen = (props) => {
    const[missionDone, setMissionDone]=useState()
    const [user_id, setUserId] = useState(props.userId)

    useEffect(() => {
        firestore()
            .collection('Mission')
            .where("user_id", "==", user_id)
            // .where("activated", "==", false)  
            .where("ended_at", "!=", "") 
            .get()
            .then((resp) => { 
                console.log('response getting mission done: ', resp.docs)
                setMissionDone(resp.docs)
            })
            .catch((error) => { console.log('error while getting mission Done: ', error)})
    },[])
    return(
        <>
            <CustomHeader customTitle="Effectuée(s)" />
            <ScrollView>
                <View style={styles.container_done_screen}>
                    {
                        missionDone && missionDone.map((item) => {
                            return <CustomerMissionComponent key={item.id.toString()} missions={item} isCustomer />
                        })
                    }
                </View>
                {
                    missionDone && missionDone.length ==0 &&
                    <View style={{ alignItems:'center', marginTop:100}}>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Aucune mission effectuées pour le moment!</Text>
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
                {/* <View /> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container_done_screen:{
        flex:1, 
        flexWrap:'wrap',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        // backgroundColor: "#dee1e3",
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

export default connect(mapStateToProps)(DoneMissionScreen)