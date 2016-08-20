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

  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {

    return (
      <div className="calendarContainer col-md-9">

        <Modal show={this.props.showModal} onHide={this.props.close} className="calModal">

          <Modal.Header closeButton>

            <div className="roomTitleContainer">
              <Modal.Title><span className="roomTitle">{this.props.currentRoom.roomName || "room"}</span></Modal.Title>
            </div>

          </Modal.Header>

          <Modal.Body >


            <img className="calRoomImage" src={this.props.currentRoom.image}/>

          </Modal.Body>
          <Modal.Footer>

            <div className="calRoomAvailability">
              <div className="cal-button-bar">

                <button className="leftArrow" onClick={() => this.props.open(new Date(2016, new Date(this.props.startTime).getMonth(), new Date(this.props.startTime).getDate() - 1, 4, 0))}>{this.props.MONTHS[new Date(Date.parse(this.props.startTime) - 86400000).getMonth()] + ' ' + new Date(Date.parse(this.props.startTime) - 86400000).getDate().toString()}</button>
                <h4>{this.props.MONTHS[this.props.startTime.getMonth()]} <span>{this.props.startTime.getDate()}</span></h4>
                <button className="rightArrow" onClick={() => this.props.open(new Date(2016, new Date(this.props.startTime).getMonth(), new Date(this.props.startTime).getDate() + 1, 4, 0))}>{this.props.MONTHS[new Date(Date.parse(this.props.startTime) + 86400000).getMonth()] + ' ' + new Date(Date.parse(this.props.startTime) + 86400000).getDate().toString()}</button>

              </div>
            </div>


            <div className="calSelectors">
              <div className="selectRoom">
                <label>Pick a Room</label>
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
            </div>

            <div className="submitBooking">
              <button onClick={this.props.checkBooking}>Book Now</button>
            </div>

          </Modal.Footer>

        </Modal>

      </div>
    )
  }
}
