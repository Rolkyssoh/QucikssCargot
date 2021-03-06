import { combineReducers } from 'redux';
import AuthCarrierRecuder from './AuthCarrierReducer';
import CodeConfirmReducer from './CodeConfirmReducer';
import LoginUsersReducer from './LoginUsersReducer';
import NewMissionReducer from './NewMissionReducer';
import UpdateUserInfosReducer from './UpdateUserInfosReducer';

export default combineReducers({
    authCarrier: AuthCarrierRecuder, 
    loginUsers: LoginUsersReducer, 
    confirmationCode: CodeConfirmReducer,
    NewMission: NewMissionReducer,
    UpdateUserInfos: UpdateUserInfosReducer,
})