
const isLoggedIn = localStorage.getItem('access_token') !== null;

const loginUser = async (user) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const { username, password } = user;
  if (username === 'm@gmail.com' && password === '12345') {
    setIsLoggedIn(true);
    return { token: 'access_token' };
  } else {
    throw new Error('Wrong username or password');
  }
}

export default { isLoggedIn, loginUser };