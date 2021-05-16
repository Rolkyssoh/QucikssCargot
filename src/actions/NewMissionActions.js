import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
    DESTINATION_CHANGED,
    DEPATURE_CHANGED,
    START_TIME_CHANGED,
    DESCRIPTION_CHANGED,
    VOLUME_BAGGAGE_CHANGED,
    BAGGAGE_TYPE_CHANGED,
    CREATE_NEW_MISSION,
    BAGGAGE_IMAGE1_CHANGED,
    BAGGAGE_IMAGE2_CHANGED,
    BAGGAGE_IMAGE3_CHANGED,
    BAGGAGE_IMAGE4_CHANGED,
} from './types';

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
export const startTimeChanged = (startTime) => {
    return{
        type: START_TIME_CHANGED,
        payload: startTime
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

export const createNewMission = ({destination, depature, startTime, description, luggageVolume, baggageType,
    baggageImage1, baggageImage2, baggageImage3,baggageImage4, userId} ) => {
    const date = new Date()
    const missionDate = date.getDate() + "/" + (date.getMonth() + 1)+"/"+date.getFullYear()
    const missionHour = date.getHours()+":"+date.getMinutes();
    return async (dispatch) => {
        dispatch({ type: CREATE_NEW_MISSION });
        console.log('Dans le create new mission!!!')
        firestore()
        .collection('Mission')
        .add({
            activated: false,
            miision_type:'',
            creation_day: missionDate,
            creation_hour: missionHour,
            mission_destination:destination,
            depature_place:depature,
            depature_time:startTime,
            started_at:'',
            ended_at:'',
            mission_description:description,
            user_id: userId
        })
        .then((snapshot)=>{
            console.log('user added!!', snapshot);
            // dispatch({type: DRIVER_LICENSE_UPLOADED_SUCCESS})
            // customNavigate('Awaiting');
            firestore()
            .collection('Baggage')
            .add({
                baggage_volume: luggageVolume,
                baggage_type:baggageType,
                baggage_picture:''
            })
            .then((snapshot)=>{
                console.log('Baggage added!!', snapshot._documentPath._parts[1]);
                uploadBaggageImage(baggageImage1, snapshot._documentPath._parts[1]);
                uploadBaggageImage(baggageImage2, snapshot._documentPath._parts[1]);
                uploadBaggageImage(baggageImage3, snapshot._documentPath._parts[1]);
                uploadBaggageImage(baggageImage4, snapshot._documentPath._parts[1]);
                // dispatch({type: DRIVER_LICENSE_UPLOADED_SUCCESS})
                // customNavigate('Awaiting');
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

const uploadBaggageImage = async (picture, baggageId) => {
    console.log('dans le upload picture de profile!!!!', picture)
    const uri = picture;
    const filename = uri.substring(
        uri.lastIndexOf('/') + 1
    );
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // create bucket storage reference to not yet existing image
    // const reference = firebase.storage().ref('picture_profile');
    const reference = `/baggage_pictures/${baggageId}/` + filename

    const task = storage() 
        .ref(reference)
        .putFile(uploadUri)
        .then((datas) => {
            console.log('picture baggage uploadée', datas)
            //Insertion de l'url dans firestore
            if (picture != null) {
                firestore()
                    .collection('Baggage')
                    .doc(`${baggageId}`)
                    .update({
                        baggage_picture: reference,
                    })
            }
        })
        .catch((error) => {
            console.log('erreur lors de l\'upload img baggage : ', error);
        });
};