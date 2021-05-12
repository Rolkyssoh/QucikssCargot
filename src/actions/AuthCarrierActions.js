import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { 
    CARRIER_NAME_CHANGED,
    CARRIER_EMAIL_CHANGED,
    CARRIER_NUMBER_CHANGED,
    CARRIER_CITY_CHANGED,

    VEHICLE_MATRICULE_CHANGED,
    VEHICLE_MARK_CHANGED,
    VEHICLE_CAPACITY_CHANGED,
    VEHICLE_TYPE_CHANGED,
    SELECT_DRIVING_PICTURE,
    VEHICLE_PICTURE_CHANGED,

    CREATE_NEW_CARRIER,
    DRIVER_LICENSE_UPLOADED_SUCCESS
} from './types';
import { customNavigate } from '../components/navigations/CustomNavigation';

export const userNameChanged = (name) => {
    return{
        type:CARRIER_NAME_CHANGED,
        payload: name
    }
};

//carrier infos
export const userEmailChanged = (email) => {
    return{
        type: CARRIER_EMAIL_CHANGED,
        payload: email
    }
};

export const userNumberChanged = (phone) => {
    return {
        type: CARRIER_NUMBER_CHANGED,
        payload: phone
    }
};

export const userCityChanged = (city) => {
    return {
        type: CARRIER_CITY_CHANGED,
        payload: city
    }
};

//Vehicle infos
export const vehicleMatriculeChanged = (matricule) => {
    return {
        type: VEHICLE_MATRICULE_CHANGED,
        payload: matricule
    }
};
export const vehicleMarkChanged = (mark) => {
    return {
        type: VEHICLE_MARK_CHANGED,
        payload: mark
    }
};
export const vehicleTypeChanged = (type) => {
    return {
        type: VEHICLE_TYPE_CHANGED,
        payload: type
    }
}
export const vehicleCapacityChanged = (capacity) => {
    return {
        type: VEHICLE_CAPACITY_CHANGED,
        payload: capacity
    }
};
export const vehiclePictureChanged = (carPicture) => {
    return {
        type: VEHICLE_PICTURE_CHANGED,
        payload: carPicture
    }
}

export const drivingPictSelected = (drivingPicture) => {
    return {
        type: SELECT_DRIVING_PICTURE,
        payload: drivingPicture
    }
}

// export const createNewCarrier = ({ name, email, phone, city, matricule, mark, type, capacity }) =>{
//     return async (dispatch) => {
//         dispatch({ type: CREATE_NEW_CARRIER });

//         console.log('signup dooo')
//         await Axios.post(
//                 `http://192.168.100.2:3000/auth-carrier/signupcarrier`,
//                 {
//                     name, email, phoneNumber:phone, city,
//                     matricule, mark, type, capacity,
//                 })
//             .then(response => {
//                 console.log('post of signup : ', response)
//             })
//             .catch((error) => {
//                 if(error.response){
//                     console.log('signupcarrier error.response: ', error.response)
//                 } else if (error.request) {
//                     console.log('signupcarrier error.request: ', error.request)
//                 } else if (error.message)
//                     console.log('message error : ', error.message)
//             })
//     } 
// }
export const createNewCarrier = ({ name, email, phone, city, matricule, mark, type, capacity, drivingPicture, carPicture }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_NEW_CARRIER });
        console.log('Creation du nouveau transporteur', drivingPicture)
        firestore()
            .collection('Users')
            .add({
                activated: false, 
                isAdmin: false,
                isCarrier: true,
                username:name,
                useremail:email,
                userPhoneNumber:phone,
                userCity:city,
                drivingLicencsePictureUrl:'',
                vehicleMatricul:matricule,
                vehicleMark:mark,
                vehicleType:type,
                vehicleCapacity:capacity, 
                vehiclePicture:''
            })
            .then((snapshot)=>{
                console.log('user added!!', snapshot._documentPath._parts[1]);
                uploadImage(drivingPicture, snapshot._documentPath._parts[1]);
                uploadCarImage(carPicture, snapshot._documentPath._parts[1]);
                dispatch({type: DRIVER_LICENSE_UPLOADED_SUCCESS})
                customNavigate('Awaiting');
            })
            .catch((error)=> {
                console.log('erreor while add user : ', error)
            })
    }
};

const uploadImage = async (photo, userId) => {
    console.log('dans le upload photo de profile!!!!', photo)
    const uri = photo;
    const filename = uri.substring(
        uri.lastIndexOf('/') + 1
    );
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // create bucket storage reference to not yet existing image
    // const reference = firebase.storage().ref('photo_profile');
    const reference = `/driver_licencse_picture/${userId}/` + filename

    const task = storage() 
        // .ref(/filename)
        .ref(reference)
        .putFile(uploadUri)
        .then((datas) => {
            console.log('Photo uploadée', datas)
            //Insertion de l'url dans firestore
            if (photo != null) {
                firestore()
                    .collection('Users')
                    .doc(`${userId}`)
                    .update({
                        drivingLicencsePictureUrl: reference,
                    })
            }
        })
        .catch((error) => {
            console.log('erreur lors de l\'upload : ', error);
        });
};
const uploadCarImage = async (photo, userId) => {
    console.log('dans le upload photo de profile!!!!', photo)
    const uri = photo;
    const filename = uri.substring(
        uri.lastIndexOf('/') + 1
    );
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    // create bucket storage reference to not yet existing image
    // const reference = firebase.storage().ref('photo_profile');
    const reference = `/car_picture/${userId}/` + filename

    const task = storage()
        // .ref(/filename)
        .ref(reference)
        .putFile(uploadUri)
        .then((datas) => {
            console.log('Photo uploadée', datas)
            //Insertion de l'url dans firestore
            if (photo != null) {
                firestore()
                    .collection('Users')
                    .doc(`${userId}`)
                    .update({
                        vehiclePicture: reference
                    })
            }
        })
        .catch((error) => {
            console.log('erreur lors de l\'upload : ', error);
        });
};
