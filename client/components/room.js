import React, { Component } from 'react';
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
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
    const room = this.props.roomInfo

    var title = {float: 'left'}
    var info = {float: 'right'}

    return (
      <div id="eachRoom clearfix">
        <span onClick={this.open}>{room.roomName}</span>

        <label className="switch">
          { room.isAvailable ? <input onClick={() => this.props.toggleState(room)} type="checkbox" checked /> : <input onClick={() => this.props.toggleState(room)} type="checkbox" /> }
          <div className="slider round"></div>
        </label>
        
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
              <h3>currently <span>available</span></h3>
              <button className="scheduleBtn">TODAY'S SCHEDULE</button>
            </div>
          </Modal.Body>
          <Modal.Footer className="clearfix">
          <div >
            <Link to={`${this.props.roomInfo.roomName}/display`} ><Button>Display</Button></Link>
          </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}