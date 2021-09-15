
const isLoggedIn = localStorage.getItem('access_token') !== null;

const loginUser = async (user) => {
  const { username, password } = user;
  console.log('!!Deploy a GitHub branch!! ' + localStorage.getItem('access_token'));
  if (username === 'm@gmail.com' && password === '12345') {
    console.log('!!AUTHENTICATED!!');
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