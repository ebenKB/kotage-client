import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOGOUT } from '../types/userTypes';
import requisitionReducer from './requisitionReducer';
import userReducer from './userReducer';
import tenantReducer from './tenantReducer';
import countryReducer from './countryReducer';
import appReducer from './appReducer';
import proposalReducer from './rfpReducer';
import supplierRfpReducer from './supplierRfpReducer';
import supplierBidReducer from './supplierBidReducer';
import uiReducer from './ui';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'tenant', 'requisitions', 'app', 'supplierRfp', 'ui'],
};

const reducers = combineReducers({
  requisitions: requisitionReducer,
  rfp: proposalReducer,
  user: userReducer,
  tenant: tenantReducer,
  countries: countryReducer,
  app: appReducer,
  supplierRfp: supplierRfpReducer,
  supplierBids: supplierBidReducer,
  ui: uiReducer,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === LOGOUT) {
    storage.removeItem('persist:root');
    // newState = undefined;
    newState = { ...newState, user: undefined, tenant: undefined };
  }
  return reducers(newState, action);
};

export default persistReducer(persistConfig, rootReducer);
