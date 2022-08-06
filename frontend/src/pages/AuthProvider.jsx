import React, {useContext} from 'react';
import {signInWithEmailAndPassword, 
        sendEmailVerification,
        createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigate, useLocation} from 'react-router-dom';
import {ErrorContext} from "./ErrorProvider";

const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
  const [token, setToken] = React.useState(null);
  const { errorMsg, handleError } = useContext(ErrorContext);

  let navigate = useNavigate();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const logout = () => {
    setToken(null);
  };

  const register = async (e) => {
    const {auth, email, password} = e;
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          setToken(auth.currentUser);
          localStorage.setItem("currentUser", auth.currentUser);
          navigate('/login');
        }).catch((err) => {
          localStorage.setItem("currentUser", null);
          err.httpUrl='/api/login';  
          handleError(err);
        });
    }).catch(err => {
      err.httpUrl='/api/createUser';  
      handleError(err);
    });  
  }

  const login = async (e) => {
    console.log(e);
    const {auth, data} = e;
    signInWithEmailAndPassword(auth, data.email, data.password).then((response) => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser).then((response) => {
          localStorage.setItem("currentUser", null);
          navigate('/login');
        }).catch((err) => {
          err.httpUrl='/api/createUser';  
          handleError(err);
        });
      } else {
        setToken(auth.currentUser);
        localStorage.setItem("currentUser", auth.currentUser);
        navigate(from);
      }
    }).catch((err) => {
      let response = { status: 404, statusText: 'Not Found' };
      err.response = response;
      err.httpUrl='/api/login';
      localStorage.setItem("currentUser", null);
      handleError(err);
    })
  }

  const value = {
    token,
    onLogin:  login,
    onLogout: logout,
    onRegister: register,
    errorMsg,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => { return useContext(AuthContext) }