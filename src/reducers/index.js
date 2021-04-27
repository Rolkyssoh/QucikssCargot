import { combineReducers } from 'redux';
import AuthCarrierReuder from './AuthCarrierReducer';

export default combineReducers({
    authCarrier: AuthCarrierReuder
})