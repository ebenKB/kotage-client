import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOGOUT, LOGIN } from '../types/userTypes';
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

const rootReducer = (oldState, action) => {
  let newState = oldState;
  if (action.type === LOGOUT) {
    storage.removeItem('persist:root');
    newState = { ...newState, user: undefined, tenant: undefined };
  } else if (action.type === LOGIN) {
    const { user: { currentUser: { id } } } = newState;
    if (id !== action.payload.id) {
      newState = {}; // clear cached data
    }
  }
  return reducers(newState, action);
};

export default persistReducer(persistConfig, rootReducer);
