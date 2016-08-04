import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { Calendar } from './calendar';

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
      this.setState({ user: userData.data })
    })
  }

  render(){
    return (
      <div>
        <NavBar />
        <Calendar />
      </div>
    )
  }
}