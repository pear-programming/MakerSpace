import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import SplashPage from './components/splash-page';
import OrgList from './components/organization-list';
import App from './components/app';


export default function Routes() {
  return (
	  <Router history={browserHistory}>
	    <Route path='/' component={App}>
	    	<IndexRoute component={SplashPage} />
	    	<Route path='organizations' component={OrgList} />
	    </Route>
	  </Router>
  );
}
