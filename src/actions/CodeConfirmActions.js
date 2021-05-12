import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { customNavigate } from '../components/navigations/CustomNavigation';
import {
    DIGIT1_CHANGED,
    DIGIT2_CHANGED,
    DIGIT3_CHANGED,
    DIGIT4_CHANGED,
    DIGIT5_CHANGED,
    DIGIT6_CHANGED,
    CONFIRM_CODE,
    SUCCESS_CONFIRMATION,
    USER_IS_CONNECTED,
    FAIL_CONFIRMATION,
    USER_LOGGED_OUT
} from './types';

export const digit1Changed = (digit1) => {
    return {
        type: DIGIT1_CHANGED,
        payload: digit1
    };
};
export const digit2Changed = (digit2) => {
    return {
        type: DIGIT2_CHANGED,
        payload: digit2
    };
};
export const digit3Changed = (digit3) => {
    return {
        type: DIGIT3_CHANGED,
        payload: digit3
    };
};
export const digit4Changed = (digit4) => {
    return {
        type: DIGIT4_CHANGED,
        payload: digit4
    };
};
export const digit5Changed = (digit5) => {
    return {
        type: DIGIT5_CHANGED,
        payload: digit5
    };
};
export const digit6Changed = (digit6) => {
    return {
        type: DIGIT6_CHANGED,
        payload: digit6
    };
};

export const authStateChanged = (user) => {
    return {
        type: USER_IS_CONNECTED,
        payload: user
    };
};

export const loggedOut = () => {
    return(dispatch) => {
        dispatch({ type: USER_LOGGED_OUT });
        auth()
        .signOut()
        .then(() => console.log('user signed out!!!'))
        .catch((error) => console.log('error while user sign out!', error))
    }
}

export const confirmCode = ({ receivedCode, enteredCode}) => {
    return (dispatch) => {
        dispatch({ type: CONFIRM_CODE});

        if(receivedCode && enteredCode.length == 6){
            receivedCode.confirm(enteredCode)
                .then((datas)=> {
                    dispatch({ type: SUCCESS_CONFIRMATION, payload:datas.user})
                    console.log('code confirmé: ', datas);
                    //on vérifie si le user est déjà dans la base de données
                    firestore()
                        .collection('Users')
                        .where("userPhoneNumber", "==", datas.user.phoneNumber) 
                        .get()
                        .then((snapshatUser) => {
                            console.log('user exist ou pas: ', snapshatUser);
                            if(snapshatUser.docs.length <= 0){
                                //ie Aucun user avec ce numéro; donc on l'ajoute
                                addNewUser(datas.user.uid, datas.user.phoneNumber)
                            } else {
                                //ici le user existe déjà dans firestore
                                //on vérifie que son compte est actif
                                isAccountActivated(datas.user.uid)
                            }
                        })
                        .catch((error) =>{ console.log('erreur lors de recherche par numéro: ', error)})
                })
                .catch((error)=>{
                    console.log('erreur lors de la confirmation:', error);
                    dispatch({ type: FAIL_CONFIRMATION })
                })
        }

    }
};

const addNewUser = (userId,phoneNum) => {
    firestore()
        .collection('Users')
        .doc(userId)
        .set({
            activated: true,
            isAdmin: false,
            isCarrier: false,
            username:'',
            useremail:'',
            userPhoneNumber:phoneNum,
            userCity:'',
        })
        .then((response) => { 
            console.log('user Added!!!', response);
            customNavigate('NavTab')
        })
        .catch((error) => { console.log('error while adding new user: ', error)})
};

const isAccountActivated = (userId) => {
    firestore()
        .collection('User')
        .doc(userId)
        .get()
        .then((AccountSnapshot) => {
            console.log('resultat de retourné:', AccountSnapshot.data());
            AccountSnapshot.data().activated ?
                // on vérifie si c'est un admin
                AccountSnapshot.data().isAdmin ? 
                    //si c'est un admin on redirige vers la partie admin
                    customNavigate('AdminNav')
                // sinon on vérifie si c'est un transporteur
                : AccountSnapshot.data().isCarrier ?
                        //si c'est un transporteur on le redirige vers son compte
                        customNavigate('CarrierNav')
                   //sinon redirige vers le client
                  : customNavigate('NavTab')  
                    
            //compte pas encore activé
            : customNavigate('Awaiting') 
        })
        .catch((error)=>{ console.log('error while check activation:',error)})
}