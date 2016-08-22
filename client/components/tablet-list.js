import React, { Component } from 'react';
import NavBar from './nav-bar';
import { fetchRooms } from '../models/rooms';
import { Link } from 'react-router';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';


export default class TabletList extends Component {
  constructor() {
    super();

    this.state = {
      rooms: []
    };
  }

  componentWillMount() {
    fetchRooms()
    .then(room => {
      this.setState({ rooms: this.state.rooms.concat(room.data) });
    })
    .catch(err => {
      console.error(err);
      this.setState({ rooms: null });
    });
  }

  renderRooms() {
    return this.state.rooms.map(room => {
      return (
        <Col md={4}>
          <Thumbnail src={room.image} className="tabList">
            <h2>
              {room.roomName}
              <Link to={`${room.roomName}/display`}>
                <Button bsStyle="primary" className="tabBtn">Tablet View</Button>
              </Link>
            </h2>
          </Thumbnail>
        </Col>
      );
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Grid>
          <Row>
            {this.renderRooms.call(this)}
          </Row>
        </Grid>
      </div>
    );
  }
}
