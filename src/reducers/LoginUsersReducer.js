import { 
    PHONE_NUMBER_CHANGED,
    SIGN_IN_USER,
    SUCCESS_SEND_CODE,
    FAIL_SEND_CODE,
} from '../actions/types';

const INITIAL_STATE ={ 
    phone:'',
    receivedCode:'',
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case PHONE_NUMBER_CHANGED :
            console.log('PHONE_NUMBER_CHANGED')
            return { ...state, phone:action.payload}
        case SIGN_IN_USER:
            return { ...state }
        case SUCCESS_SEND_CODE:
            return { ...state, receivedCode: action.payload }
        case FAIL_SEND_CODE:
            return { ...state }
        default:
            return state;
    }
}