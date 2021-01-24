import React, { Component, Suspense, useState, useEffect} from 'react';
import { Route, Switch, NavLink, Redirect, useLocation, useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import fakeAuth from './pages/Auth';

const Loading = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    let newMessage = message.length < 4 ? message.concat('.') : '';
    setMessage(newMessage);
  }, [message]);
  return (
    <div className="Spinner" style={{ textAlign: 'center' }}>
      <p>Loading{message}</p>
      <div class="divLoader">
        <svg class="svgLoader" viewBox="0 0 1024 1024" width="10em" height="10em">
          <path fill="lightblue" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"/>
        </svg>
      </div>  
    </div>
  )
};

const Home = React.lazy(() => import('./pages/Home'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Safaris = React.lazy(() => import('./pages/Safaris'));
const Shopping = React.lazy(() => import('./pages/Shopping'));
const Lotto  = React.lazy(() => import('./pages/Lotto'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const Email = React.lazy(() => import('./pages/Email'));
const Weather = React.lazy(() => import('./pages/Weather'));
const Stock = React.lazy(() => import('./pages/Stock'));

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
        <option value="/stock">Stock Market</option>
      </select>
    );
  };
  
  const Menu = withRouter(DropDown);
  
  function Private ({ children, ...rest }) {
    return (
      <Route {...rest} render={({ location }) => {
        return fakeAuth.isAuthenticated === true
          ? children
          : <Redirect to={{ 
              pathname: '/signIn', 
              state: { from: location }
            }}/>
      }} />
    )
  }
 

  function AuthButton () {
    const history = useHistory()
  
    return fakeAuth.isAuthenticated === true
      ? <span>
          Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
          }}>Sign out</button>
        </span>
      : <span>Not logged in.</span>
  }

  
  const Toolbar = (props) => (
    <header style={{display: props.displayHome}} className="App-header">  
        <div class="ToolBar">                 
            <nav className="Navigation">
              <div style={{border:'2px solid red', width:'70px', display:'inline-block', verticalAlign: 'top'}}>
                <img src={logo} className="App-logo" alt="logo"/>
              </div>
              <div style={{border:'2px solid red', display:'inline-block', verticalAlign: 'top'}}>
                <NavLink to="/" className="Nav_link">Home</NavLink>
                <NavLink to="/aboutUs" className="Nav_link">About Us</NavLink>
                <NavLink to="/safaris" className="Nav_link">Safaris</NavLink>
                <NavLink to="/signIn" className="Nav_link">Login</NavLink>
                <NavLink to="/email" className="Nav_link">Email</NavLink>
                <NavLink to="/weather" className="Nav_link">Weather</NavLink>
                <AuthButton /> <Menu/>
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
      <Suspense fallback={<Loading />}>
      <Card fontColor="black" backgroundColor="white" title="Safari Zote">
        <Layout>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/aboutUs" component={AboutUs} />
              <Private path="/shopping" component={Shopping} />
              <Route path="/safaris" component={Safaris} />
              <Private path="/tipping" component={Lotto} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/email" component={Email} />
              <Route path="/weather" component={Weather} />
              <Private path="/stock" component={Stock} />
          </Switch>
        </Layout>
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