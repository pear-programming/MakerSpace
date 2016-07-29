import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import SplashPage from './components/splash-page';
import MyAccount from './components/my-account';
import AllOrganizations from './components/all-organizations';
import App from './components/app';

export default (
	  <Route path='/' component={App}>

	    <IndexRoute component={SplashPage} />
	    <Route path='my-account' component={MyAccount} />
	  	<Route path='organizations' component={AllOrganizations} />

	  </Route>
)
