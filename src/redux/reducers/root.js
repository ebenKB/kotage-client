import { combineReducers } from 'redux';
import requisitionReducer from './requisitionReducer';
import userReducer from './userReducer';
import tenantReducer from './tenantReducer';
import countryReducer from './countryReducer';

export default combineReducers({
  requisitions: requisitionReducer,
  user: userReducer,
  tenant: tenantReducer,
  countries: countryReducer,
});
