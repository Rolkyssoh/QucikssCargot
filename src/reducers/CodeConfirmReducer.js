import {
    DIGIT1_CHANGED,
    DIGIT2_CHANGED,
    DIGIT3_CHANGED,
    DIGIT4_CHANGED,
    DIGIT5_CHANGED,
    DIGIT6_CHANGED,
    CONFIRM_CODE,
    SUCCESS_CONFIRMATION,
    FAIL_CONFIRMATION
} from '../actions/types';

const INITIAL_STATE = {
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
    userDatas: null,
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DIGIT1_CHANGED:
            console.log('dansle reducer: ', action.payload )
            return { ...state, digit1: action.payload };
        case DIGIT2_CHANGED:
            return { ...state, digit2: action.payload };
        case DIGIT3_CHANGED:
            return { ...state, digit3: action.payload };
        case DIGIT4_CHANGED:
            return { ...state, digit4: action.payload };
        case DIGIT5_CHANGED:
            return { ...state, digit5: action.payload };
        case DIGIT6_CHANGED:
            return { ...state, digit6: action.payload };
        case CONFIRM_CODE:
            return { ...state, loading: true };
        // case SUCCESS_CONFIRMATION:
        //     return { ...state, userDatas: action.payload, loading: false };
        // case FAIL_CONFIRMATION:
        //     return { ...state, loading: false }
        default:
            return state;
    }
}