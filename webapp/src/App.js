import React from 'react';
import { Route, Switch, NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import Card from './pages/Card';
import Safaris from './pages/Safaris';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
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
      width: '60px', 
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
        './images/jeep.jpg',
        './images/leopard.jpg',
        './images/cheeter.jpg',
        './images/cheeters.jpg',
        './images/savannah.jpg',
        './images/gnus.jpg',
        './images/tourists.jpg',
        './images/drought.jpg'
    ];

    const [selectedImage, setSelectedImage] = React.useState(images[0]);

    const imageStyles = {
      backgroundImage: `url(${selectedImage})`, 
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      display: props.displayHome,
      border:'4px solid #fefeef'
    };
    React.useEffect(() => {
        const intervalID = setTimeout(() =>  {
            const id = Math.floor(Math.random() * (7 - 0) + 0);
            setSelectedImage(images[id]);
        }, 3000);
    
        return () => clearInterval(intervalID);
    }, [selectedImage]);

    return (
        <header style={imageStyles} className="App-header">  
            <nav className="Navigation">
              <div className="NavMenu">
                <span className="Nav_link">
                  <img src={logo} className="App-logo Logo" alt="logo"></img>
                </span>
                <NavLink to="/" className="Nav_link">Safaris</NavLink>
                <NavLink to="/aboutUs" className="Nav_link">About&nbsp;Us</NavLink>
                <NavLink to="/home" className="Nav_link">Home</NavLink>
                <NavLink to="/signIn" className="Nav_link">Login</NavLink>
                <NavLink to="/email" className="Nav_link">Email</NavLink>
                <NavLink to="/weather" className="Nav_link">Weather</NavLink>
                <Menu/>
                <button onClick={handleLogout} className="LogOut">Logout</button>
              </div>
            </nav> 
            <p className="App-title">
              The most revered of Africa’s safari destinations, Kenya is located in 
              East Africa and boasts the Masai Mara National Park, renowned for its 
              abundant wildlife and annual Great Migration.<br/>
              Common Trips <code>src/App.js</code> pluss the most preffered.<br/>    
              <Link to="/email" style={{color: 'white'}} activeStyle={{color: 'red'}}>Please Contact Us!</Link><br/>     
              <a
                className="App-link"
                href="https://safarizote.herokuapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari Zote
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
      <Card className="OuterCard" fontColor="black">
        <Layout displayHome={displayHome}>
          <Switch>
              <Route exact path="/" component={Safaris} />
              <Route path="/aboutUs" component={AboutUs} />
              <Private path="/shopping" component={Shopping} exact/>
              <Route path="/home" component={Home} />
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