import React, { Suspense, useState, useEffect} from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

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
      </select>
    );
  };
  
  const Menu = withRouter(DropDown);

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
              <Private path="/shopping" component={Shopping} exact/>
              <Route path="/safaris" component={Safaris} />
              <Private path="/tipping" component={Lotto} exact/>
              <Route path="/signIn" component={SignIn} />
              <Route path="/email" component={Email} />
              <Route path="/weather" component={Weather} />
              <Private path="/stock" component={Stock} exact/>
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
    padding: '10px',
    border: '4px solid #9c6137'
  };

  const labelStyles = { color: fontColor };

  return (
    <div style={containerStyles}>
      <div style={labelStyles}>{ children }</div>
    </div>
  );
};

export default App;