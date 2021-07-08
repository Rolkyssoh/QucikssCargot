import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomHeader from '../../components/custom-header';
import MissionItem from '../../components/mission-item';

const CarrierExecutedMissionScreen = (props) => {
    const [executedMission, setExecutedMission] = useState([])
    const [theCarrierId, setTheCarrierId] = useState(props.userId)
    // const [notMissionExec, setNotMissionExec] = useState([]) 

    useEffect(() => {
        console.log('the carrier id in exec : ', props.userId)
        firestore()
            .collection('Offer')
            .where("carrier_id", "==", theCarrierId) 
            .where("validated", "==", true)  
            // .where("ended_at", "!=", "")
            .get()
            .then((resp) => { 
                // setNotMissionExec(resp._docs)
                if(resp._docs.length>0){
                    firestore()
                        .collection('Mission')
                        .doc(resp._docs[0]._data.mission_id)
                        .get()
                        .then((result) => { 
                            console.log('response getting mission exec: ', result)
                            if(result._data.ended_at != ""){
                                setExecutedMission([result])
                                // setNotMissionExec([])
                                
                            }
                        })
                        .catch((error) => { console.log('error while getting carrier: ', error)})
                }
            })
            .catch((error) => { console.log('error while getting carrier: ', error)})
    },[])

    return(
        <>
            <CustomHeader customTitle="Exécutée(s)" />
            {/* <ScrollView> */}
                <View style={styles.carrier_exec_container}>
                    {
                        executedMission && executedMission.length<=0 &&
                        <View style={{ alignItems:'center',marginTop:100}}>
                            <Text style={{ fontFamily:'Nunito-Black'}}>Vous n'avez exécuté aucune mission pour le moment!</Text>
                        </View>
                    }
                    <FlatList 
                        data={executedMission}
                        renderItem={({item}) => <MissionItem Executed item={item} /> }
                        keyExtractor={(item)=>item.id.toString()}                     
                    />
                </View>
                <Button 
                    title="Retour"
                    type="clear"
                    onPress={() => props.navigation.goBack() }
                    titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black',}}
                />
            {/* </ScrollView> */}
        </>
    )
}

const styles = StyleSheet.create({
    carrier_exec_container:{
        flex:1,
        padding:15,
        backgroundColor:'#d5dde0',
        borderTopColor:'#42a3aa',
        borderTopWidth:1
    }
})

const mapStateToProps = (state) => {
    return{
        userId: state.UpdateUserInfos.userId,
    }
}

export default connect(mapStateToProps)(CarrierExecutedMissionScreen)