import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Layout from '../Layout/layout';

const ProtectedRoute = ({component, ...rest}) => {
  return (
	<Route
      {...rest}
      render = {({location}) => 
      1===1 ? (
      component
      ) : (
	      <Redirect
          to={{
            pathname: "/auth/signin",
            state: {from : location}
          }}
        />
      )
      }
    />
  )
}

export default ProtectedRoute
