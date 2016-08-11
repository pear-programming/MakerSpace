import React, { Component } from 'react';
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';

export default class Room extends Component {

  constructor(props){  
    super(props)

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this.state = { 
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }

  render() {
    
    const room = this.props.roomInfo;

    var title = {float: 'left'}
    var info = {float: 'right'}

    return (

     

      <div>
        <Row className="row">
          <Col md={6} className="eachRoom"><div>{room.roomName}</div></Col>

          <Col md={6}>
            { room.isAvailable ? <div className="open" onClick={() => this.props.toggleState(room)}>⚪ Book Now </div> : <div className="booked" onClick={() => this.props.toggleState(room)}>🕒 Reserved  </div> }
          </Col>
        </Row>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
          <div className="roomTitleContainer">
            <Modal.Title>{this.props.mode}<span className="roomTitle">{room.roomName}</span></Modal.Title>
          </div>
          </Modal.Header>
          <Modal.Body className="clearfix">
            <div className="roomImageContainer">
              <img className="roomImage" src={room.image}/>
            </div>
            <div className="roomDetails">
              <p> Capacity: {room.capacity} </p>
              <p> Conference Table: {room.conferenceTable ? "Yes" : "No"} </p>
              <p> Air-play: {room.airPlay ? "Yes" : "No"} </p>
              <p> Hammock: {room.hammock ? "Yes" : "No"} </p>
            </div>
            <div className="roomAvailability">
              <h3> <span className={room.isAvailable ? 'open' : 'closed'}>{room.isAvailable ? 'available' : 'In use'}</span></h3>
              <button className="scheduleBtn">Today's Schedule</button>
            </div>
          </Modal.Body>

        </Modal>
      </div>
    )
  }
}