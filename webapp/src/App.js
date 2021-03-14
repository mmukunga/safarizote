import React, {useState, useEffect, useRef} from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import Card from './pages/Card';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Safaris from './pages/Safaris';
import Shopping from './pages/Shopping';
import Lotto from './pages/Lotto';
import BackUp from './pages/BackUp';
import SignIn from './pages/SignIn';
import Email from './pages/Email';
import Weather from './pages/Weather';
import Stock from './pages/Stock';
import Private from './pages/Private';

function App() {
  const selectStyle = {
      border: '4px solid white', 
      width: '100px', 
      padding: '2px', 
      background: '#2a9df4'
  };

  const displayHome = {
    color: 'blue'
  }

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

  const Toolbar = (props) => {

    const images = [
        '/images/leopard.jpg',
        '/images/cheeter.jpg',
        '/images/cheeters.jpg',
        '/images/jeep.jpg',
        '/images/savannah.jpg',
        '/images/gnus.jpg',
        '/images/tourists.jpg',
        '/images/drought.jpg'
    ];

    const id = Math.floor(Math.random() * (7 - 0) + 0);
    const [selectedImage, setSelectedImage] = React.useState(images[id]);
    
    const imageStyles = {
      backgroundImage: `url(${process.env.PUBLIC_URL + selectedImage})`, 
      display: props.displayHome
    };
    
    console.log('1.imageStyles');
    console.log(imageStyles);
    console.log('2.imageStyles');

    React.useEffect(() => {
        setSelectedImage(images[1]);
      return () => {};
    }, []); 

    return (
        <header style={imageStyles} className="App-header">  
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
    }

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
        <Layout displayHome={displayHome}>
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