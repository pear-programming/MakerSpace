import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime } from '../helpers.js'
import Calendar from './calendar';
<<<<<<< HEAD
import Room from './room';
=======
import Conflict from './conflict';
import Confirm from './confirm-reservation';
import ReservationList from './my-reservations';
import Room from './room'; 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

var timeSlots;
var user;
var rooms;
var reservations;
var reservation = {roomName: " ", startTime: new Date(2016), endTime: new Date(2016)};
var goToDate = null;
var bookingConflicts = [{roomName: " ", startTime: '', endTime: ''}];
var reRenderCalendar = false;
var roomPlaceHolder = false;


export default class Dashboard extends React.Component {
  constructor(){
    super()

    this.state = {
      events: null,
      roomsWithTimeSlotInfo: [],
      nextFourSlots: [],
      currentRoom: null,
      showModal: false,
      showVerify: false,
      showConfirm: false,
      startTime: new Date(2016, 0, 1, 9, 10),
      endTime: new Date(2016, 0, 1, 9, 11)
    }
  }

  close() {
    roomPlaceHolder = true;
    this.setState({ showModal: false});
  }

  closeVerify(shouldCloseModal) {
    console.log("inside closeVerify")
    if(shouldCloseModal) { 
      this.confirmBooking();  
    }
    else {
      this.setState({showVerify: false})
    }  
  }

  closeConfirm(shouldCloseModal) {
    console.log("inside closeVerify")
    if(shouldCloseModal) { 
      this.submitBooking();  
    }
    else {
      this.setState({showConfirm: false})
    }  
  }

  open(time) {
<<<<<<< HEAD
    var roomsWithTimeSlotInfo = this.mapTimeSlotsByDay(time);
    var currentRoom = roomsWithTimeSlotInfo.filter(room => room.openSlots.length)[0]
=======
    var roomsWithTimeSlotInfo = this.mapTimeSlotsByDay(time); 
    // console.log("showing rooms with slot info:", roomsWithTimeSlotInfo);
    var currentRoom;
    if(this.state.currentRoom && !roomPlaceHolder) {
      this.state.currentRoom.openSlots = roomsWithTimeSlotInfo.filter(room => room._id === this.state.currentRoom._id)[0].openSlots;
      // console.log("found tomorrow's:", this.state.currentRoom);
      if(!this.state.currentRoom.openSlots.length) {
        currentRoom = roomsWithTimeSlotInfo.filter(room => room.openSlots.length)[0];
      }
      else {
        currentRoom = this.state.currentRoom;
      }  
    }
    else {
      currentRoom = roomsWithTimeSlotInfo.filter(room => room.openSlots.length)[0]
    }

>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
    // console.log("showing current room in open:", currentRoom)
    var nextFourSlots = this.getTimeSlotInfo(currentRoom.openSlots[0].startTime, currentRoom);
    goToDate = time.getTime();

    //  $('.selectRoom option').prop('selected', function() {
    //     return this.defaultSelected;
    // });

     $('.selectStartTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    $('.selectEndTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    roomPlaceHolder = false;

    this.setState({
<<<<<<< HEAD
      showModal: true,
      roomsWithTimeSlotInfo: roomsWithTimeSlotInfo,
      currentRoom: currentRoom,
      startTime: new Date(currentRoom.openSlots[0].startTime),
=======
      showModal: true, 
      roomsWithTimeSlotInfo: roomsWithTimeSlotInfo, 
      currentRoom: currentRoom,
      startTime: new Date(currentRoom.openSlots[0].startTime), 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
      endTime: new Date(currentRoom.openSlots[0].endTime),
      nextFourSlots: nextFourSlots
    });
  }


  componentWillMount() {

    checkStatus()
    .then(userData => {
      fetchRooms()
      .then(roomsData => {
        fetchTimeSlots()
        .then(slots => {
          fetchReservations()
          .then(reserv => {
<<<<<<< HEAD
            timeSlots = slots.data;
=======
            console.log("showing reservations:", reserv);
            timeSlots = slots.data; 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
            user = userData.data;
            rooms = roomsData.data;
            reservations = reserv.data;
            var mappedData = this.mapTimeSlots(reserv, rooms);
            this.setState({
              events: mappedData,
              currentRoom: Object.assign(roomsData.data[0], {openSlots: []})
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

    var timeSlotsForDay = timeSlots.filter((timeSlot) => {

      var startTime = Date.parse(timeSlot.startTime);
      return startTime >= time.getTime() && startTime < (time.getTime() + 43200000)
    })

<<<<<<< HEAD
    return rooms.map(room => {
=======
    console.log("showing timeslots in mapTimeSlotsByDay:", timeSlotsForDay);

    return rooms.map(room => { 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
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
    this.setState({
      currentRoom: currentRoom,
      nextFourSlots: nextFourSlots,
      startTime: new Date(currentRoom.openSlots[0].startTime),
      endTime: new Date(currentRoom.openSlots[0].endTime)
    })
  }

  changeStartTime(event) {

    $('.selectEndTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    console.log("showing type of target:", typeof event.target.value)

    var nextSlots = this.getTimeSlotInfo(event.target.value, this.state.currentRoom)
    console.log("got next slots from getTimeSlotInfo:", nextSlots);
    this.setState({
      nextFourSlots: nextSlots,
      startTime: new Date(event.target.value),
      endTime: new Date(Date.parse(event.target.value) + 1800000)
    });
  }

  changeEndTime(event) {

    this.setState({endTime: new Date(event.target.value)});
  }

<<<<<<< HEAD
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

  submitBooking() {

    // console.log("startTime:", this.state.startTime);
    // console.log("endTime:", this.state.endTime);
    // console.log("room:", this.state.currentRoom);
    // console.log("user:", this.state.user);

    var reservation = {
=======

  makeReservation() {
    reservation = {
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      roomName: this.state.currentRoom.roomName,
      roomId: this.state.currentRoom._id,
      userName: user.name,
      userId: user.uid,
      userEmail: user.email
    };
  }


  checkBooking() {
    this.makeReservation();
    var conflicts = reservations.filter(res => {

      return res.userId === reservation.userId && 
      !(Date.parse(res.startTime) >= reservation.endTime.getTime() ||  
        Date.parse(res.endTime) <= reservation.startTime.getTime())
    })

    // console.log("found conflicts:", conflicts);
    if(conflicts.length) {
      bookingConflicts = conflicts;
      // alert("CONFLICT(S) FOUND!")
      this.setState({showVerify: true})
    }
    else {
      this.confirmBooking()
    }
  }

  confirmBooking() {

    this.setState({showConfirm: true, showVerify: false})
  }

  submitBooking() {
    console.log("inside submit booking")

    addReservation(reservation)
    .then(data => {
      var events = this.state.events.slice();
      events.push({
        title: reservation.roomName,
        start: Date.parse(reservation.startTime),
        end: Date.parse(reservation.endTime),
        allDay: false,
        color: this.state.currentRoom.roomColor
      })
<<<<<<< HEAD

      // console.log("successfully inserted!:", data)
=======
     
      // console.log("successfully inserted!:", data);
      
      reservations.push(Object.assign(reservation, {
        startTime: reservation.startTime.toUTCString(),
        endTime: reservation.endTime.toUTCString()
      })); 

      this.addToTimeslots();

      // console.log("pushed new reservation:", reservations[reservations.length - 1]);

>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
      goToDate = Date.parse(reservation.startTime)
      reRenderCalendar = true;
      roomPlaceHolder = true;
      this.setState({showModal: false, events: events, showVerify: false, showConfirm: false})
    })
  }

<<<<<<< HEAD
  renderCalendar() {
    // console.log("renderCalendar got called:", this.state.events);
=======
  addToTimeslots() {
    timeSlots.filter(slot => {
      return Date.parse(slot.startTime) >= Date.parse(reservation.startTime) && Date.parse(slot.endTime) <= Date.parse(reservation.endTime)
    }).forEach(slot => slot.reservations.push(reservation))
  }


  renderCalendar() { 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa

    return <Calendar key={0}
      events={this.state.events}
      open={this.open.bind(this)}
      goToDate={goToDate}
<<<<<<< HEAD
      />
=======
      reRenderCalendar={reRenderCalendar}
      resetReRender={this.resetReRender.bind(this)}
      /> 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
  }

  resetReRender() {
    console.log("ran resetReRender")
    reRenderCalendar = false;
  }

  render(){
    // console.log("showing events:", this.state.events);
    // console.log("showing this:", this);
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
      <div>
        <NavBar />
        <div className='dashboardContainer'>

<<<<<<< HEAD
       {this.state.events ?

        <div>

=======
       {this.state.events && this.state.currentRoom ?  

        <div className="calendarContainer col-md-9">
         
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
            <div className="roomTitleContainer">
              <Modal.Title>My Modal<span className="roomTitle">{this.state.currentRoom.roomName || "room"}</span></Modal.Title>
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
<<<<<<< HEAD

=======
                <div className="button-bar">
                  
                  <button onClick={() => this.open.call(this, new Date(2016, new Date(this.state.startTime).getMonth(), new Date(this.state.startTime).getDate() - 1, 4, 0))}>{MONTHS[new Date(Date.parse(this.state.startTime) - 86400000).getMonth()] + ' ' + new Date(Date.parse(this.state.startTime) - 86400000).getDate().toString()}</button>
                  <button onClick={() => this.open.call(this, new Date(2016, new Date(this.state.startTime).getMonth(), new Date(this.state.startTime).getDate() + 1, 4, 0))}>{MONTHS[new Date(Date.parse(this.state.startTime) + 86400000).getMonth()] + ' ' + new Date(Date.parse(this.state.startTime) + 86400000).getDate().toString()}</button>
              
                </div>
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
              </div>
              <div className="selectRoom">
                <label>Select a Room</label>
                <select name="select" onChange={this.changeModalView.bind(this)}>
                  { this.state.roomsWithTimeSlotInfo.filter(room => room.openSlots.length)
<<<<<<< HEAD
                      .map(room => {
                        return(
                          <option value={room._id}>{room.roomName}</option>
                        );
=======
                      .map(room => { 
                        
                        return( 
                          this.state.currentRoom && room._id === this.state.currentRoom._id ?
                          <option value={room._id} selected="selected">{room.roomName}</option> : 
                          <option value={room._id}>{room.roomName}</option> 
                        ); 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
                      })
                  }
                </select>
              </div>

              <div className="selectStartTime">
                <label>Select a Start Time</label>
                <select name="select" onChange={this.changeStartTime.bind(this)}>
                 { this.state.currentRoom.openSlots.map(slot => {

<<<<<<< HEAD
                      return(
                        <option value={slot.startTime}>{this.formatTime(slot.startTime)}</option>
                      );
=======
                      return(    
                        <option value={slot.startTime}>{formatTime(slot.startTime)}</option> 
                      ); 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
                    })
                  }
                </select>
              </div>

              <div className="selectEndTime">
                <label>Select an End Time</label>
                <select name="select" onChange={this.changeEndTime.bind(this)}>
                  { this.state.nextFourSlots.map(slot => {
                        return(
<<<<<<< HEAD
                          <option value={slot}>{this.formatTime(slot)}</option>
                        );
=======
                          <option value={slot}>{formatTime(slot)}</option> 
                        ); 
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
                      })
                  }
                </select>
              </div>
              <div className="submitBooking">

                <button onClick={this.checkBooking.bind(this)}>Book Now</button>
              </div>
            </Modal.Body>
          </Modal>
 
            <Conflict 
              showVerify={this.state.showVerify}
              closeVerify={this.closeVerify.bind(this)}
              bookingConflicts={bookingConflicts}
              MONTHS={MONTHS}
            /> 

            <Confirm 
              showConfirm={this.state.showConfirm}
              closeConfirm= {this.closeConfirm.bind(this)}
              reservation={reservation}
              MONTHS={MONTHS}
            />

          {this.renderCalendar.call(this)}
        </div>
        

        : null   }
<<<<<<< HEAD

=======
           
      <ReservationList />
      
      </div>
>>>>>>> 54a09dfbc1ee8a57474f08f7b79af6320c78e9fa
      </div>
    )
  }
}
