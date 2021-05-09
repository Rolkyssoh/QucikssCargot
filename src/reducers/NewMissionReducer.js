import {
    DESTINATION_CHANGED,
    DEPATURE_CHANGED,
    START_TIME_CHANGED,
    DESCRIPTION_CHANGED,
    VOLUME_BAGGAGE_CHANGED,
    BAGGAGE_TYPE_CHANGED,
    BAGGAGE_IMAGE1_CHANGED,
    BAGGAGE_IMAGE2_CHANGED,
    BAGGAGE_IMAGE3_CHANGED,
    BAGGAGE_IMAGE4_CHANGED,
    CREATE_NEW_MISSION
} from '../actions/types';

const INITIAL_STATE = {
    destination:'',
    depature:'',
    startTime:'',
    description:'',
    luggageVolume:'',
    baggageType:'',
    baggageImage1:'',
    baggageImage2:'',
    baggageImage3:'',
    baggageImage4:'',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DESTINATION_CHANGED:
            return { ...state, destination: action.payload };
        case DEPATURE_CHANGED:
            return { ...state, depature: action.payload };
        case START_TIME_CHANGED:
            return { ...state, startTime: action.payload };
        case DESCRIPTION_CHANGED:
            return { ...state, description: action.payload };
        case VOLUME_BAGGAGE_CHANGED:
            return { ...state, luggageVolume: action.payload };
        case BAGGAGE_TYPE_CHANGED:
            return { ...state, baggageType: action.payload };
        case BAGGAGE_IMAGE1_CHANGED:
            console.log('dans le state image1')
            return { ...state, baggageImage1: action.payload };
        case BAGGAGE_IMAGE2_CHANGED:
            return { ...state, baggageImage2: action.payload };
        case BAGGAGE_IMAGE3_CHANGED:
            return { ...state, baggageImage3: action.payload };
        case BAGGAGE_IMAGE4_CHANGED:
            return { ...state, baggageImage4: action.payload };
        case CREATE_NEW_MISSION:
            return { ...state }
        default:
            return state;
    }
}