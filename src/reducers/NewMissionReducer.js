import {
    TITLE_CHANGED,
    DESTINATION_CHANGED,
    DEPATURE_CHANGED,
    START_HOURS_CHANGED,
    START_MINUTES_CHANGED,
    START_DAY_CHANGED,
    START_DATE_CHANGED,
    START_MONTH_CHANGED,
    START_YEAR_CHANGED,
    MISSION_TYPE_CHANGED,
    DESCRIPTION_CHANGED,
    VOLUME_BAGGAGE_CHANGED,
    BAGGAGE_TYPE_CHANGED,
    BAGGAGE_IMAGE1_CHANGED,
    BAGGAGE_IMAGE2_CHANGED,
    BAGGAGE_IMAGE3_CHANGED,
    BAGGAGE_IMAGE4_CHANGED,
    CREATE_NEW_MISSION,
    UPDATE_AND_EXISTING_MISSION,
    CONVEYANCE_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
    isLoading:false,
    title:'',
    destination:'',
    depature:'',
    selectedHours:0,
    // dateTime: new Date(),
    selectedMinutes:0, 
    selectedDay:'',
    selectedDate:'',
    selectedMonth:'',
    selectedYear:'',
    missionType: 'instantanée',
    description:'',
    luggageVolume:'',
    baggageType:'',
    baggageImage1:'',
    baggageImage2:'',
    baggageImage3:'',
    baggageImage4:'',
    transportation:'',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TITLE_CHANGED:
            return { ...state, title: action.payload }
        case DESTINATION_CHANGED:
            return { ...state, destination: action.payload };
        case DEPATURE_CHANGED:
            return { ...state, depature: action.payload };
        case START_HOURS_CHANGED:
            return { ...state, selectedHours: action.payload };
        case START_MINUTES_CHANGED:
            return { ...state, selectedMinutes: action.payload };
        case START_DAY_CHANGED :
            return { ...state , selectedDay: action.payload } 
        case START_DATE_CHANGED :
            return { ...state , selectedDate: action.payload } 
        case START_MONTH_CHANGED :
            return { ...state , selectedMonth: action.payload } 
        case START_YEAR_CHANGED :
            return { ...state , selectedYear: action.payload }
        case MISSION_TYPE_CHANGED:  
            return { ...state, missionType: action.payload }
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
            return { ...state };
        case UPDATE_AND_EXISTING_MISSION:
            return { ...state }
        case CONVEYANCE_CHANGED:
            return { ...state, transportation: action.payload }
        default:
            return state;
    }
}