import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime, getTimeSlotInfo, mapTimeSlots, mapTimeSlotsByDay} from '../helpers.js'
import Calendar from './calendar';
import MakeReservation from './make-reservation'
import Conflict from './conflict';
import ConfirmReservation from './confirm-reservation';
import ReservationList from './my-reservations';
import FilterRooms from './filter-rooms'
import Room from './room'; 
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

var timeSlots;
var user;
var reservations;
var reservation = {roomName: " ", startTime: new Date(2016), endTime: new Date(2016)};
var goToDate = null;
var bookingConflicts = [{roomName: " ", startTime: '', endTime: ''}];
var reRenderCalendar = false;
var roomPlaceHolder = false;
var allEvents;


export default class Dashboard extends React.Component {
  
  constructor(){ 
    super()
    
    this.state = {
      events: null,
      rooms: [],
      roomsWithTimeSlotInfo: [],
      nextFourSlots: [],
      currentRoom: null,
      showModal: false,
      showVerify: false,
      showConfirm: false,
      shouldUpdateUserRes: false,
      startTime: new Date(2016, 0, 1, 9, 10),
      endTime: new Date(2016, 0, 1, 9, 11)
    }
  }

  componentWillMount() {
    console.log("ran componentWillMount")
    Promise.all([checkStatus(), fetchRooms(), fetchTimeSlots(), fetchReservations()])
    .then(data => {
      timeSlots = data[2].data; 
      user = data[0].data; 
      reservations = data[3].data;
      var mappedData = mapTimeSlots(data[3], data[1].data);
      allEvents = mappedData;
      this.setState({ 
        rooms: data[1].data,
        events: mappedData, 
        currentRoom: Object.assign(data[1].data[0], {openSlots: []})     
      })
    })
  }

  close(event) {
    event.preventDefault();
    roomPlaceHolder = true;
    this.setState({ showModal: false});
  }

  closeVerify(shouldCloseModal) {
    // console.log("inside closeVerify")
    if(shouldCloseModal) { 
      this.confirmBooking();  
    }
    else {
      this.setState({showVerify: false})
    }  
  }

  closeConfirm(event, shouldCloseModal) {
    event.preventDefault();
    if(shouldCloseModal) { 
      this.submitBooking();  
    }
    else {
      this.setState({showConfirm: false})
    }  
  }


  changeGoToDate(date) {
    goToDate = date;
  }  

  open(time) {
    var roomsWithTimeSlotInfo = mapTimeSlotsByDay(time, this.state.rooms, timeSlots); 
    var currentRoom;
    if(this.state.currentRoom && !roomPlaceHolder) {
      this.state.currentRoom.openSlots = roomsWithTimeSlotInfo.filter(room => room._id === this.state.currentRoom._id)[0].openSlots;
      
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

    var nextFourSlots = getTimeSlotInfo(currentRoom.openSlots[0].startTime, currentRoom);
    goToDate = time.getTime();


     $('.selectStartTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    $('.selectEndTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    roomPlaceHolder = false;

    this.setState({
      showModal: true, 
      roomsWithTimeSlotInfo: roomsWithTimeSlotInfo, 
      currentRoom: currentRoom,
      startTime: new Date(currentRoom.openSlots[0].startTime), 
      endTime: new Date(currentRoom.openSlots[0].endTime),
      nextFourSlots: nextFourSlots 
    });
  }


  changeModalView(event) {

    var currentRoom = this.state.roomsWithTimeSlotInfo.filter(room => room._id == event.target.value)[0] 

    $('.selectStartTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    $('.selectEndTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    var nextFourSlots = getTimeSlotInfo(currentRoom.openSlots[0].startTime, currentRoom); 
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

    var nextSlots = getTimeSlotInfo(event.target.value, this.state.currentRoom)
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

  makeReservation() {
    reservation = {
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

    if(conflicts.length) {
      bookingConflicts = conflicts;
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

    addReservation(reservation)
    .then(data => {
      var events = this.state.events.slice(); 
      var newReservation = {
        title: reservation.roomName,
        start: Date.parse(reservation.startTime),
        end: Date.parse(reservation.endTime),
        allDay: false,
        color: this.state.currentRoom.roomColor,
      }
      events.push(newReservation) 
      console.log('data in submit booking', data)
      allEvents.push(newReservation) 
      
      reservations.push(Object.assign(reservation, {
        startTime: reservation.startTime.toUTCString(),
        endTime: reservation.endTime.toUTCString()
      })); 
      console.log('newReservation')
      socket.emit('newReservation', newReservation)
      this.addToTimeslots();

      goToDate = Date.parse(reservation.startTime)
      reRenderCalendar = true;
      roomPlaceHolder = true;
      this.setState({showModal: false, events: events, showVerify: false, showConfirm: false, shouldUpdateUserRes: true})
    })
  }

  addToTimeslots() {
    timeSlots.filter(slot => {
      return Date.parse(slot.startTime) >= Date.parse(reservation.startTime) && Date.parse(slot.endTime) <= Date.parse(reservation.endTime)
    }).forEach(slot => slot.reservations.push(reservation))
  }

  resetReRender() {
    console.log("ran resetReRender")
    reRenderCalendar = false;
  }

  resetShouldUpdate() {
    this.setState({shouldUpdateUserRes: false});
  }

  deleteFromCalendar() {
    fetchReservations()
    .then(reserv => {
      reservations = reserv.data;
      var mappedData = mapTimeSlots(reserv, this.state.rooms);
      // console.log('did mappedData work? ', mappedData)
      reRenderCalendar = true
      this.setState({ events: mappedData })
    })
  }

  filterRooms(roomsToDisplay) {
    console.log("got rooms to display:", roomsToDisplay);
    reRenderCalendar = true;
    this.setState({events: allEvents.filter(ev => roomsToDisplay.includes(ev.title))});
  }

  render(){

    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
      <div>
        <NavBar />
        <div className='dashboardContainer'>

        {this.state.events && this.state.currentRoom ?  

        <div className="calendarContainer col-md-9">
            
            <MakeReservation 
              showModal={this.state.showModal}
              open={this.open.bind(this)}
              close={this.close.bind(this)}
              currentRoom={this.state.currentRoom}
              startTime={this.state.startTime}
              roomsWithTimeSlotInfo={this.state.roomsWithTimeSlotInfo}
              nextFourSlots={this.state.nextFourSlots}
              changeModalView={this.changeModalView.bind(this)}
              changeStartTime={this.changeStartTime.bind(this)}
              changeEndTime={this.changeEndTime.bind(this)}
              checkBooking={this.checkBooking.bind(this)}
              MONTHS={MONTHS}
            />

            <Conflict 
              showVerify = {this.state.showVerify}
              closeVerify = {this.closeVerify.bind(this)}
              bookingConflicts = {bookingConflicts}
              MONTHS = {MONTHS}
            /> 

            <ConfirmReservation 
              showConfirm = {this.state.showConfirm}
              closeConfirm = {this.closeConfirm.bind(this)}
              reservation = {reservation}
              MONTHS = {MONTHS}
            />


            <Calendar key={0} 
              events={this.state.events} 
              open={this.open.bind(this)}
              goToDate={goToDate}
              changeGoToDate={this.changeGoToDate.bind(this)}
              reRenderCalendar={reRenderCalendar}
              resetReRender={this.resetReRender.bind(this)}
            /> 

        </div>
        
        : null   }
           
      <ReservationList 
        deleteFromCalendar = {this.deleteFromCalendar.bind(this)}
        shouldUpdateUserRes={this.state.shouldUpdateUserRes}
        resetShouldUpdate={this.resetShouldUpdate.bind(this)}
      />

      <FilterRooms 
        rooms={this.state.rooms}
        filterRooms={this.filterRooms.bind(this)}
      />
      
      </div>
      </div>
    )
  }
}
