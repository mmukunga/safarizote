import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const Private = ({ component: Component, ...rest }) => {
  console.log('PrivateRoute...');

  // auth.js
const isValidUser = () => {
  if (localStorage.getItem('userAuth') !== null) {
    const userAuth = localStorage.getItem('userAuth');
    axios.post('/api/verify', {
        token: userAuth.token,
        username: userAuth.username
    }).then(response => {
        console.log(response);
        return true;
    }).catch(error => {
        console.log(error);
        return false;
    });
  }
}

  return (
    <Route
      {...rest}
      render={(props) =>
        isValidUser ? (
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