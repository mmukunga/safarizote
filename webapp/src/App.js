// src/App.js
import React from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link, withRouter, useHistory } from "react-router-dom";
import Posts from "./pages/Posts";
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
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
      <hr/>
      <BrowserRouter>
      <NavLink to={'/'}>Safaris</NavLink>  
      <NavLink to={'/metrics'}>Metrics</NavLink>
        <Switch>
          <Route path='/' exact component={Safaris}/>
          <Route path='/metrics' component={Metrics}/>
        </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;