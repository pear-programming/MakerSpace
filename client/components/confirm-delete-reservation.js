import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime } from '../helpers.js'
import Calendar from './calendar';
import Room from './room';
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';


export default class ConfirmDelete extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      showConfirmDelete : false
    }
  }

  render() {
    return (
      <Modal show={this.props.showConfirmDelete} onHide={() => this.props.closeConfirmDelete(false)}>
        <Modal.Header closeButton>
        <div className="verifyTitleContainer">
          <Modal.Title><span className="roomTitle">Cancel Reservation</span></Modal.Title>
        </div>
        </Modal.Header>
        <Modal.Body className="clearfix">

          <div className="roomAvailability">
            <h3>Are you sure you want to cancel this reservation?</h3>
          </div>

          <div>
            <button className="cancelRes" onClick={() => this.props.closeConfirmDelete(true)}>Cancel Reservation</button>
            <button className="cancelRes" onClick={() => this.props.closeConfirmDelete(false)}>Nevermind</button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
