import Axios from 'axios';
import { 
    USER_NAME_CHANGED,
    USER_EMAIL_CHANGED,
    USER_NUMBER_CHANGED,
    USER_CITY_CHANGED,

    VEHICLE_MATRICULE_CHANGED,
    VEHICLE_MARK_CHANGED,
    VEHICLE_CAPACITY_CHANGED,
    VEHICLE_TYPE_CHANGED,
    VEHICLE_PICTURE_CHANGED,

    CREATE_NEW_CARRIER,
} from './types';

export const userNameChanged = (name) => {
    return{
        type:USER_NAME_CHANGED,
        payload: name
    }
};

//carrier infos
export const userEmailChanged = (email) => {
    return{
        type: USER_EMAIL_CHANGED,
        payload: email
    }
};

export const userNumberChanged = (phone) => {
    return {
        type: USER_NUMBER_CHANGED,
        payload: phone
    }
};

export const userCityChanged = (city) => {
    return {
        type: USER_CITY_CHANGED,
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

export const createNewCarrier = ({ name, email, phone, city, matricule, mark, type, capacity }) =>{
    return async (dispatch) => {
        dispatch({ type: CREATE_NEW_CARRIER });

        console.log('signup dooo')
        await Axios.post(
                `http://192.168.100.2:3000/auth-carrier/signupcarrier`,
                {
                    name, email, phoneNumber:phone, city,
                    matricule, mark, type, capacity,
                })
            .then(response => {
                console.log('post of signup : ', response)
            })
            .catch((error) => {
                if(error.response){
                    console.log('signupcarrier error.response: ', error.response)
                } else if (error.request) {
                    console.log('signupcarrier error.request: ', error.request)
                } else if (error.message)
                    console.log('message error : ', error.message)
            })
    }
}
