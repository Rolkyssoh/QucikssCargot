import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomHeader from '../../components/custom-header';
import MissionItem from '../../components/mission-item';
import ExecutedMissionComponent from '../../components/mission/executed-mission-component';

const CarrierExecutedMissionScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [inProgressMission, setInProgressMission] = useState([])
    const [theCarrierId, setTheCarrierId] = useState(props.userId)
    // const [notMissionExec, setNotMissionExec] = useState([]) 

    useEffect(() => {
        setIsLoading(true)
        firestore()
            .collection('Offer')
            .where("carrier_id", "==", theCarrierId) 
            .where("validated", "==", true)  
            .get()
            .then((resp) => {
                setIsLoading(false)
                if(resp._docs.length>0){
                    setIsLoading(true)
                    firestore()
                        .collection('Mission')
                        .doc(resp._docs[0]._data.mission_id)
                        .get()
                        .then((result) => { 
                            console.log('response getting mission in progress: ', result.id)
                            setIsLoading(false)
                            if(result._data.started_at != ""){
                                setInProgressMission([result])                     
                            }
                        })
                        .catch((error) => { 
                            console.log('error while getting in progress mission: ', error)
                            setIsLoading(false)
                        })
                }
            })
            .catch((error) => { console.log('error while getting carrier offer validated: ', error)}) 
    },[])

    return(
        <>
            {   !isLoading &&
                <ExecutedMissionComponent 
                    theHeaderTitle="En Cours"
                    noMissionMessage="Vous n'avez aucune mission en cours pour le moment!"
                    theDatas={inProgressMission}
                />
            }
            {   isLoading &&
                <View style={{ marginTop:250}}>
                    <ActivityIndicator size="large" color="#42a3aa" />
                </View>
            }
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