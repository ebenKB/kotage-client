import { combineReducers } from 'redux';
import requisitionReducer from './requisitionReducer';
import userReducer from './userReducer';
import tenantReducer from './tenantReducer';
import countryReducer from './countryReducer';
import appReducer from './appReducer';
import proposalReducer from './rfpReducer';

export default combineReducers({
  requisitions: requisitionReducer,
  rfp: proposalReducer,
  user: userReducer,
  tenant: tenantReducer,
  countries: countryReducer,
  app: appReducer,
});
