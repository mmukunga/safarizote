import axios from "axios";
import {default as UUID} from "node-uuid";

const isLoggedIn = () => {
  return localStorage.getItem('jwt_token');
}

const loginUser = async (user) => {
   const { username, password } = user;

   console.log('!!Deploy a GitHub branch!! ' + localStorage.getItem('jwt_token'));

   const userAuth = {
        id: UUID.v4(), 
        email: username,
        password: password,
        token: '',
        dateCreated: new Date()
   }
   const axiosTest = async () => {
      return axios.post('/api/login', userAuth).then(response => {
          console.log(response);
          return { token: 'access_token' };
      }).catch(error => {
          console.error('There was an error!', error);
          throw new Error('Wrong username or password');
      });
   } 
   return axiosTest;
}

const logOut = () => {
  localStorage.clear();
}

export default { isLoggedIn, loginUser, logOut };