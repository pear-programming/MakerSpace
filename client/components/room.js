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
      <div id="eachRoom">
        <span onClick={this.open}>{room.roomName}</span>

        <label className="switch">
          { room.isAvailable ? <input onClick={() => this.props.toggleState(room)} type="checkbox" checked /> : <input onClick={() => this.props.toggleState(room)} type="checkbox" /> }
          <div className="slider round"></div>
        </label>
        
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.mode}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="roomDetails">
              <h4> {room.roomName} </h4>
              <p> Capacity: {room.capacity} </p>
              <p> Conference Table: {room.conferenceTable ? "Yes" : "No"} </p>
              <p> Air-play: {room.airPlay ? "Yes" : "No"} </p>
              <p> Hammock: {room.hammock ? "Yes" : "No"} </p>
            </div>
            <img className="roomImage" src={room.image}/>
          </Modal.Body>
          <Modal.Footer>
            <Link to={`${this.props.roomInfo.roomName}/display`} ><Button>Display</Button></Link>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}