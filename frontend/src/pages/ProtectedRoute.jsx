import * as React from 'react';
import {useAuth} from './AuthProvider';
import {Navigate, useLocation} from 'react-router-dom';
//https://github.com/the-road-to-learn-react/react-router-6-examples/blob/master/src/App.Authentication.jsx
const ProtectedRoute = ({ children }) => {
    const {token, log} = useAuth();
    const location  = useLocation();
    
    if (!token) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  
    return children;
  };

  export { ProtectedRoute };