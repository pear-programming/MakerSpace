import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime } from '../helpers.js'
import Calendar from './calendar';
import Room from './room'; 
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

var roomPlaceHolder = false;

export default class MakeReservation extends React.Component {
  render() {

    return (
      <div className="calendarContainer col-md-9">
             
        <Modal show={this.props.showModal} onHide={(event) => this.props.close(event)}>
          <Modal.Header closeButton>
          <div className="roomTitleContainer">
            <Modal.Title>My Modal<span className="roomTitle">{this.props.currentRoom.roomName || "room"}</span></Modal.Title>
          </div>
          </Modal.Header>
          <Modal.Body className="clearfix">
            <div className="roomImageContainer">
              <img className="roomImage" src={this.props.currentRoom.image}/>
            </div>
            <div className="roomDetails">
              <p> Capacity: {this.props.currentRoom.capacity} </p>
              <p> Conference Table: {this.props.currentRoom.conferenceTable ? "Yes" : "No"} </p>
              <p> Air-play: {this.props.currentRoom.airPlay ? "Yes" : "No"} </p>
              <p> Hammock: {this.props.currentRoom.hammock ? "Yes" : "No"} </p>
            </div>
            <div className="roomAvailability">
              <h3>{this.props.MONTHS[this.props.startTime.getMonth()]} <span>{this.props.startTime.getDate()}</span></h3>
              <div className="button-bar">
                
                <button onClick={() => this.props.open(new Date(2016, new Date(this.props.startTime).getMonth(), new Date(this.props.startTime).getDate() - 1, 4, 0))}>{this.props.MONTHS[new Date(Date.parse(this.props.startTime) - 86400000).getMonth()] + ' ' + new Date(Date.parse(this.props.startTime) - 86400000).getDate().toString()}</button>
                <button onClick={() => this.props.open(new Date(2016, new Date(this.props.startTime).getMonth(), new Date(this.props.startTime).getDate() + 1, 4, 0))}>{this.props.MONTHS[new Date(Date.parse(this.props.startTime) + 86400000).getMonth()] + ' ' + new Date(Date.parse(this.props.startTime) + 86400000).getDate().toString()}</button>
            
              </div>
            </div>
            <div className="selectRoom">
              <label>Select a Room</label>
              <select name="select" onChange={this.props.changeModalView}>
                { this.props.roomsWithTimeSlotInfo.filter(room => room.openSlots.length)
                    .map(room => { 
                      
                      return( 
                        this.props.currentRoom && room._id === this.props.currentRoom._id ?
                        <option value={room._id} selected="selected">{room.roomName}</option> : 
                        <option value={room._id}>{room.roomName}</option> 
                      ); 
                    })
                }
              </select>
            </div>

            <div className="selectStartTime">
              <label>Select a Start Time</label>
              <select name="select" onChange={this.props.changeStartTime}>
               { this.props.currentRoom.openSlots.map(slot => {

                    return(    
                      <option value={slot.startTime}>{formatTime(slot.startTime)}</option> 
                    ); 
                  })
                }
              </select>
            </div>

            <div className="selectEndTime">
              <label>Select an End Time</label>
              <select name="select" onChange={this.props.changeEndTime}>
                { this.props.nextFourSlots.map(slot => {
                      return(
                        <option value={slot}>{formatTime(slot)}</option> 
                      ); 
                    })
                }
              </select>
            </div>
            <div className="submitBooking">

              <button onClick={this.props.checkBooking}>Book Now</button>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    )
  }
}
