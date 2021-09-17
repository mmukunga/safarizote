
const isLoggedIn = () => {
  localStorage.setItem('jwt_token', 'access_token');
  return localStorage.getItem('jwt_token');
}

const loginUser = async (userAuth) => {
  console.log('!!Deploy a GitHub branch!! ' + localStorage.getItem('jwt_token'));

  if (userAuth.username === 'm@gmail.com' && userAuth.password === '12345') {
    console.log('!!AUTHENTICATED!!');
    localStorage.setItem('jwt_token', 'access_token');
    return { token: 'access_token' };
  } else {
    throw new Error('Wrong username or password');
  }
}

const logOut = () => {
  console.log('1..UserService.logOut..');
  localStorage.clear();
  console.log('2...UserService.logOut..');
}

export default { isLoggedIn, loginUser, logOut };