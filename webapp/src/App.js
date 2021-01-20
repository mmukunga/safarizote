import React, { useState, useEffect} from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Home     from './pages/Home';
import AboutUs  from './pages/AboutUs';
import Safaris  from './pages/Safaris';
import Shopping from './pages/Shopping';
import Lotto from './pages/Lotto';
import SignIn from './pages/SignIn';
import Email from './pages/Email';
import Weather from './pages/Weather';

function App() {
  const [message, setMessage] = useState({});

  useEffect(() => {
    axios.get('/api/tipping')
      .then(response => {
         console.log(response);
         setMessage(response.data);
      });
  },[])
 

  const DropDown = ({ history }) => {
    const onChange = (e) => {
      history.push(`${e.target.value}`);
    };

    return (
      <select onChange={onChange} style={{width:'100px', padding:'2px'}}>
        <option value="/tipping">Tipping</option>
        <option value="/shopping">Shopping</option>
      </select>
    );
  };
  
  const Menu = withRouter(DropDown);

  return (
    <div className="App">
       <Card fontColor="black" backgroundColor="white" title="Safari Zote">
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
        <Menu/>
        <nav>
          <NavLink to="/" className="Nav_link">Home</NavLink>
          <NavLink to="/aboutUs" className="Nav_link">About Us</NavLink>
          <NavLink to="/safaris" className="Nav_link">Safaris</NavLink>
          <NavLink to="/signIn" className="Nav_link">Login</NavLink>
          <NavLink to="/email" className="Nav_link">Email</NavLink>
          <NavLink to="/weather" className="Nav_link">Weather</NavLink>
        </nav>  
      </header>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/shopping" component={Shopping} />
          <Route path="/safaris" component={Safaris} />
          <Route path="/tipping" component={Lotto} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/email" component={Email} />
          <Route path="/weather" component={Weather} />
      </Switch>
      </Card>  
    </div>
  );
}

const Card = props => {
  const { fontColor, backgroundColor, children } = props;
  const containerStyles = {
    width: 650,
    backgroundColor: backgroundColor,
    color: fontColor,
    borderRadius: 10,
    margin: '10px auto',
    
    margin: '10px',
    padding: '10px',
    border: '4px solid darkred'
  };

  const labelStyles = { color: fontColor };

  return (
    <div style={containerStyles}>
      <div style={labelStyles}>{ children }</div>
    </div>
  );
};

export default App;