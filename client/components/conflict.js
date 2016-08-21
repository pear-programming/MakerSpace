import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations, fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime } from '../helpers.js';
import Calendar from './calendar';
import Room from './room';
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';


export default class Conflict extends React.Component {
  render() {
    return (
      <Modal show={this.props.showVerify} onHide={() => this.props.closeVerify(false)}>
        <Modal.Header closeButton>
        <div className="verifyTitleContainer">
          <Modal.Title><span className="roomTitle">Booking Conflict</span></Modal.Title>
        </div>
        </Modal.Header>
        <Modal.Body className="clearfix">


          <div className="roomAvailability">
            <h3>This booking overlaps with the following booking you have already scheduled:</h3>
          </div>
          <div className="roomDetails">
            <p> Room: {this.props.bookingConflicts[0].roomName} </p>
            <p> Date: {this.props.MONTHS[new Date(this.props.bookingConflicts[0].startTime).getMonth()] + ' ' + new Date(this.props.bookingConflicts[0].startTime).getDate().toString()}</p>
            <p> StartTime: {formatTime(this.props.bookingConflicts[0].startTime)} </p>
            <p> EndTime: {formatTime(this.props.bookingConflicts[0].endTime)} </p>
          </div>

          <div>
            <button onClick={() => this.props.closeVerify(true)}>Book Anyway</button>
            <button onClick={() => this.props.closeVerify(false)}>Dont Book</button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

