import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const Private = ({ component: Component, ...rest }) => {
  console.log('1.PrivateRoute...');
  const userAuth = localStorage.getItem('userAuth');
  console.log('2.PrivateRoute...');
  console.log(userAuth);
  const isValidUser = () => {
    console.log('..isValidUser..');
    if (localStorage.getItem('userAuth') !== null) {
      const userAuth = localStorage.getItem('userAuth');
      console.log(userAuth);
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
    console.log('..isValidUser.. END!!');
    return false;
  }

  console.log('20.PrivateRoute...');
  console.log(isValidUser);
  console.log('30.PrivateRoute...');

  return (
    <div>Simon</div>
  );
}

export default Private;