import React, { Component } from 'react';
import NavBar from './nav-bar';
import { fetchRooms, fetchReservations } from '../models/rooms';
import { Link } from 'react-router';
import moment from 'moment';
import { Grid, Row, Col, Table, Thumbnail, Button } from 'react-bootstrap';
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
        <Col md={4}><Thumbnail src={room.image} className="tabList">
          <h3>{room.roomName}</h3>
          <p><Link to={`${room.roomName}/display`}><Button bsStyle="primary">Tablet View</Button></Link></p>
        </Thumbnail>
        </Col>
      )
    })
  }

  render() {
    console.log(this.state.rooms)
    return (
      <div>
        <NavBar />
        <h1>Tablet List</h1>    
        <Grid>
        <Row>
          {this.renderRooms.call(this)}
        </Row>
        </Grid>
      </div>
    );
  }
}
