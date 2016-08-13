import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import SplashPage from './components/splash-page';
import App from './components/app';
import TabletDisplay from './components/tablet-display';
import Dashboard from './components/dashboard';


export default class Routes extends React.Component {
  render(){

    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SplashPage} />
          <Route path=':roomName/display' component={TabletDisplay} />
          <Route path='dashboard' component={Dashboard} /> 
        </Route>
      </Router>
    )
  }
}
