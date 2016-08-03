import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import SplashPage from './components/splash-page';
import MyAccount from './components/my-account';
import App from './components/app';
import TabletDisplay from './components/tablet-display';


export default class Routes extends React.Component {
  render(){

    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SplashPage} />
          <Route path='my-account' component={MyAccount} />
          <Route path=':roomName/display' component={TabletDisplay} />
        </Route>
      </Router>
    )
  }
}
