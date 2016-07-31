import React, { Component } from 'react';
import NavBar from './nav-bar';
import MyReservations from './my-reservations';
import {Grid, Row, Col} from 'react-bootstrap';



export default class MyAccount extends Component {
  render() {
    return (
      <div> 
        <h2>My Account</h2> 
        <MyReservations />
      </div>
    )
  }
}