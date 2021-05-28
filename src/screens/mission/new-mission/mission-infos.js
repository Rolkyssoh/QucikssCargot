import React, { useEffect, useState } from 'react';
import {TimePicker} from 'react-native-simple-time-picker';
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
    createNewMission 
} from '../../../actions';

const MissionInfos = (props) => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        console.log('id user dans mission infos: ', props.userId)
        console.log('le date time dans missioninfos: ', props.dateTime)
    },[])

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
        props.createNewMission({title, destination, depature, selectedHours, dateTime, selectedMinutes, description, 
            luggageVolume, baggageType , baggageImage1, baggageImage2, baggageImage3, baggageImage4, userId})
    }


    return(
        <View style={styles.mission_infos_container}>
            <NewMissionHeader title="Infos nouvelle mission" doNav={()=>props.navigation.navigate('Drawer')}  />
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
        // backgroundColor:'yellow'
        marginBottom:10
    },
    content_style:{
        flex:5,
        // backgroundColor:'red'
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
    }
    )(MissionInfos)