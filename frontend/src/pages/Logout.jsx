
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext'

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
  
    return (
      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Log out
      </button>
    );
  };

  export default Logout;