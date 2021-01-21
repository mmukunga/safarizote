import React, { Suspense, useState, useEffect} from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Loading = () => <div>Loading</div>

const Home = React.lazy(() => import('./pages/Home'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Safaris = React.lazy(() => import('./pages/Safaris'));
const Shopping = React.lazy(() => import('./pages/Shopping'));
const Lotto  = React.lazy(() => import('./pages/Lotto'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const Email = React.lazy(() => import('./pages/Email'));
const Weather = React.lazy(() => import('./pages/Weather'));

function App() {
  const [message, setMessage] = useState({});
 
  const selectStyle = {
    border:'1px solid red', 
    width:'80px', 
    padding:'2px', 
    background:'silver'
  };
  
  const DropDown = ({ history }) => {
    const onChange = (e) => {
      history.push(`${e.target.value}`);
    };

    return (
      <select onChange={onChange} style={selectStyle}>
        <option value="/tipping">Tipping</option>
        <option value="/shopping">Shopping</option>
      </select>
    );
  };
  
  const Menu = withRouter(DropDown);

  return (
    <div className="App">
       <Suspense fallback={<Loading />}>
       <Card fontColor="black" backgroundColor="white" title="Safari Zote">
       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-title">{message.url}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload. <Menu/>
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
      </Suspense> 
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