import {
    USER_NAME_UPDATED,
    USER_EMAIL_UPDATED,
    USER_CITY_UPDATED,
    UPDATING_USER_INFOS,
    USER_ID_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
    userId:'',
    name:'',
    email:'',
    city:'',
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_ID_CHANGED:
            console.log('user de id current en action!!!')
            return { ...state, userId: action.payload };
        case USER_NAME_UPDATED:
            return { ...state, name: action.payload }; 
        case USER_EMAIL_UPDATED:
            return { ...state, email: action.payload };
        case USER_CITY_UPDATED:
            return { ...state, city: action.payload };
        case UPDATING_USER_INFOS:
            return {...state }
        default:
            return state;
    }
}