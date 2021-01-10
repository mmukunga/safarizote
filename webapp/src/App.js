import React, { useState, useEffect} from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Home     from './pages/Home';
import AboutUs  from './pages/AboutUs';
import Safaris  from './pages/Safaris';
import Customer from './pages/Customer';

function App() {
  const [message, setMessage] = useState({});

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => {
         console.log(response);
         setMessage(response.data);
      });
  },[])
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="App-title">{message}</h3>
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
      <Router>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutUs">About Us</Link></li>
          <li><Link to="/customers">Users</Link></li>
          <li><Link to="/safaris">Safaris</Link></li>
        </ul>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/aboutUs" component={AboutUs} />
            <Route path="/customers" component={Customer} />
            <Route path="/safaris" component={Safaris} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
