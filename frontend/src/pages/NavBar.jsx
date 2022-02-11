import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';
import { ThemeContext } from './Theme';

const NavBar= () => {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, dark } = React.useContext(ThemeContext);
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const handleChange = (e) => {
    navigate(`${e.target.value}`);
  }

  const ThemeButton = () => {
    const { theme, toggle } = React.useContext(ThemeContext);
    return <NavLink
        to="#"
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.color,
          border: '1px solid #ccc',
          borderRadius: '4px',
          transition: 'all 0.25s linear'
        }}
        onClick={toggle}>{!dark ? 'Dark' : 'Light'}</NavLink>;
  };

  return (
  <div className="NavBar">  
    <ul  className="navbar" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      <li><NavLink to="/" className='link'>Safaris</NavLink></li>
      <li><NavLink to="/aboutUs" className='link'>AboutUs</NavLink></li>
      <li><NavLink to="/weather" className='link'>Weather</NavLink></li>
      <li><NavLink to="/contactUs" className='link'>ContactUs</NavLink></li>
      <li>
          <select onChange={handleChange}>
            <option value="/tipping">Tipping</option>
            <option value="/stock">Stock Exchange</option>
            <option value="/shoppings">Shoppings</option>
            <option value="/familieAlbum">FamilieAlbum</option>
          </select>
        </li>
      <li>{authed? <button onClick={handleLogout}>Logout</button> 
                : <NavLink to="/signIn" className='link'>Login</NavLink>}</li>
      <li><ThemeButton/></li>           
    </ul>
  </div>
  );
}
export default NavBar;