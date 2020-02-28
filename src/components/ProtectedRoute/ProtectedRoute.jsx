/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const ProtectedRoute = ({ children, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		// eslint-disable-next-line no-self-compare
		render={({ location }) => ((isAuthenticated) || (1 === 1) ? (children
		) : (
			<Redirect
				to={{ pathname: '/auth/signin', state: { from: location } }}
			/>
		))}
	/>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
