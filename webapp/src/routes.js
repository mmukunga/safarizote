import React from 'react';
import { Switch, Route } from 'react-router';

import Safaris from './pages/Safaris';
import Metrics from './pages/Metrics';
import AboutUs from './pages/AboutUs';
import Shopping from './pages/Shopping';
import Lotto from './pages/Lotto';
import BackUp from './pages/BackUp';
import SignIn from './pages/SignIn';
import Email from './pages/Email';
import Weather from './pages/Weather';
import Stock from './pages/Stock';
import Private from './pages/Private';

export default (
	<Switch>
    <Route exact path="/" component={Safaris} />
		<Route path="/metrics" component={Metrics} />
    <Route path="/aboutUs" component={AboutUs} />
    <Private path="/shopping" component={Shopping} exact/>
    <Private path="/tipping" component={Lotto} exact/>
    <Route path="/signIn" component={SignIn} />
    <Route path="/email" component={Email} />
    <Route path="/weather" component={Weather} />
    <Private path="/stock" component={Stock} exact/>
    <Private path="/backUp" component={BackUp} exact/>
	</Switch>
);