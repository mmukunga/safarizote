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
  
  let authedUser = {};
  let isSignedUp = {};
  axios.post('/api/login', userAuth).then((response) => {     
      console.log(response);
      console.log(response.data);

      userAuth.token = response.data.token;
      
      axios.post('/api/verify', userAuth).then((res) => {
          authedUser = res;
      }).catch(err => {
          console.log(err);
      });   

  }).then(()=> {
    isSignedUp = authedUser;
  }).catch(err => {
      console.log('error in catch', err);
  });
  
  console.log('1.authedUser');
  console.log(isSignedUp);
  console.log('2.authedUser')

  if (username === 'm@gmail.com' && password === '12345') {
    return { token: 'access_token' };
  } else {
    throw new Error('Wrong username or password');
  }
}

const logOut = () => {
  localStorage.setItem('jwt_token', 'PleaseLogIn');
}

export default { isLoggedIn, loginUser, logOut };