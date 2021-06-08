import firestore from '@react-native-firebase/firestore';
import { customNavigate } from '../components/navigations/CustomNavigation';
import { 
    USER_NAME_UPDATED,
    USER_EMAIL_UPDATED,
    USER_CITY_UPDATED,
    UPDATING_USER_INFOS,
    USER_ID_CHANGED,
} from './types';

export const userIdChanged = (userId) => {
    return {
        type: USER_ID_CHANGED, 
        payload: userId
    }
}

export const updatedName = (name) => {
    return {
        type: USER_NAME_UPDATED,
        payload: name
    }
};
export const updatedEmail = (email) => {
    return {
        type: USER_EMAIL_UPDATED,
        payload: email
    }
};
export const updatedCity = (city) => {
    return {
        type: USER_CITY_UPDATED,
        payload: city
    }
};

export const updateInfosUser = ({ userId, name, email, city }) => {
    console.log('dans le actions update: ', userId)
    return(dispatch) => {
        dispatch({ type: UPDATING_USER_INFOS })
        firestore()
            .collection('Users')
            .doc(userId)
            .update({
                username: name,
                useremail: email,
                userCity: city
            })
            .then(() => { 
                console.log('User updated!!!');
                customNavigate('NavTab')
             })
            .catch((error) => { console.log('error while updating user : ', error) })
    }
}

