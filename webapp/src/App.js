// src/App.js
import React, { useContext } from 'react';
import { Route, Switch, NavLink, withRouter, useHistory, useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import {ThemeContext} from "./pages/ThemeContext";
import SwitchButton from "./pages/Button";
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
  const [initialized, setInitialized] = React.useState(false);
  let history = useHistory();
  const location = useLocation();
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const StylesDropDown = {
      width: '80px', 
      padding: '2px', 
      border: '2px solid #fefbd8'
  };
  
  const images = [
      '/images/jeep.jpg',
      '/images/leopard.jpg',
      '/images/cheeter.jpg',
      '/images/cheeters.jpg',
      '/images/savannah.jpg',
      '/images/gnus.jpg',
      '/images/tourists.jpg',
      '/images/drought.jpg'
  ];

  const imgId = Math.floor(Math.random() * (images.length - 0) + 0);
  const [selectedImage, setSelectedImage] = React.useState(images[imgId]);

  const displayHome = {
    color: 'orange'
  }

  const imageStyles = {
      backgroundImage: `url(${process.env.PUBLIC_URL + selectedImage})`,
      color: displayHome.color
  };

  React.useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize("UA-212884600-1");
      setInitialized(true);
    }
  }, []);

  React.useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);

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
    <div className="App" style={imageStyles}>
      <header className="App-header"> 
        <div className="TopMenu">
          <div className="item left"><img src={logo} className="App-logo" alt="logo"/></div>
          <div className="item divPad">
            Africa Safari! <code>Like Masaai Mara</code>  
            <NavLink to={{pathname: "/email"}} className="Nav_link"> Learn more</NavLink>
          </div>
          <div className="item right">
          <SwitchButton/>
           &nbsp;{UserService.isLoggedIn() != null ? 'Is Logged in!' : 'Please login!'}  
           &nbsp;<a href="" className="Nav_link LogOut" onClick={logout}></a> 
          </div>
        </div>
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