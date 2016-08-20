import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime } from '../helpers.js'
import Calendar from './calendar';
import Room from './room';
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';


export default class Conflict extends React.Component {

  render() {
    return (
      <Modal show={this.props.showConfirm} onHide={() => this.props.closeConfirm(false)}>
        <Modal.Header closeButton>
        <div className="verifyTitleContainer">
          <Modal.Title><span className="roomTitle">Confirm Reservation</span></Modal.Title>
        </div>
        </Modal.Header>
        <Modal.Body className="clearfix">


          <div className="roomAvailability">
            <h3>Here are your booking details.  Click confirm to secure your reservation</h3>
          </div>
          <div className="roomDetails">
            <p> Room: {this.props.reservation.roomName} </p>
            <p> Date: {this.props.MONTHS[new Date(this.props.reservation.startTime).getMonth()] + ' ' + new Date(this.props.reservation.startTime).getDate().toString()} </p>
            <p> StartTime: {formatTime(this.props.reservation.startTime)} </p>
            <p> EndTime: {formatTime(this.props.reservation.endTime)} </p>
          </div>

          <div>
            <button onClick={(event) => this.props.closeConfirm(event, true)}>Confirm</button>
            <button onClick={(event) => this.props.closeConfirm(event, false)}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

