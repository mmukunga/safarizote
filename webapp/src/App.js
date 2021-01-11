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
    axios.get('/api/allHits')
      .then(response => {
         console.log(response);
         setMessage(response.data);
      });
  },[])
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="App-title">{message.url}</h3>
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
        <div className="container">   
          Simon
        </div>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/aboutUs">About Us</Link>
        <Link to="/customers">Users</Link>
        <Link to="/safaris">Safaris</Link>
      </nav>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/customers" component={Customer} />
          <Route path="/safaris" component={Safaris} />
      </Switch>
    </div>
  );
}

export default App;
