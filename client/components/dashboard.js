import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms} from '../models/rooms';
import Calendar from './calendar';
import Room from './room'; 
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default class Dashboard extends React.Component {
  constructor(){ 
    super()
    
    this.state = {
      user: null,
      events: null,
      timeSlots: null,
      roomsWithTimeSlotInfo: [],
      nextFourSlots: [],
      rooms: null,
      currentRoom: null,
      showModal: false,
      startTime: new Date(2016, 0, 1, 9, 10)
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open(time) {
    var roomsWithTimeSlotInfo = this.mapTimeSlotsByDay(time); 
    var currentRoom = roomsWithTimeSlotInfo.filter(room => room.openSlots.length)[0] 
    var nextFourSlots = this.getTimeSlotInfo(currentRoom.openSlots[0].startTime, currentRoom);

    this.setState({
      showModal: true, 
      roomsWithTimeSlotInfo: roomsWithTimeSlotInfo, 
      currentRoom: currentRoom, 
      startTime: time, 
      nextFourSlots: nextFourSlots 
    });
  }

  componentWillMount() {

    checkStatus()
    .then(user => {
      fetchRooms()
      .then(rooms => {
        fetchTimeSlots()
        .then(timeSlots => {
          fetchReservations()
          .then(reservations => {
            // console.log('reservations', reservations.data)
            // console.log('do i have rooms? ', rooms.data) /// room.data.roomColor
          
            var mappedData = this.mapTimeSlots(reservations, rooms.data);

            this.setState({ 
              user: user.data, 
              events: mappedData, 
              timeSlots: timeSlots.data, 
              rooms: rooms.data,
              currentRoom: Object.assign(rooms.data[0], {openSlots: []})     
            })
          })
        })
      })
    })    
  }

  getTimeSlotInfo(time, room) {

    var slots = room.openSlots
    var thirtyMin = 1800000;
    var nextSlots = [];
    var index = slots.indexOf(slots.filter(slot => Date.parse(slot.endTime) === Date.parse(time) + thirtyMin)[0]);
    
    nextSlots.push(new Date(Date.parse(time) + thirtyMin).toUTCString());

    for(var i = 1; index + i < slots.length && i < 4; i++) {

      if(Date.parse(slots[index + i].endTime) === Date.parse(slots[index].endTime) + thirtyMin * i) {
        nextSlots.push(new Date(Date.parse(time) + thirtyMin * (i + 1)).toUTCString())
      }
      else {
        return nextSlots;
      }
    }
    return nextSlots;  
  }

  mapTimeSlots(reservations, rooms) {
    console.log('reservations!!!', reservations.data)
    console.log('rooms:', rooms)
    //add room color to reservations object


    return reservations.data.map(reservation => {
      var room = rooms.filter(room => room.roomName === reservation.roomName)
      var color;
      if(room[0]) {
        color = room[0].roomColor;
      } else {
        color = "#0073b7"
      }

      return {
        title: reservation.roomName, 
        start: Date.parse(reservation.startTime), 
        end: Date.parse(reservation.endTime), 
        allDay: false, 
        color: color
      };
    })

  }

  mapTimeSlotsByDay(time) {

    var timeSlotsForDay = this.state.timeSlots.filter((timeSlot) => {
  
      var startTime = Date.parse(timeSlot.startTime); 
      return startTime >= time.getTime() && startTime < (time.getTime() + 43200000)
    }) 

    return this.state.rooms.map(room => { 
      var openSlots = timeSlotsForDay.filter(slot => !slot.reservations.filter(res => res.roomId === room._id).length )
      return Object.assign(room, {openSlots: openSlots})
    })
  }

  changeModalView(event) {

    var currentRoom = this.state.roomsWithTimeSlotInfo.filter(room => room._id == event.target.value)[0] 

    $('.selectStartTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    $('.selectEndTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    var nextFourSlots = this.getTimeSlotInfo(currentRoom.openSlots[0].startTime, currentRoom); 
    this.setState({currentRoom: currentRoom, nextFourSlots: nextFourSlots});
  }

  changeStartTime(event) {

    $('.selectEndTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    var nextSlots = this.getTimeSlotInfo(event.target.value, this.state.currentRoom)
    console.log("got next slots from getTimeSlotInfo:", nextSlots);
    this.setState({nextFourSlots: nextSlots});
  }

  changeEndTime() {

  }

  formatTime(time) {
    var hours = new Date(Date.parse(time) + 18000000).getHours() 
    var amPm;
    if(hours > 12) {
      hours = hours - 12
      amPm = 'pm'
    }
    else if(hours === 12) {  
      amPm = 'pm'
    }
    else {
      amPm = 'am'
    }
    return hours.toString() + ":" + (new Date(time).getMinutes().toString() + "0").slice(0,2) + amPm;
  }

  render(){

    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
      <div>
        <NavBar />

       {this.state.events ?  

        <div>
          <Calendar 
            events={this.state.events}
            open={this.open.bind(this)}
          /> 

          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
            <div className="roomTitleContainer">
              <Modal.Title>My Modal<span className="roomTitle">{this.state.currentRoom.roomName}</span></Modal.Title>
            </div>
            </Modal.Header>
            <Modal.Body className="clearfix">
              <div className="roomImageContainer">
                <img className="roomImage" src={this.state.currentRoom.image}/>
              </div>
              <div className="roomDetails">
                <p> Capacity: {this.state.currentRoom.capacity} </p>
                <p> Conference Table: {this.state.currentRoom.conferenceTable ? "Yes" : "No"} </p>
                <p> Air-play: {this.state.currentRoom.airPlay ? "Yes" : "No"} </p>
                <p> Hammock: {this.state.currentRoom.hammock ? "Yes" : "No"} </p>
              </div>
              <div className="roomAvailability">
                <h3>{MONTHS[this.state.startTime.getMonth()]} <span>{this.state.startTime.getDate()}</span></h3>
                
              </div>
              <div className="selectRoom">
                <label>Select a Room</label>
                <select name="select" onChange={this.changeModalView.bind(this)}>
                  { this.state.roomsWithTimeSlotInfo.filter(room => room.openSlots.length)
                      .map(room => {
                        return(
                          <option value={room._id}>{room.roomName}</option> 
                        ); 
                      })
                  }
                </select>
              </div>

              <div className="selectStartTime">
                <label>Select a Start Time</label>
                <select name="select" onChange={this.changeStartTime.bind(this)}>
                 { this.state.currentRoom.openSlots.map(slot => {

                      return(    
                        <option value={slot.startTime}>{this.formatTime(slot.startTime)}</option> 
                      ); 
                    })
                  }
                </select>
              </div>

              <div className="selectEndTime">
                <label>Select an End Time</label>
                <select name="select" onChange={this.changeEndTime.bind(this)}>
                  { this.state.nextFourSlots.map(slot => {
                        return(
                          <option value={slot}>{this.formatTime(slot)}</option> 
                        ); 
                      })
                  }
                </select>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        : null   }
           
      </div>
    )
  }
}
