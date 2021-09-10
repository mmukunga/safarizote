import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

const Private = ({ component: Component, ...rest }) => {
  console.log('1...PrivateRoute...');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          setIsLoggedIn(true);
         return true;
      }).catch(error => {
          console.log(error);
          setIsLoggedIn(true);
          return false;
      });
    } else {
      setIsLoggedIn(false);
    }
  }

  console.log('20...PrivateRoute...');
  console.log(isValidUser);
  console.log('30...PrivateRoute...');

  //var isLoggedIn =  isValidUser();
  if (!isValidUser()) { 
    console.log('40...PrivateRoute...');
    console.log('USER NOT VALID');
  } else {
    console.log('USER VALID. BINGO!!');
  }

  console.log(isLoggedIn);

   return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to={{pathname: "/signIn", state: { from: props.location } }}
      />;
      }}
    />
  );
}

export default Private;