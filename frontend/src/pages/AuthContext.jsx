import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();  
const AuthProvider = ({children}) => {
    const [authed, setAuthed] = React.useState(false);
  
    const login  = async (data) => { 
        const postData = { ...data }; 
        return await axios.post('/api/signIn', postData, {
        headers: {
            'Content-Type':"application/json"
          }}).then(response => {
            setAuthed(true);
            return response;
        });
    }

    const logout = () => { 
      return new Promise((res) => {
        setAuthed(false);
        console.log('Logged Out!'); 
        res();
      });
    } 
   
    let value = { authed, login, logout };

    return (
      <AuthContext.Provider value={value} >
        {children}
      </AuthContext.Provider>
    );
}

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
