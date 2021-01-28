import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from "react-router";

const Private = ({ component: Component, ...props }) => {
  console.log('PrivateRoute...');
  return (
    <Route
      {...props}
      render={innerProps =>
        localStorage.getItem("token") ? (
          <Component {...innerProps} />
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