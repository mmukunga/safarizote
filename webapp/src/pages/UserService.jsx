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

  axios.post('/api/login', userAuth).then((result) => {
     console.log(result.data);
     console.log(result.data.token);
     userAuth.token = result.data.token;
     axios.post('/api/verify', userAuth).then(response => {
        console.log(response);
     }).catch((error) => {
        console.log(error);
     });
     console.log('Validate User!!');
   }).catch((error) => {
     console.log(error);
  });

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