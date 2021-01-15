import React, { useState, useEffect} from 'react';
import { Route, Switch, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Home     from './pages/Home';
import AboutUs  from './pages/AboutUs';
import Safaris  from './pages/Safaris';
import Customer from './pages/Customer';
import Lotto from './pages/Lotto';
import SignIn from './pages/SignIn';
import Email from './pages/Email';

function App() {
  const [message, setMessage] = useState({});

  useEffect(() => {
    axios.get('/api/tipping')
      .then(response => {
         console.log(response);
         setMessage(response.data);
      });
  },[])
 
  return (
    <div className="App">
       <Card fontColor="black" backgroundColor="grey" title="Safari Zote">
       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-title">{message.url}</p>
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
        <nav>
          <Link to="/">Home</Link>
          <Link to="/aboutUs">About Us</Link>
          <Link to="/customers">Users</Link>
          <Link to="/safaris">Safaris</Link>
          <Link to="/tipping">Tipping</Link>
          <Link to="/signIn">Login</Link>
          <Link to="/email">Contact Us</Link>
        </nav>  
      </header>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/customers" component={Customer} />
          <Route path="/safaris" component={Safaris} />
          <Route path="/tipping" component={Lotto} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/email" component={Email} />
      </Switch>
      </Card>  
    </div>
  );
}

const Card = props => {
  const { fontColor, backgroundColor, children } = props;
  const containerStyles = {
    width: 700,
    backgroundColor: backgroundColor,
    color: fontColor,
    borderRadius: 10,
    margin: '10px auto'
  };
  const labelStyles = { color: fontColor };

  return (
    <div style={containerStyles}>
      <div style={labelStyles}>{ children }</div>
    </div>
  );
};
export default App;
