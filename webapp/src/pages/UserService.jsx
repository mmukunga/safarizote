import React from 'react';
import axios from 'axios';

const isLoggedIn = () => {
  return localStorage.getItem('jwt_token');
}

const loginUser = async (user) => {
  const {username, password} = user;
  console.log('!!Deploy a GitHub branch!! ' + localStorage.getItem('jwt_token'));

  const userAuth = { 
    email: username,
    password: password,
    token: '',
    dateCreated: new Date() 
  };
  
  let isSignedUp = await axios.post('/api/login', userAuth).then((response) => {     
      console.log(response);
      console.log(response.data);

      userAuth.token = response.data.token;
      
      return axios.post('/api/verify', userAuth).then((res) => {
        console.log(res);
          return res;
      }).catch(err => {
          console.log(err);
      });   

  }).catch(err => {
      console.log('error in catch', err);
  });
  
  console.log('1.authedUser');
  console.log(isSignedUp);
  console.log('2.authedUser')

  if (username === 'm@gmail.com' && password === '12345') {
    return { token: 'true' };
  } else {
    throw new Error('Wrong username or password');
  }
}

const logOut = () => {
  localStorage.setItem('jwt_token', 'PleaseLogIn');
}

export default { isLoggedIn, loginUser, logOut };