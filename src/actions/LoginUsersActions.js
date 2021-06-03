import {
    PHONE_NUMBER_CHANGED,
    SIGN_IN_USER,
    SUCCESS_SEND_CODE, 
    FAIL_SEND_CODE,
} from './types';
import auth from '@react-native-firebase/auth';
import { customNavigate } from '../components/navigations/CustomNavigation';

export const phoneNumberChanged = (phone) => {
    return{
        type: PHONE_NUMBER_CHANGED,
        payload: phone
    }
};

export const handleSendCode = ( phone ) => {
    const phoneInternational = '+212'+`${phone}`;
    return (dispatch) => {
        dispatch({ type: SIGN_IN_USER });
        console.log('le numéro dans handleSendCode est : ', phoneInternational);

        auth().signInWithPhoneNumber(phoneInternational, true)
            .then(receivedCode => {
                console.log('confirmeResult : ', receivedCode);
                dispatch({ type: SUCCESS_SEND_CODE, payload: receivedCode })
                customNavigate('ConfirmCode')
            })  
            .catch((error) => {
                console.log('Pas de code : ', error);
                dispatch({ type: FAIL_SEND_CODE}) 
            })
    };
};