import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
    TITLE_CHANGED,
    DESTINATION_CHANGED,
    DEPATURE_CHANGED,
    START_HOURS_CHANGED,
    START_MINUTES_CHANGED,

    START_DAY_CHANGED,
    START_DATE_CHANGED,
    START_MONTH_CHANGED,
    START_YEAR_CHANGED,
    MISSION_TYPE_CHANGED,

    DESCRIPTION_CHANGED,
    VOLUME_BAGGAGE_CHANGED,
    BAGGAGE_TYPE_CHANGED,
    CREATE_NEW_MISSION,
    UPDATE_AND_EXISTING_MISSION,
    BAGGAGE_IMAGE1_CHANGED,
    BAGGAGE_IMAGE2_CHANGED,
    BAGGAGE_IMAGE3_CHANGED,
    BAGGAGE_IMAGE4_CHANGED,
} from './types';

export const titleChanged = (title) => {
    return{
        type: TITLE_CHANGED,
        payload: title
    }
}

export const destinationChanged = (destination) => {
    return{
        type: DESTINATION_CHANGED,
        payload: destination
    }
}
export const depatureChanged = (depature) => {
    return{
        type: DEPATURE_CHANGED,
        payload: depature
    }
}
export const hoursChanged = (hours) => {
    console.log('dans le hoursChanges: ', hours)
    return{
        type: START_HOURS_CHANGED,
        payload: hours
    }
}
export const minutesChanged = (minutes) => {
    console.log('minute entrée: ', minutes)
    return{
        type: START_MINUTES_CHANGED,
        payload: minutes
    }
}

export const startDayChanged = (weekDay) => {
    console.log('jour entrée: ', weekDay)
    return{
        type: START_DAY_CHANGED,
        payload: weekDay
    }
}
export const startDateChanged = (date) => {
    console.log('date entrée: ', date)
    return{
        type: START_DATE_CHANGED,
        payload: date
    }
}
export const startMonthChanged = (month) => {
    console.log('month entrée: ', month)
    return{
        type: START_MONTH_CHANGED,
        payload: month
    }
}
export const startYearChanged = (year) => {
    console.log('year entrée: ', year)
    return{
        type: START_YEAR_CHANGED,
        payload: year
    }
}
export const missionTypeChanged = (mType) => {
    console.log('mission type:', mType)
    return {
        type: MISSION_TYPE_CHANGED,
        payload: mType
    }
}

export const descriptionChanged = (description) => {
    return{
        type: DESCRIPTION_CHANGED,
        payload: description
    }
}

export const volumeChanged = (volume) => {
    return{
        type: VOLUME_BAGGAGE_CHANGED,
        payload: volume
    }
}
export const baggageTypeChanged = (baggageType) => {
    return{
        type: BAGGAGE_TYPE_CHANGED,
        payload: baggageType
    }
};

//baggage images
export const baggageImage1Changed = (baggageImage1) => {
    console.log('dans le baggage image1 changed:', baggageImage1)
    return{
        type: BAGGAGE_IMAGE1_CHANGED,
        payload: baggageImage1
    }
};
export const baggageImage2Changed = (baggageImage2) => {
    return{
        type: BAGGAGE_IMAGE2_CHANGED,
        payload: baggageImage2
    }
};
export const baggageImage3Changed = (baggageImage3) => {
    return{
        type: BAGGAGE_IMAGE3_CHANGED,
        payload: baggageImage3
    }
};
export const baggageImage4Changed = (baggageImage4) => {
    return{
        type: BAGGAGE_IMAGE4_CHANGED,
        payload: baggageImage4
    }
};

export const createNewMission = ({title, destination, depature, selectedHours, selectedMinutes, selectedDay, selectedDate, selectedMonth, selectedYear, 
    missionType, description, luggageVolume, baggageType,baggageImage1, baggageImage2, baggageImage3,baggageImage4, userId} ) => {
    const date = new Date()
    const missionDate = date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear()
    const missionHour = date.getHours()+":"+date.getMinutes();
    const depatureDateGive = selectedDay + ', le ' + `${selectedDate}/${selectedMonth}/${selectedYear}`;
    const currentDateMIssion = selectedDay + ', le ' + `${missionDate}`

    return async (dispatch) => {
        dispatch({ type: CREATE_NEW_MISSION });
        console.log('Dans le create new mission!!!')
        firestore()
        .collection('Mission')
        .add({
           activated: false,
           rejected:false,
           mission_type:missionType,
           creation_day: missionDate,
           creation_hour: missionHour,
           mission_title: title,
           mission_destination:destination,
           depature_place:depature,
           //  depature_time:`${selectedHours.hours+':'+selectedHours.minutes}`,
           depature_time: selectedHours+':'+selectedMinutes,
           depature_day: `${ missionType == 'programmée' ? depatureDateGive : currentDateMIssion }`,
           started_at:'',
           ended_at:'',
           mission_description:description,
           user_id: userId
        })
        .then((snapshot)=>{
            console.log('user added!!', snapshot);
            firestore()
            .collection('Baggage')
            .doc('Mission')
            .collection(`${snapshot._documentPath._parts[1]}`)
            .add({
                baggage_volume: luggageVolume,
                baggage_type:baggageType,
            })
            .then((snapshot)=>{
                console.log('Baggage added!!', snapshot);
                { baggageImage1 && uploadBaggageImage(baggageImage1, snapshot.path, snapshot.id) }
                { baggageImage2 && uploadBaggageImage(baggageImage2, snapshot.path, snapshot.id) };
                { baggageImage3 && uploadBaggageImage(baggageImage3, snapshot.path, snapshot.id) };
                { baggageImage4 && uploadBaggageImage(baggageImage4, snapshot.path, snapshot.id) };
            })
            .catch((error)=> {
                console.log('erreor while add baggage : ', error)
            })
        })
        .catch((error)=> {
            console.log('erreor while add mission : ', error)
        })
    }
};

export const updatingMission = ({title, destination, depature, description,selectedHours, selectedMinutes, selectedDay, selectedDate, 
    selectedMonth, selectedYear, luggageVolume, baggageType,baggageImage1, baggageImage2, baggageImage3,baggageImage4, missionId, documentMissionId}) => {
        return async (dispatch) => {
            const date = new Date()
            const missionDateUpdate = date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear()
            const missionHourUpdate = date.getHours()+":"+date.getMinutes();
            const depatureDateGive = selectedDay + ', le ' + `${selectedDate}/${selectedMonth}/${selectedYear}`;
            const currentDateMIssion = selectedDay + ', le ' + `${missionDate}`
            dispatch ({ type: UPDATE_AND_EXISTING_MISSION});
            console.log({missionId, documentMissionId})

            firestore()
              .collection('Mission')
              .doc(missionId)
              .update({
                activated: false,
                rejected:false,
                updatingDay: missionDateUpdate,
                updatingHour: missionHourUpdate ,
                mission_type:'',
                mission_title: title,
                mission_destination:destination,
                depature_place:depature,
                depature_time: selectedHours+':'+selectedMinutes,
                depature_day: `${ missionType == 'programmée' ? depatureDateGive : currentDateMIssion }`,
                started_at:'',
                ended_at:'',
                mission_description:description,
              })
              .then((snapshot) => {
                console.log('Mission updated!', snapshot);
                firestore()
                    .collection('Baggage')
                    .doc('Mission')
                    .collection(missionId)
                    .get()
                    .then((resp) => {
                        console.log('response getting Baggage infos in update: ', resp.docs[0].id)
                        //update baggage infos
                        updateBaggageInfos(missionId, resp.docs[0].id, luggageVolume, baggageType)
                    })
                    .catch((error) => { console.log('error while getting baggage infos in update : ', error)})
              })
              .catch((error) => console.log('error while updating mission: ', error))
        }
    }

const updateBaggageInfos = async (theMissinCollectionId, missionDocId, vol, typ) => {
    await firestore()
      .collection('Baggage')
      .doc('Mission')
      .collection(theMissinCollectionId)
      .doc(missionDocId)
      .update({
        baggage_volume: vol,
        baggage_type:typ,
      })
      .then(() => {
        console.log('Baggage updated!');
      })
      .catch((error) => console.log('error while updating baggage infos', error))
}

const uploadBaggageImage = async (picture, baggagePath, docMissionId) => {
    console.log({baggagePath})
    console.log('dans le upload picture de profile!!!!', picture)
    const uri = picture;
    const filename = uri.substring(
        uri.lastIndexOf('/') + 1
    );
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const reference = `/baggage_pictures/${baggagePath}/` + filename

    const task = storage()
        .ref(reference)
        .putFile(uploadUri)
        .then( async (datas) => {
            console.log('picture baggage uploadée', datas)
            const imageUrl = await storage().ref(`${reference}`).getDownloadURL();
            console.log({imageUrl, baggageId: baggagePath})
            // console.log('picture baggage uploadée', datas.)
            //Insertion de l'url dans firestore
            if (imageUrl != null) {
                console.log('dans la ligne mm!!!')
                // if(!docMissionId){
                    firestore()
                        // .collection('Baggage')
                        // .doc('Missions')
                        // .collection(missionId)
                        .doc(`${baggagePath}`)
                        .collection('BaggagePicture')
                        .add({
                            imageUrl,
                        })
                // } else {
                    // firestore()
                    // //   .collection('Mission')
                    //   .doc(baggagePath)
                    //   .update({
                    //     imageUrl
                    //   })
                    //   .then(() => {
                    //     console.log('Baggage updated!');
                    //   })
                    //   .catch((error) => console.log('error while updating mission: ', error))
                // }
            }
        })
        .catch((error) => {
            console.log('erreur lors de l\'upload img baggage : ', error);
        });
};