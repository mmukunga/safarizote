// src/App.js
import React from 'react';
import { Route, Switch, NavLink, withRouter, useHistory } from "react-router-dom";
import {ThemeContext} from "./ThemeContext";
import SwitchButton from "./Button";
import logo from "./logo.svg";
import "./App.css";

import Card from './pages/Card';
import Safaris from './pages/Safaris';
import Metrics from './pages/Metrics';
import AboutUs from './pages/AboutUs';
import Shopping from './pages/Shopping';
import Lotto from './pages/Lotto';
import BackUp from './pages/BackUp';
import SignIn from './pages/SignIn';
import Email from './pages/Email';
import Weather from './pages/Weather';
import Stock from './pages/Stock';
import Private from './pages/Private';
import UserService from './pages/UserService';

function App() {
  let history = useHistory();
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const StylesDropDown = {
      width: '80px', 
      padding: '2px', 
      border: '2px solid #fefbd8'
  };
  
  const images = [
      './images/jeep.jpg',
      './images/leopard.jpg',
      './images/cheeter.jpg',
      './images/cheeters.jpg',
      './images/savannah.jpg',
      './images/gnus.jpg',
      './images/tourists.jpg',
      './images/drought.jpg'
  ];

  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  const displayHome = {
    color: 'purple'
  }

  const imageStyles = {
    backgroundImage: `url(${selectedImage})`, 
    display: displayHome
  };

  React.useEffect(() => {
      const intervalID = setTimeout(() =>  {
          const id = Math.floor(Math.random() * (7 - 0) + 0);
          setSelectedImage(images[id]);
      }, 3000);
  
      return () => clearInterval(intervalID);
  }, [selectedImage]);

  const DropDown = props => {
    const {history} = props;
    const onChange = (e) => {
       history.replace(`${e.target.value}`);
    }
    return (
      <select onChange={onChange} style={StylesDropDown}>
        <option value="/tipping">Tipping</option>
        <option value="/shopping">Shopping</option>
        <option value="/stock">Stock Market</option>
        <option value="/backUp">Dir BackUp</option>
      </select>
    );
  }

  const logout = () => {
    UserService.logOut();
    history.replace('/');
  }

  const AdminMenu = withRouter(DropDown);

  return (
    <div className="App">
      <header className={`App-header ${imageStyles}`}> 
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a href="" className="Nav_link LogOut" onClick={logout}></a> 
        {UserService.isLoggedIn() != null ? 'Is Logged in!!' : 'Please login!!'}
        <SwitchButton />
      </header>
      <hr/>
      <Card className={`OuterCard ${darkMode ? "bg-dark" : "bg-light"}`} fontColor="black">
        <NavLink to={'/'} className="Nav_link">Safaris</NavLink>  
        <NavLink to={'/metrics'} className="Nav_link">Metrics</NavLink>
        <NavLink to={'/email'} className="Nav_link">Email</NavLink>
        <NavLink to={'/weather'} className="Nav_link">Weather</NavLink>
        <NavLink to={'/metrics'} className="Nav_link">Metrics</NavLink>
        <NavLink to={'/aboutUs'} className="Nav_link">About&nbsp;Us</NavLink>
        <AdminMenu />
        <NavLink to={'/signIn'} className="Nav_link">LogIn</NavLink>
        <Switch>
          <Route path='/' exact component={Safaris}/>
          <Route path='/metrics' component={Metrics}/>
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/metrics" component={Metrics} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/email" component={Email} />
          <Route path="/weather" component={Weather} />
          <Private path="/shopping" component={Shopping} exact/>
          <Private path="/tipping" component={Lotto} exact/>
          <Private path="/stock" component={Stock} exact/>
          <Private path="/backUp" component={BackUp} exact/>
        </Switch>
      </Card> 
    </div>
  );
}

export default App;