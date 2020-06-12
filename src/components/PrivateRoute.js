import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children }) => (
  <Route
    render={({ location }) =>
      localStorage.getItem('username') ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
