import { combineReducers } from 'redux';
import AuthCarrierRecuder from './AuthCarrierReducer';
import CodeConfirmReducer from './CodeConfirmReducer';
import LoginUsersReducer from './LoginUsersReducer';

export default combineReducers({
    authCarrier: AuthCarrierRecuder, 
    loginUsers: LoginUsersReducer,
    confirmationCode: CodeConfirmReducer 
})