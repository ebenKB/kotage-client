/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
// import { store, persistor } from './redux/store';

import { store, persistor } from './redux/store';
import App from './App';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<PersistGate persistor={persistor} loading={null}>
				<App />
			</PersistGate>
		</Router>
	</Provider>,
	document.getElementById('root'),
);
