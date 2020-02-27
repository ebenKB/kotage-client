/* eslint-disable function-paren-newline */
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';

const initialState = {};

const middleware = [thunk, logger];

const store = createStore(rootReducer,
  initialState,
  applyMiddleware(...middleware),
);

const persistor = persistStore(store);

// export { store, persistor };

export { store, persistor };
