import axios from "axios";
import {default as UUID} from "node-uuid";

const isLoggedIn = () => {
  localStorage.setItem('jwt_token', 'access_token');
  return localStorage.getItem('jwt_token');
}

const loginUser = async (user) => {
   const { username, password } = user;

   console.log('!!Deploy a GitHub branch!! ' + localStorage.getItem('jwt_token'));

   const userAuth = {
        id: UUID.v4(), 
        email: 'm@gmail.com',
        password: '12345',
        token: '',
        dateCreated: new Date()
   }
   const axiosTest = () => {
      return axios.post('/api/login', userAuth).then(response => {
          console.log('1.!!AUTHENTICATED!!');
          console.log(response);
          console.log('2.!!AUTHENTICATED!!');
          localStorage.setItem('jwt_token', 'access_token');
          return { token: 'access_token' };
      }).catch(error => {
          console.error('There was an error!', error);
          throw new Error('Wrong username or password');
      });
   } 
   return axiosTest;
}

const logOut = () => {
  console.log('1..UserService.logOut..');
  localStorage.clear();
  console.log('2...UserService.logOut..');
}

export default { isLoggedIn, loginUser, logOut };