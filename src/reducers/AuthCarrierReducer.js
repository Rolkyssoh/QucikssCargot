import { 
    CARRIER_NAME_CHANGED,
    CARRIER_EMAIL_CHANGED,
    CARRIER_NUMBER_CHANGED,
    CARRIER_CITY_CHANGED,

    VEHICLE_MATRICULE_CHANGED,
    VEHICLE_MARK_CHANGED,
    VEHICLE_TYPE_CHANGED,
    VEHICLE_CAPACITY_CHANGED,
    SELECT_DRIVING_PICTURE,
    VEHICLE_PICTURE_CHANGED,
    CREATE_NEW_CARRIER,
    DRIVER_LICENSE_UPLOADED_SUCCESS,
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
    drivingPicture:'',
    carPicture:'',
    loading:false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        //infos carrier
        case CARRIER_NAME_CHANGED:
            return { ...state, name: action.payload };
        case CARRIER_EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case CARRIER_NUMBER_CHANGED:
            return { ...state, phone: action.payload };
        case CARRIER_CITY_CHANGED:
            return { ...state, city: action.payload };
        case SELECT_DRIVING_PICTURE:
            return { ...state, drivingPicture: action.payload };
 
        //infos car
        case VEHICLE_MATRICULE_CHANGED:
            return { ...state, matricule: action.payload };
        case VEHICLE_MARK_CHANGED:
            return { ...state, mark: action.payload };
        case VEHICLE_TYPE_CHANGED:
            return { ...state, type: action.payload };
        case VEHICLE_CAPACITY_CHANGED:
            return { ...state, capacity: action.payload };
        case VEHICLE_PICTURE_CHANGED:
            return { ...state, carPicture: action.payload };
        case CREATE_NEW_CARRIER :
            console.log('new carrier created!')
            return { ...state, loading:true }
        case DRIVER_LICENSE_UPLOADED_SUCCESS:
            return { ...state, loading:false }
        
        default:
            return state;
    }
}