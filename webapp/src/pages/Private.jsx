import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const Private = ({ component: Component, ...rest }) => {
  console.log('1...PrivateRoute...');
  const userToken = localStorage.getItem('userToken')
  console.log('2...PrivateRoute...');
  console.log(userToken);
  const isValidUser = () => {
    console.log('..isValidUser..');
    if (localStorage.getItem('userToken') !== null) {
      console.log(userToken);
      return axios.post('/api/verify', {
          token: userToken,
          username: 'm@gmail.com'
      }).then(response => {
          console.log(response);
         return true;
      }).catch(error => {
          console.log(error);
          return false;
      });
    }
  }

  console.log('20...PrivateRoute...');
  console.log(isValidUser);
  console.log('30...PrivateRoute...');


  if (isValidUser) { 
    console.log('40...PrivateRoute...');
    return 'Mukunga Macharia Simon';
   }

   const errorCondition = true;
   return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isValidUser ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}

export default Private;