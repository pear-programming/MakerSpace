import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import SplashPage from './components/splash-page';
import MyAccount from './components/my-account';
import App from './components/app';
import TabletDisplay from './components/tablet-display';
import Dashboard from './components/dashboard';
import RoomDisplays from './components/room-displays';
import TabletList from './components/tablet-list';

export default class Routes extends React.Component {
  render(){

    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SplashPage} />
          <Route path='my-account' component={MyAccount} />
          <Route path='room-displays' component={RoomDisplays} />
          <Route path=':roomName/display' component={TabletDisplay} />
          <Route path='dashboard' component={Dashboard} /> 
          <Route path='tablet-list' component={TabletList} /> 

        </Route>
      </Router>
    )
  }
}
