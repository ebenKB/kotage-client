import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import requisitionReducer from './requisitionReducer';
import userReducer from './userReducer';
import tenantReducer from './tenantReducer';
import countryReducer from './countryReducer';
import appReducer from './appReducer';
import proposalReducer from './rfpReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'tenant', 'requisitions', 'app'],
};

const rootReducer = combineReducers({
  requisitions: requisitionReducer,
  rfp: proposalReducer,
  user: userReducer,
  tenant: tenantReducer,
  countries: countryReducer,
  app: appReducer,
});

// export default combineReducers({
//   requisitions: requisitionReducer,
//   user: userReducer,
//   tenant: tenantReducer,
//   countries: countryReducer,
//   app: appReducer,
// });

export default persistReducer(persistConfig, rootReducer);
