import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import CustomHeader from '../../components/custom-header';
import StarIonicons from 'react-native-vector-icons/Ionicons'

const StartMissionScreen = (props) => {
    const [missionStatus, setMissionStatus] = useState('')
    const [isCarrierValue, setIsCarrierValue] = useState()
    const [infosStartedMission, setInfosStartedMission] = useState()
    const [missionIsEnd, setMissionIsEnd] = useState()

    useEffect(() => {
        console.log('Dans le start mission:', props)
        console.log('the user connect : ', props.currentUserId)
        if(props.currentUserId){
            getInfosCurrentUser(props.currentUserId)
        }
        firestore()
            .collection('Mission')
            .doc(props.route.params.missionIdForStart)
            .get()
            .then((resp)=> {
                console.log('get infos mission in start mission: ', resp._data)
                setInfosStartedMission(resp._data)
                const { notified_customer, started_at, ended_at } = resp._data
                setMissionIsEnd(ended_at)
                if(notified_customer==true && started_at==""){
                    console.log('User pas encore confirmé!!!')
                    setMissionStatus('En attente de confirmation du client!')
                } else if(ended_at!="") {
                    setMissionStatus('Mission terminé!')
                } else {
                    console.log('User a bien confirmé!!!')
                    setMissionStatus('Début confirmé!')
                }
                // customNavigate(
                //     'StartMission',
                //     { missionIdForStart }
                // )
            })
            .catch((error) => console.log('error while getting mission infos in start mission', error))
    },[])

    const getInfosCurrentUser = (theUserId) => {
        firestore()
        .collection('Users')
        .doc(theUserId)
        .get()
        .then((result)=> {
            console.log('get infos current user:', result._data)
            const { isCarrier } = result._data
            setIsCarrierValue(isCarrier)

        })
        .catch((error) => console.log('error while getting infos current user', error))
    }

    const doConfirmStartMission = (theMissionId) => {
        const date = new Date()
        const currentDay = date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear()
        const currentHoure = date.getHours()+":"+date.getMinutes();
        if(theMissionId){
            console.log({theMissionId})
            firestore()
                .collection('Mission')
                .doc(theMissionId)
                .update({
                    started_at:currentHoure
                    // notified_customer:true
                })
                .then(()=> {
                    console.log('stated mission is confirm')
                    setMissionStatus('Début confirmé!')
                    setMissionIsEnd(currentHoure)
                    // customNavigate(
                    //     'StartMission',
                    //     { missionIdForStart }
                    // )
                })
                .catch((error) => console.log('error while confirm the start of the mission', error))
        }
    }

    const doEndedMission = (idMissionToEnd) => {
        const date = new Date()
        const currentHoure = date.getHours()+":"+date.getMinutes();
        firestore()
            .collection('Mission')
            .doc(idMissionToEnd)
            .update({
                ended_at:currentHoure
            })
            .then(()=> {
                console.log('stated mission is confirm')
                setMissionStatus('Mission terminé')
                // customNavigate(
                //     'StartMission',
                //     { missionIdForStart }
                // )
            })
            .catch((error) => console.log('error while confirm the start of the mission', error))
    }

    return(
        <>
            <CustomHeader customTitle="Exécution de la mission" />
            <View style={styles.container_start_mission}>
                {/* <View style={{ borderColor:"#fff", borderWidth:0.5 }} /> */}
                { isCarrierValue == true && 
                    <View>
                        <Text style={{ fontFamily:'Nunito-Black'}}>{missionStatus}</Text>
                    </View>
                }
                {   isCarrierValue == true && missionIsEnd !="" &&
                    <Button 
                    title="Ok"
                    type="solid"
                    // {...isConfirm && {icon:<FontAwesomeCheck name='check' size={25} color='#fff' />}}
                    // onPress={() => doConfirmStartMission(props.route.params.missionIdForStart)}
                    titleStyle={{ fontFamily:'Nunito-Black'}}
                    containerStyle={{ borderRadius:20, alignSelf:'center' }}
                    buttonStyle={{ backgroundColor:'#42a3aa' }}
                />
                } 
                {/* {   isCarrierValue == true && missionStatus=='Début confirmé!' &&
                    <View>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Départ : { infosStartedMission.depature_place} </Text>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Destination : { infosStartedMission.mission_destination} </Text>
                    </View>
                } */}
                {   isCarrierValue == false && missionStatus!='Début confirmé!' && missionIsEnd =="" &&
                    <View>
                        <Text style={{ fontFamily:'Nunito-Black', marginBottom:10 }}>Le transporteur n'attend que vous!</Text>
                        <Button 
                            title="Confirmer le début"
                            type="solid"
                            // {...isConfirm && {icon:<FontAwesomeCheck name='check' size={25} color='#fff' />}}
                            onPress={() => doConfirmStartMission(props.route.params.missionIdForStart)}
                            titleStyle={{ fontFamily:'Nunito-Black'}}
                            containerStyle={{ borderRadius:20, alignSelf:'center' }}
                            buttonStyle={{ backgroundColor:'#42a3aa' }}
                        />
                    </View>
                }
                {   missionStatus=='Début confirmé!' && infosStartedMission && missionIsEnd =="" &&
                    <View>
                        <Text style={{ fontFamily:'Nunito-Black'}}>La mission a débutée!</Text>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Départ : { infosStartedMission.depature_place} </Text>
                        <Text style={{ fontFamily:'Nunito-Black'}}>Destination : { infosStartedMission.mission_destination} </Text>
                    </View>
                }
                {/* Terminer la mission */}
                {   isCarrierValue == false && missionIsEnd =="" &&
                    <Button 
                        title="Mission terminé"
                        type="solid"
                        // {...isConfirm && {icon:<FontAwesomeCheck name='check' size={25} color='#fff' />}}
                        onPress={() => doEndedMission(props.route.params.missionIdForStart)}
                        titleStyle={{ fontFamily:'Nunito-Black'}}
                        containerStyle={{ borderRadius:20, alignSelf:'center', marginTop:20 }}
                        buttonStyle={{ backgroundColor:'#42a3aa' }}
                    />
                }
                {   isCarrierValue == false && missionIsEnd !="" &&
                    <View>
                        <Text style={{fontFamily:'Nunito-Black'}}>Noter le transporteur!</Text>
                        <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                            <StarIonicons name="star-outline" size={20} color="#42a3aa" />
                            <StarIonicons name="star-outline" size={20} color="#42a3aa" />
                            <StarIonicons name="star-outline" size={20} color="#42a3aa" />
                            <StarIonicons name="star-outline" size={20} color="#42a3aa" />
                            <StarIonicons name="star-outline" size={20} color="#42a3aa" />
                        </View>
                        <Button 
                            title="Valider"
                            type="solid"
                            // onPress={() => doEndedMission(props.route.params.missionIdForStart)}
                            titleStyle={{ fontFamily:'Nunito-Black'}}
                            containerStyle={{ borderRadius:20, alignSelf:'center', marginTop:20 }}
                            buttonStyle={{ backgroundColor:'#42a3aa' }}
                        />
                    </View>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container_start_mission:{
        flex:1,
        backgroundColor:'#d5dde0',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    }
})

const mapStateToProps = (state) => {
    return{
      currentUserId: state.UpdateUserInfos.userId
    }
  }

export default connect(mapStateToProps)(StartMissionScreen)