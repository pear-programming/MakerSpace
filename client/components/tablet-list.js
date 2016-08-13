import React, { Component } from 'react';
import NavBar from './nav-bar';
import { fetchRooms, fetchReservations } from '../models/rooms';
import { Link } from 'react-router';
import moment from 'moment';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import ReactDOM from 'react-dom';


export default class TabletList extends Component {
  constructor() {
    super()

    this.state = {
      rooms: [],
    }
  }

	componentWillMount() {
    fetchRooms()
    .then( room => {
      this.setState({ rooms: this.state.rooms.concat(room.data) })
    })
    .catch( err => {
      console.log('error', err)
      this.setState({ rooms: null })
    })
  }

  renderRooms() {
    return this.state.rooms.map(room => {
      return (
        <li>
          <Link to={`${room.roomName}/display`}>{room.roomName}</Link>
        </li>
      )
    })
  }

  render() {
  
    return (
      <div>
        <NavBar />
        <h1>Tablet List</h1>
    
        <ul>
          {this.renderRooms.call(this)}
        </ul>

      </div>
    );
  }
}
