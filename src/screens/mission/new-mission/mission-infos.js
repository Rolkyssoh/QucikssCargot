import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import NewMissionHeader from '../../../components/new-mission-header'; 
import { 
    titleChanged, 
    destinationChanged, 
    depatureChanged, 
    hoursChanged,
    minutesChanged,
    startDayChanged,
    startDateChanged,
    startMonthChanged,
    startYearChanged,
    missionTypeChanged,
    descriptionChanged, 
    createNewMission ,
    updatingMission,
    volumeChanged,
    baggageTypeChanged,
    baggageImage1Changed, 
    baggageImage2Changed, 
    baggageImage3Changed, 
    baggageImage4Changed,
    transportationChanged
} from '../../../actions';

const MissionInfos = (props) => {
    // const [date, setDate] = useState(new Date())
    const [documentMissionId, setDocumentMissionId] = useState()
    const [value, setValue] = useState('instantanée')

    const [dateChosen, setDateChosen] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateChosen;
        setShow(Platform.OS === 'ios');
        console.log({currentDate})
        setDateChosen(currentDate);
        props.hoursChanged(currentDate.getHours())
        props.minutesChanged(currentDate.getMinutes())
        props.startDayChanged(currentDate.getDay())
        props.startDateChanged(currentDate.getDate())
        props.startMonthChanged(currentDate.getMonth())
        props.startYearChanged(currentDate.getFullYear())
      };

      const showMode = (currentMode) => {
        setShow(true); 
        setMode(currentMode);
      };

      const showDatepicker = () => {
        showMode('date');
      };

      const showTimepicker = () => {
        showMode('time');
      };

    useEffect(() => {
        console.log('id user dans mission infos: ', props.userId)
        console.log('params reçu dans missioniNFOS: ', props.route)
        if(props.route.params.moyen){
            props.transportationChanged(props.route.params.moyen)
        }
        if(props.route.params.missionId){
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
                console.log('the infos mission for update: ', result._data)
                console.log('element extrait : ', result._data.depature_time.substring(0, result._data.depature_time.indexOf(':')))
                console.log('element extrait avec indexof : ', result._data.depature_day.indexOf('/'))
                const { mission_title, mission_destination, depature_place, mission_description, mission_type, depature_day, depature_time} = result._data
                onTitleChange(mission_title)
                onDestinationChange(mission_destination)
                onDepatureChange(depature_place)
                onDescriptionChange(mission_description)
                onMissionTypeChange(mission_type)

                props.hoursChanged(depature_time.substring(0, depature_time.indexOf(':')))
                props.minutesChanged(depature_time.substring(depature_time.lastIndexOf(':') + 1))
                props.startDateChanged(depature_day.substring(depature_day.lastIndexOf(' ') ,depature_day.indexOf('/')))
                props.startMonthChanged(depature_day.substring(depature_day.indexOf('/')+1 ,depature_day.lastIndexOf('/')))
                props.startYearChanged(depature_day.substring(depature_day.lastIndexOf('/') +1))
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
                console.log('response getting Baggage image once: ', resp.docs.length)
                resp.docs.forEach((ref) => { 
                    console.log('dans le forEach : ', ref)
                })
                if(resp.docs.length != 0){
                    if(resp.docs[0]){
                        props.baggageImage1Changed(resp.docs[0]._data.imageUrl)
                    }
                    if(resp.docs[1]){
                        props.baggageImage2Changed(resp.docs[1]._data.imageUrl)
                    }
                    if(resp.docs[2]){
                        props.baggageImage3Changed(resp.docs[2]._data.imageUrl)
                    }
                    if(resp.docs[3]){
                        props.baggageImage4Changed(resp.docs[3]._data.imageUrl)
                    }
                }
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

    const onMissionTypeChange = (mType) => {
        props.missionTypeChanged(mType)
    }

    const doCreateNewMission = () => {
        const { title, destination,depature, selectedHours, selectedMinutes, selectedDay, selectedDate, selectedMonth, selectedYear, 
            missionType, description, luggageVolume, baggageType, baggageImage1,baggageImage2, baggageImage3, baggageImage4, userId, transportation} = props;
        

        if(props.route.params.missionId){ 
            const missionId = props.route.params.missionId;
            //Pour la modification
            props.updatingMission({title, destination, depature, selectedHours, selectedMinutes,selectedDay, selectedDate, selectedMonth, selectedYear,
                 description, luggageVolume, baggageType , baggageImage1, baggageImage2, baggageImage3, baggageImage4,missionId, documentMissionId, transportation})
        } else {
            //Pour la création
            props.createNewMission({title, destination, depature, selectedHours, selectedMinutes, selectedDay, selectedDate, selectedMonth, selectedYear,
                missionType,description, luggageVolume, baggageType , baggageImage1, baggageImage2, baggageImage3, baggageImage4, userId, transportation});
                props.titleChanged('');
                props.destinationChanged('');
                props.depatureChanged('');
                props.descriptionChanged('');
                props.volumeChanged('');
                props.baggageTypeChanged('');
        }
    }

    const clearInputFieldsMission = () => {
        props.titleChanged('');
        props.destinationChanged('');
        props.depatureChanged('');
        props.descriptionChanged('');
        props.volumeChanged('');
        props.baggageTypeChanged('');
        props.navigation.navigate('Home')
    }

    const setDisabled = () => {
        console.log('setDiasbled appelé')
        if(props.title=='' || props.destination =='' || props.depature ==''|| props.description=='' 
        || props.missionType=='' || props.luggageVolume=='' || props.baggageType=='' || props.selectedHours==0 ){
            return true
        } else {
            return false
        }
    }


    return(
        <View style={styles.mission_infos_container}>
            <NewMissionHeader 
                title={ props.route.params.missionId ? "Modifier la Mission" : "Infos nouvelle mission"} 
                doNav={clearInputFieldsMission}  
            />
            <View style={styles.content_style}> 
                <View style={styles.input_view}>
                    <Input 
                        placeholder="Titre de la mission"
                        value={props.title}
                        onChangeText={onTitleChange}
                        inputStyle={styles.inputs_styles}
                    />
                    <Input  
                        placeholder="Destination"
                        value={props.destination}
                        onChangeText={onDestinationChange}
                        inputStyle={styles.inputs_styles}
                    />
                    <Input 
                        placeholder="Lieu de départ"
                        value={props.depature}
                        onChangeText={onDepatureChange}
                        inputStyle={styles.inputs_styles}
                    />
                    <Input 
                        placeholder="Description"
                        value={props.description}
                        onChangeText={onDescriptionChange}
                        inputStyle={styles.inputs_styles}
                    />
                    <View>
                        <Text style={{ alignSelf:'center', fontFamily:'Nunito-Black'}}>Type de la mission</Text>
                        <RadioButton.Group onValueChange={onMissionTypeChange} value={props.missionType}>
                            <View style={{ flexDirection:'row', justifyContent:'space-around', marginBottom:20}}> 
                                <View style={{ alignItems:'center', flexDirection:'row'}}>
                                  <Text style={styles.inputs_styles}>Instantanée</Text>
                                  <RadioButton value="instantanée" />
                                </View>
                                <View style={{ alignItems:'center', flexDirection:'row'}}>
                                  <Text style={styles.inputs_styles}>Programmée</Text>
                                  <RadioButton value="programmée" />
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={{ alignItems:'center'}}>
                        { props.missionType == 'programmée' && <Text style={{ fontFamily:'Nunito-Black'}}>Date et heure de départ</Text>}
                        { props.missionType == 'instantanée' && <Text style={{ fontFamily: 'Nunito-Black'}}>Heure de départ</Text> }
                    </View>
                    <View style={{ flexDirection:'row', justifyContent:'space-around', marginBottom:20}}>
                        { props.missionType == 'programmée' && 
                            <View style={{ alignItems:'center'}}>
                              <Button 
                                  onPress={showDatepicker} 
                                  title="Choisir la date"
                                  type="clear"
                                  titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                              />
                              <Text style={styles.inputs_styles}>{props.selectedDate}/{props.selectedMonth}/{props.selectedYear}</Text>
                            </View>
                        }
                        <View style={{ alignItems:'center'}}>
                            <Button 
                                onPress={showTimepicker}  
                                title="Choisir l'heure"
                                type="clear"
                                titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                            />
                            <Text>{props.selectedHours}:{props.selectedMinutes}</Text>
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateChosen}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                </View>
                <View style={styles.view_button_style}>
                    <Button 
                        title="valider"
                        type='outline'
                        onPress={doCreateNewMission}
                        titleStyle={{ color:'#42a3aa', fontFamily:'Nunito-Black'}}
                        buttonStyle={{ borderRadius:20, borderColor:'#42a3aa'}}
                        maximumDate={new Date(2021, 12, 31  )}
                        minimumDate={new Date(2021, 6, 3 )}
                        disabled={ setDisabled() }
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
    inputs_styles:{
        fontFamily:'Nunito-Regular'
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
        selectedMinutes: state.NewMission.selectedMinutes,
        selectedDay: state.NewMission.selectedDay,
        selectedDate: state.NewMission.selectedDate,
        selectedMonth: state.NewMission.selectedMonth,
        selectedYear: state.NewMission.selectedYear,
        missionType: state.NewMission.missionType,
        transportation: state.NewMission.transportation,

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
        minutesChanged,
        startDayChanged,
        startDateChanged,
        startMonthChanged,
        startYearChanged,
        missionTypeChanged,
        descriptionChanged,
        createNewMission,
        updatingMission,
        volumeChanged,
        baggageTypeChanged,
        baggageImage1Changed, 
        baggageImage2Changed, 
        baggageImage3Changed, 
        baggageImage4Changed,
        transportationChanged
    }
    )(MissionInfos)