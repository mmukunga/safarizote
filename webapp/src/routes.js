import React from 'react';
import { Switch, Route } from 'react-router';

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

export default (
	// Switch is added in v4 react-router
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
);