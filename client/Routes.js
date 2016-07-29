import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import SplashPage from './components/splash-page';
import App from './components/app';


export default function Routes() {
  return (
	  <Router history={browserHistory}>
	    <Route path='/' component={App}>
	    	<IndexRoute component={SplashPage} />
	    </Route>
	  </Router>
  );
}
