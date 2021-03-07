import React, {useState, useEffect} from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Card from './pages/Card';

const Home = React.lazy(() => import('./pages/Home'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Safaris = React.lazy(() => import('./pages/Safaris'));
const Shopping = React.lazy(() => import('./pages/Shopping'));
const Lotto  = React.lazy(() => import('./pages/Lotto'));
const BackUp  = React.lazy(() => import('./pages/BackUp'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const Email = React.lazy(() => import('./pages/Email'));
const Weather = React.lazy(() => import('./pages/Weather'));
const Stock = React.lazy(() => import('./pages/Stock'));
const Private = React.lazy(() => import('./pages/Private'));

function App() {

  const selectStyle = {
      border:'4px solid white', 
      width:'100px', 
      padding:'2px', 
      background: '#2a9df4'
  };

  const DropDown = ({ history }) => {
    const onChange = (e) => {
      history.push(`${e.target.value}`);
    };

    return (
      <select onChange={onChange} style={selectStyle}>
        <option value="/tipping">Tipping</option>
        <option value="/shopping">Shopping</option>
        <option value="/stock">Stock Market</option>
        <option value="/backUp">Dir BackUp</option>
      </select>
    );
  }
  
  const Menu = withRouter(DropDown);
  
  const handleLogout = () => {
      localStorage.clear();
  };

  const Toolbar = (props) => (
    <header style={{display: props.displayHome}} className="App-header">  
        <div className="ToolBar">                 
            <nav className="Navigation">
              <div className="leftDiv"> 
                <img src={logo} className="App-logo" alt="logo"/>
              </div>
              <div className="rightDiv">
                <NavLink to="/" className="Nav_link">Home</NavLink>
                <NavLink to="/aboutUs" className="Nav_link">About Us</NavLink>
                <NavLink to="/safaris" className="Nav_link">Safaris</NavLink>
                <NavLink to="/signIn" className="Nav_link">Login</NavLink>
                <NavLink to="/email" className="Nav_link">Email</NavLink>
                <NavLink to="/weather" className="Nav_link">Weather</NavLink>
                <Menu/>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </nav> 
        </div>
        <p className="App-title">
          Edit <code>src/App.js</code> and save to reload.         
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
    </header>
  );

  const Layout = (props) => {
      return (
        <div>
          <Toolbar displayHome={props.displayHome}/>
          <main>
            {props.children}
          </main>
        </div>
      );
  }
  
  return (
    <div className="App">
      <Card cardWidth="650px" fontColor="black" backgroundColor="white">
        <Layout>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/aboutUs" component={AboutUs} />
              <Private path="/shopping" component={Shopping} exact/>
              <Route path="/safaris" component={Safaris} />
              <Private path="/tipping" component={Lotto} exact/>
              <Route path="/signIn" component={SignIn} />
              <Route path="/email" component={Email} />
              <Route path="/weather" component={Weather} />
              <Private path="/stock" component={Stock} exact/>
              <Private path="/backUp" component={BackUp} exact/>
          </Switch>
        </Layout>
      </Card> 
    </div>
  );
}

export default App;