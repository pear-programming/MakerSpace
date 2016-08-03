import React from 'react';
import { browserHistory, Link } from 'react-router';
import NavBar from './nav-bar';
import RoomsList from './rooms-list';
import { Button } from 'react-bootstrap';
import { checkStatus } from '../models/auth';

export default class SplashPage extends React.Component {
  constructor(){ 
    super()

    this.state = {
      user: null
    }
  }

  componentWillMount() {
    checkStatus()
    .then(userData => {
      console.log('userData', userData)
      this.setState({ user: userData.data })
    })
  }

  render(){
    return (
      this.state.user ?
       <RoomsList /> 
      : <div>
        <NavBar />
        <div id="home">
          <h3 className="loginButton" ><a href="/auth/makerpass" className="loginButton"><span id="fakeButton">Login with Maker<strong>Pass</strong></span></a></h3>
        </div>
        </div>
    )
  }
}
