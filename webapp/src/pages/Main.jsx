import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Safaris from './Safaris';
import AboutUs from './AboutUs';

const Main = () => {
    console.log('Main.jsx');
  return (  
    <div>
        <ul>
            <li><Link to="/safaris">Safaris</Link></li>
            <li><Link to="/about">About Us</Link></li>
        </ul>

        <hr />
        <Switch>
            <Route exact path="/safaris" component={Safaris} />
            <Route path="/about" component={AboutUs} />
        </Switch>
    </div>
    );
}
export default Main;