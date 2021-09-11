import React from "react";

const isLoggedIn = localStorage.getItem('access_token') !== null;

const loginUser = async (user) => {
  const { username, password } = user;
  if (username === 'm@gmail.com' && password === '12345') {
    return { token: 'access_token' };
  } else {
    throw new Error('Wrong username or password');
  }
}

export default { isLoggedIn, loginUser };