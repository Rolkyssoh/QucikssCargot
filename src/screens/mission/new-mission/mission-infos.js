import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {TimePicker} from 'react-native-simple-time-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import NewMissionHeader from '../../../components/new-mission-header'; 
import { 
    titleChanged, 
    destinationChanged, 
    depatureChanged, 
    hoursChanged,
    dateTimeChanged,
    minutesChanged, 
    descriptionChanged, 
    createNewMission ,
    updatingMission,
    volumeChanged,
    baggageTypeChanged,
    baggageImage1Changed, 
    baggageImage2Changed, 
    baggageImage3Changed, 
    baggageImage4Changed
} from '../../../actions';

const MissionInfos = (props) => {
    const [date, setDate] = useState(new Date())
    const [documentMissionId, setDocumentMissionId] = useState()

    useEffect(() => {
        console.log('id user dans mission infos: ', props.userId)
        console.log('params reçu dans missioniNFOS: ', props.route)
        console.log('le date time dans missioninfos: ', props.dateTime)

        if(props.route.params){
            //get mission infos
            getMissionInfosForUpdate(props.route.params.missionId)
        }

    },[])

    const getMissionInfosForUpdate = async (theMissionId) => {
        await firestore()
            .collection('Mission')
            .doc(theMissionId)
            .get()
            .then((result) => {
                console.log('the infos mission for update: ', result.id)
                const { mission_title, mission_destination, depature_place, mission_description} = result._data
                onTitleChange(mission_title)
                onDestinationChange(mission_destination)
                onDepatureChange(depature_place)
                onDescriptionChange(mission_description)
                //baggage infos to update
                getBaggageInfosForUpdate(result.id)
            })
            .catch((error) => console.log('error while gettind mission infos for updatin: ', error))
    }

    const getBaggageInfosForUpdate = async (collectionMissionId) => {
        firestore()
            .collection('Baggage')
            .doc('Mission')
            // .collection(result.id)
            .collection(collectionMissionId)
            .get()
            .then((resp) => { 
                console.log('response getting Baggage infos to update: ', resp.docs[0].id)
                props.volumeChanged(resp.docs[0]._data.baggage_volume)
                props.baggageTypeChanged(resp.docs[0]._data.baggage_type)

                setDocumentMissionId(resp.docs[0].id)
                //Récupération des images de l'annonce à modifier
                getMissionImageForUpdate(collectionMissionId, resp.docs[0].id)
            })
            .catch((error) => { console.log('error while getting baggage infos to update : ', error)})
    }

    const getMissionImageForUpdate = async (collectionMissionId, docMissionId) => {
        await firestore()
            .collection('Baggage') 
            .doc('Mission')
            .collection(collectionMissionId)
            .doc(docMissionId)
            .collection('BaggagePicture')
            .get()
            .then((resp) => { 
                console.log('response getting Baggage image once: ', resp.docs[0])
                resp.docs.forEach((ref) => { 
                    console.log('dans le forEach : ', ref)
                })
                props.baggageImage1Changed(resp.docs[0]._data.imageUrl), 
                props.baggageImage2Changed(resp.docs[1]._data.imageUrl), 
                props.baggageImage3Changed(resp.docs[2]._data.imageUrl), 
                props.baggageImage4Changed(resp.docs[3]._data.imageUrl)
            })
            .catch((error) => { console.log('error while getting baggage image once : ', error)})
    }

    const onTitleChange = (title) => {
        props.titleChanged(title)
    }

    const onDestinationChange = (destination) => {
        props.destinationChanged(destination)
    }

    const onDepatureChange = (depature) => {
        props.depatureChanged(depature)
    }

    const onDescriptionChange = (description) => {
        props.descriptionChanged(description)
    }

    const doCreateNewMission = () => {
        const { title, destination,depature, selectedHours, dateTime, selectedMinutes, description, 
            luggageVolume, baggageType, baggageImage1,baggageImage2, baggageImage3, baggageImage4, userId} = props;
        const missionId = props.route.params.missionId;

        if(props.route.params){
            //Pour la modification
            props.updatingMission({title, destination, depature, selectedHours, dateTime, selectedMinutes, description, 
                luggageVolume, baggageType , baggageImage1, baggageImage2, baggageImage3, baggageImage4,missionId, documentMissionId})
        } else {
            //Pour la création
            props.createNewMission({title, destination, depature, selectedHours, dateTime, selectedMinutes, description, 
                luggageVolume, baggageType , baggageImage1, baggageImage2, baggageImage3, baggageImage4, userId})
        }
    }

    const clearInputFieldsMission = () => {
        props.titleChanged('');
        props.destinationChanged('');
        props.depatureChanged('');
        props.descriptionChanged('');
        props.navigation.navigate('Drawer')
    }


    return(
        <View style={styles.mission_infos_container}>
            <NewMissionHeader 
                title={ props.route.params ? "Modifier la Mission" : "Infos nouvelle mission"} 
                doNav={clearInputFieldsMission}  
            />
            <View style={styles.content_style}>
                <View style={styles.input_view}>
                    <Input 
                        placeholder="Titre de la mission"
                        value={props.title}
                        onChangeText={onTitleChange}
                    />
                    <Input  
                        placeholder="Destination"
                        value={props.destination}
                        onChangeText={onDestinationChange}
                    />
                    <Input 
                        placeholder="Lieu de départ"
                        value={props.depature}
                        onChangeText={onDepatureChange}
                    />
                    <Input 
                        placeholder="Description"
                        value={props.description}
                        onChangeText={onDescriptionChange}
                    />
                    <View style={{ alignItems:'center'}}>
                        <Text>Date et heure de départ</Text>
                        <DatePicker 
                            date={props.dateTime}
                            onDateChange={props.dateTimeChanged}
                            mode='datetime'
                            maximumDate={new Date('2021-12-31')}
                            minimumDate={new Date('2021-04-01')}
                        />
                    </View>
                    {/* <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                        <View>
                            <Text>Date de départ</Text>
                            <Text>date</Text>
                        </View>
                        <View style={{ width:'59%', alignItems:'center'}}>
                            <Text>Heur de départ</Text>
                            <TimePicker 
                                selectedHours={props.selectedHours}
                                selectedMinutes={props.selectedMinutes}
                                onChange={(hours, minutes)=>{
                                    props.hoursChanged(hours);
                                    props.minutesChanged(minutes)
                                }}
                                zeroPadding
                                hoursUnit='h'
                            />
                        </View>
                    </View> */}
                </View>
                <View style={styles.view_button_style}>
                    <Button 
                        title="valider"
                        type='outline'
                        onPress={doCreateNewMission}
                        titleStyle={{ color:'#42a3aa'}}
                        buttonStyle={{ borderRadius:20, borderColor:'#42a3aa'}}
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
        marginBottom:10
    },
    content_style:{
        flex:5,
    },
    view_button_style:{
        paddingHorizontal:50
    }
})

const mapStateToProps = (state) => {
    return { 
        title: state.NewMission.title,
        destination: state.NewMission.destination,
        depature: state.NewMission.depature,

        selectedHours: state.NewMission.selectedHours,
        dateTime: state.NewMission.dateTime,
        selectedMinutes: state.NewMission.selectedMinutes,

        description: state.NewMission.description,
        luggageVolume: state.NewMission.luggageVolume,
        baggageType: state.NewMission.baggageType,

        baggageImage1: state.NewMission.baggageImage1, 
        baggageImage2: state.NewMission.baggageImage2,
        baggageImage3: state.NewMission.baggageImage3,
        baggageImage4: state.NewMission.baggageImage4,
        userId: state.UpdateUserInfos.userId,
    }
}

export default connect(
    mapStateToProps,  
    {   
        titleChanged,
        destinationChanged,
        depatureChanged,
        hoursChanged,
        dateTimeChanged,
        minutesChanged,
        descriptionChanged,
        createNewMission,
        updatingMission,
        volumeChanged,
        baggageTypeChanged,
        baggageImage1Changed, 
        baggageImage2Changed, 
        baggageImage3Changed, 
        baggageImage4Changed
    }
    )(MissionInfos)