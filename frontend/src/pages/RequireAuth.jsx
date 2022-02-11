import { Navigate, useLocation } from "react-router-dom";
import {useAuth} from './AuthContext';
export const RequireAuth = ({ children }) => {
    const location = useLocation();
    const { authed } = useAuth();
    return authed ? children : <Navigate to="/signIn" replace state={{ path: location.pathname }}/>;
  }