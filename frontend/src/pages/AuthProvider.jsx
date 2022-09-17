import React, {useContext} from 'react';
import {signInWithEmailAndPassword, 
        sendEmailVerification,
        createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigate, useLocation} from 'react-router-dom';
import {LogContext} from "./LogContext";

const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
  const [token, setToken] = React.useState(null);
  const context = React.useContext(LogContext);
    const log = context.log;
    const persistLog =  context.persistLog;

  let navigate = useNavigate();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const logout = () => {
    setToken(null);
  };

  const register = async (e) => {
    console.log(e);
    const {auth, data} = e;
    console.log('..email..' + data.email);
    console.log('..password..' + data.password);
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          setToken(auth.currentUser);
          localStorage.setItem("currentUser", auth.currentUser);
          localStorage.setItem("VerifyEmail", auth.currentUser);
          navigate('/login');
        }).catch((err) => {
          console.log(err);
          localStorage.setItem("currentUser", null);
         const path='/api/login';  
          persistLog(err, path);
        });
    }).catch(err => {
      console.log(err);
      const path='/api/createUser';  
      persistLog(err, path);
    });  
  }

  const login = async (e) => {
    console.log(e);
    const {auth, data} = e;
    console.log(e);
    
    signInWithEmailAndPassword(auth, data.email, data.password).then((response) => {
      console.log(response);
      if(!auth.currentUser.emailVerified) {
        console.log(auth.currentUser);
        sendEmailVerification(auth.currentUser).then((response) => {
          localStorage.setItem("currentUser", null);
          navigate('/login');
        }).catch((err) => {
          console.log('..signInWithEmailAndPassword..ERROR!!');
          console.log(err);
          const path='/api/createUser';  
          persistLog(err, path);
        });
      } else {
        console.log('..signedIn.. WOW!!😊');
        setToken(auth.currentUser);
        localStorage.setItem("currentUser", auth.currentUser);
        navigate(from);
      }
    }).catch((err) => {
      console.log(err);
      console.log('..NotSignedIn..😔');
      let response = { status: 404, statusText: 'Not Found' };
      err.response = response;
      localStorage.setItem("currentUser", null);
      const path='/api/login';
      persistLog(err, path);
    })
   
  }

  const value = {
    token,
    onLogin:  login,
    onLogout: logout,
    onRegister: register,
    log,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => { return useContext(AuthContext) }