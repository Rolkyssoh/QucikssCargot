import { 
    USER_NAME_CHANGED,
    USER_EMAIL_CHANGED,
    USER_NUMBER_CHANGED,
    USER_CITY_CHANGED,

    VEHICLE_MATRICULE_CHANGED,
    VEHICLE_MARK_CHANGED,
    VEHICLE_TYPE_CHANGED,
    VEHICLE_CAPACITY_CHANGED,
    VEHICLE_PICTURE_CHANGED,
    CREATE_NEW_CARRIER,
} from '../actions/types';

const INITIAL_STATE ={ 
    name:'',
    email:'',
    phone:'',
    city:'',
    matricule:'',
    mark:'',
    type:'',
    capacity:'',
    picture:'',
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        //infos carrier
        case USER_NAME_CHANGED:
            return { ...state, name: action.payload };
        case USER_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case USER_NUMBER_CHANGED:
            return { ...state, phone: action.payload };
        case USER_CITY_CHANGED:
            return { ...state, city: action.payload };
 
        //infos car
        case VEHICLE_MATRICULE_CHANGED:
            return { ...state, matricule: action.payload };
        case VEHICLE_MARK_CHANGED:
            return { ...state, mark: action.payload };
        case VEHICLE_TYPE_CHANGED:
            return { ...state, type: action.payload };
        case VEHICLE_CAPACITY_CHANGED:
            return { ...state, capacity: action.payload };
        case CREATE_NEW_CARRIER :
            console.log('new carrier created!')
            return { ...state }
        
        default:
            return state;
    }
}