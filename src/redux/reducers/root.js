import {combineReducers} from 'redux';
import requisitionReducer from './requisitionReducer';
import userReducer from './userReducer';

export default combineReducers({
  requisitions: requisitionReducer,
  user: userReducer,
});
