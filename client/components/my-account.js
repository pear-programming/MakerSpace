import React, { Component } from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import MyReservations from './my-reservations';
import { fetchReservations , fetchTimeSlots, fetchRooms} from '../models/rooms';
import {Grid, Row, Col} from 'react-bootstrap';



export default class MyAccount extends Component {
  
  constructor(){ 
    super()
    
    this.state = {
      user: null,
      firstName: null,
      reservations: []
    }
  }

  componentWillMount() {
    checkStatus()
    .then(userData => {
      console.log('userData', userData)
      var firstName = userData.data.name.split(" ")[0];
      console.log('firstName', firstName)
      this.setState({ user: userData.data, name: firstName })
    })
  }

  render() {
    return (
      <div> 
        <NavBar />
        {this.state.firstName ? 
          <div>
            <h2>{this.state.firstName} 's Reservations</h2> 
            <ul>
            
            </ul>
          </div>
          :
          null
        }

      </div>
    )
  }
}


/*
  GOALS:
  - Get user name from log in?
  - show existing reservations
  - ability to update or delete existing reservations 
  - past reservations
  - stylish styling
*/