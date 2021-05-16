import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import NewMissionHeader from '../../../components/new-mission-header';
import { destinationChanged, depatureChanged, startTimeChanged, descriptionChanged, createNewMission } from '../../../actions';

const MissionInfos = (props) => {

    useEffect(() => {
        console.log('id user dans mission infos: ', props.userId)
    },[])

    const onDestinationChange = (destination) => {
        props.destinationChanged(destination)
    }

    const onDepatureChange = (depature) => {
        props.depatureChanged(depature)
    }

    const onStartTimeChange = (startTime) => {
        props.startTimeChanged(startTime)
    }

    const onDescriptionChange = (description) => {
        props.descriptionChanged(description)
    }

    const doCreateNewMission = () => {
        const { destination,depature, startTime, description, luggageVolume, baggageType, baggageImage1,
            baggageImage2, baggageImage3, baggageImage4, userId} = props;
        props.createNewMission({destination, depature, startTime, description, luggageVolume, baggageType , baggageImage1,
            baggageImage2, baggageImage3, baggageImage4, userId})
    }


    return(
        <View style={styles.mission_infos_container}>
            <NewMissionHeader title="Infos nouvelle mission" doNav={()=>props.navigation.navigate('Drawer')}  />
            <View style={styles.content_style}>
                <View style={styles.input_view}>
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
                        placeholder="Heure de départ"
                        value={props.startTime}
                        onChangeText={onStartTimeChange}
                    />
                    <Input 
                        placeholder="Description"
                        value={props.description}
                        onChangeText={onDescriptionChange}
                    />
                </View>
                <Button 
                    title="valider"
                    type='outline'
                    onPress={doCreateNewMission}
                />
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
        marginBottom:50
    },
    content_style:{
        flex:5,
        // backgroundColor:'red'
    }
})

const mapStateToProps = (state) => {
    return {
        destination: state.NewMission.destination,
        depature: state.NewMission.depature,
        startTime: state.NewMission.startTime,
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
        destinationChanged,
        depatureChanged,
        startTimeChanged,
        descriptionChanged,
        createNewMission,
    }
    )(MissionInfos)