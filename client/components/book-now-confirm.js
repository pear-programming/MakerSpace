import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime } from '../helpers.js'
import Calendar from './calendar';
import Room from './room'; 
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';


export default class BookNowConfirm extends React.Component {
  
  render() {

    return (
      <Modal show={this.props.showConfirm} onHide={this.props.closeConfirm}>
        <Modal.Header closeButton>
        <div className="verifyTitleContainer">
          <Modal.Title><span className="roomTitle">Confirm Reservation</span></Modal.Title>
        </div>
        </Modal.Header>
        <Modal.Body className="clearfix">
         
          
          <div className="roomAvailability">
            <h3>Please choose an end time for your reservation</h3> 
          </div>
          
          <div>
        
            <button onClick={() => this.props.bookNow(this.props.nextOpenSlots[0])}>{formatTime(this.props.nextOpenSlots[0])} </button> 
            {this.props.nextOpenSlots[1] ?

              <button onClick={() => this.props.bookNow(this.props.nextOpenSlots[1])}>{formatTime(this.props.nextOpenSlots[1])} </button> 

              : null

            }
          </div>
          <div>
            <button onClick={this.props.closeConfirm}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}











