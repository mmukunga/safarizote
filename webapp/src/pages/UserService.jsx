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
      userAuth.token = response.data.token;  
      return axios.post('/api/verify', userAuth).then((res) => {
          return res;
      }).catch(err => {
          console.log(err);
      });   

  }).catch(err => {
      console.log('error in catch', err);
  });
  
  console.log(isSignedUp);

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