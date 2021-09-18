
const isLoggedIn = () => {
  return localStorage.getItem('jwt_token');
}

const loginUser = async (user) => {
  const {username, password} = user;
  console.log('UserService.jsx:= ' + localStorage.getItem('jwt_token'));

  if (username === 'm@gmail.com' && password === '12345') {
    return { token: 'access_token' };
  } else {
    throw new Error('Wrong username or password');
  }
}

const logOut = () => {
  localStorage.setItem('jwt_token', 'null');
}

export default { isLoggedIn, loginUser, logOut };