/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ children, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={({ location }) => ((isAuthenticated) ? (children
		) : (
			<Redirect
				to={{ pathname: '/auth/signin', state: { from: location } }}
			/>
		))}
	/>
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  accountType: state.user.accountType,
});

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  accountType: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  accountType: null,
};

export default connect(mapStateToProps, null)(ProtectedRoute);
