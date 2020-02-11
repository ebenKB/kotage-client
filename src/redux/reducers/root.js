import { combineReducers } from 'redux';
import requisitionReducer from './requisitionReducer';
import userReducer from './userReducer';
import tenantReducer from './tenantReducer';

export default combineReducers({
  requisitions: requisitionReducer,
  user: userReducer,
  tenant: tenantReducer,
});
