import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const Private = ({ component: Component, ...rest }) => {
  console.log('PrivateRoute...');
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signIn",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default Private;