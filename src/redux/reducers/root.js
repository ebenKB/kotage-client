import {combineReducers} from 'redux';
import requisitionReducer from './requisitionReducer';

export default combineReducers({
  requisitions: requisitionReducer,
});
