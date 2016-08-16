import React, { Component } from 'react';
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from 'react-bootstrap';
import { fetchRooms, getRoomReservations, fetchTimeSlots, addReservation } from '../models/rooms';
import { checkStatus } from '../models/auth';
import { browserHistory, Link } from 'react-router';
import RoomCalendar from './room-calendar';
import TabletDisplay from './tablet-display';
import _ from 'lodash';

function formatEvents(resArray) {
  return resArray.map(res => {
    var start = new Date(res.startTime).getTime()
    var end = new Date(res.endTime).getTime()
    return {
      title: res.userName,
      start: start,
      end: end,
      allDay: false
    }
  })
}



let timeSlots = [];
let goToDate = null;







export default class Room extends Component {

  constructor(props){
    super(props)

    let currentTime = new Date(Date.now())

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this.state = {
      showModal: false,
      events: [],
      currentRoom: {},
      nextRes: {},
      startTime: new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 4, 0 ),
      endTime: new Date(2016, 0, 1, 9, 11),
      nextFourSlots:[],
      reRenderCalendar: false,
      user: null,
      userId: null,
      userEmail: null,
      // goToDate: null
    };
  }

  componentWillMount() {
    checkStatus()
    .then(userData => {
      this.setState(
        {
        user: userData.data.name,
        userId: userData.data.uid,
        userEmail: userData.data.email
        })
    })
  }



  // componentWillMount() {
  //   fetchRooms()
  //   .then((room) => {
  //     console.log('what', room)
  //     this.setState({currentRoom: room.roomName})
  //     return room.roomName}
  //   )
  //   .then(room =>{
  //     return getRoomReservations(room.roomName)
  //   })
  //   .then(reservations => {
  //
  //     let timeDiffs = []
  //     console.log('reservations.data: ', reservations.data)
  //     if(reservations.data !== "no reservations currently exist for this room") {
  //       //if there are reservations do this....
  //       reservations.data.forEach(reservation => {
  //         let now = new Date()
  //         let startTime = new Date(reservation.startTime)
  //
  //         timeDiffs.push({difference : now - startTime, startTime: startTime})
  //       })
  //       //finds largest negative number which is the next reservation start time
  //
  //       let nextRes = _.sortBy(timeDiffs, 'difference').reverse()
  //       let future = nextRes.filter(timeObject => timeObject.difference < 0)[0]
  //       let events = formatEvents(reservations.data)
  //       console.log('events: ', events)
  //       this.setState({reservations: reservations.data, nextRes: new Date(future.startTime), events: events })
  //       console.log('this.state IF: ', this.state)
  //     } else {  //no current reservations
  //
  //       this.setState({reservations: null, nextRes: null, events: null})
  //       console.log('this.state ELSE: ', this.state)
  //
  //     }
  //   })
  // }

  mapTimeSlotsByDay(time) {
    console.log(time.getTime(), " this is the time ");
    var timeSlotsForDay = timeSlots.filter((timeSlot) => {

      // console.log(timeSlot.startTime, " timeSlot~~~~~~");

      var startTime = Date.parse(timeSlot.startTime);
      // console.log(startTime, " ");
      if(startTime === time.getTime()){
        // console.log(startTime, "found matching time");
      }
      return startTime >= time.getTime() && startTime < (time.getTime() + 43200000)
    })

    console.log(timeSlotsForDay," timeSlotsForDay~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    var openSlots = timeSlotsForDay.filter(slot => !slot.reservations.filter(res => res.roomId === this.props.roomInfo._id).length )
      .filter(slot => {
        console.log(Date.parse(slot.startTime), '!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(Date.now(), "time now!!!!!!!!!!!!!!!!!!!!!!");
        return Date.parse(slot.startTime) + 18000000 > Date.now()
      })
      this.props.roomInfo.openSlots = openSlots
    // console.log("openSlots~~~~~~~~~~", openSlots);
    // return rooms.map(room => {
    //   var openSlots = timeSlotsForDay.filter(slot => !slot.reservations.filter(res => res.roomId === room._id).length )
    //   return Object.assign(room, {openSlots: openSlots})
    // })

  }

  getInfo(name){

    fetchTimeSlots()
    .then(slots => {
    getRoomReservations(name).then(reservations => {
      timeSlots = slots.data
      // console.log('hiiiiiiiiiii slots ', slots);
      // console.log('reservations', reservations)
      let timeDiffs = []
      // console.log('reservations.data: ', reservations.data)
      if(reservations.data !== "no reservations currently exist for this room") {
        //if there are reservations do this....
        reservations.data.forEach(reservation => {
          let now = new Date()
          let startTime = new Date(reservation.startTime)

          timeDiffs.push({difference : now - startTime, startTime: startTime})
        })
        //finds largest negative number which is the next reservation start time
        // console.log(this.state.startTime, "this is the startTime ~~~~~~~~~~~~~~~~");
        this.mapTimeSlotsByDay(this.state.startTime)
        var nextFourSlots = this.getTimeSlotInfo(this.props.roomInfo.openSlots[0].startTime, this.props.roomInfo);
        console.log(this.mapTimeSlotsByDay(this.state.startTime), " show time slots !!!!!!!!!!!!!!!!!!!!!!!!!!!");
        let nextRes = _.sortBy(timeDiffs, 'difference').reverse()
        let future = nextRes.filter(timeObject => timeObject.difference < 0)[0]
        let events = formatEvents(reservations.data)
        console.log('events: ', events)
        this.setState({reservations: reservations.data,
           nextRes: new Date(future.startTime),
           events: events,
           showModal: true,
           nextFourSlots: nextFourSlots
         })
        console.log('this.state IF: ', this.state)
      } else {  //no current reservations

        this.setState({reservations: null, nextRes: null, events: null, showModal: true})
        console.log('this.state ELSE: ', this.state)

      }
    })
  })
    // console.log('what', this.state.events)
  }

  close() {
    this.setState({ showModal: false });
  }
  open() {
    goToDate = time.getTime()
    this.setState({ showModal: true });
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

  // var nextFourSlots = this.getTimeSlotInfo(currentRoom.openSlots[0].startTime, currentRoom);
  // this.setState({
  //   currentRoom: currentRoom,
  //   nextFourSlots: nextFourSlots,
  //   startTime: new Date(currentRoom.openSlots[0].startTime),
  //   endTime: new Date(currentRoom.openSlots[0].endTime)
  // })

  changeStartTime(event){
    $('.selectEndTime option').prop('selected', function() {
        return this.defaultSelected;
    });

    console.log("showing type of target:", typeof event.target.value)

    var nextSlots = this.getTimeSlotInfo(event.target.value, this.props.roomInfo)
    console.log("got next slots from getTimeSlotInfo:", nextSlots);
    this.setState({
      nextFourSlots: nextSlots,
      startTime: new Date(event.target.value),
      endTime: new Date(Date.parse(event.target.value) + 1800000)
    });
  }

  changeEndTime(event){
    this.setState({endTime: new Date(event.target.value)});
  }

  submitBooking() {
    // checkStatus()
    // .then(userData => {
    //   this.setState(
    //     {
    //     user: userData.data.name,
    //     userId: userData.data.uid,
    //     userEmail: userData.data.email
    //     })
    // })
    console.log(this.state, "find me!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log("startTime:", this.state.startTime);
    // console.log("endTime:", this.state.endTime);
    // console.log("room:", this.state.currentRoom);
    // console.log("user:", this.state.user);

    var reservation = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      roomName: this.props.roomInfo.roomName,
      roomId: this.props.roomInfo._id,
      userName: this.state.user,
      userId: this.state.userId,
      userEmail: this.state.userEmail
    }


    console.log("ready to insert reservation:", reservation);

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

      console.log("successfully inserted!:", data)
      goToDate = Date.parse(reservation.startTime)
      this.setState({showModal: false, events: events, reRenderCalendar: true})
    })

  }


  renderCalendar() {
    // console.log("renderCalendar got called:", this.state.events);

    return <Calendar key={0}
      events={this.state.events}
      open={this.open.bind(this)}
      goToDate={goToDate}
      />
  }


  ////  we need events of a specific room to display for the current day
  //we need to be able to book a room with start time and endtime of only 2 hours

  render() {
    console.log("this.state.startTime ", this.state.startTime);
    const room = this.props.roomInfo;

    var title = {float: 'left'}
    var info = {float: 'right'}

    return (



      <div>
        <Row className="row">
          <Col md={6} className="eachRoom"><div onClick={() => this.open() } >{room.roomName}</div></Col>

          <Col md={6}>
            { room.isAvailable ? <div className="opened" id={room.roomName} onClick={(e)=>this.getInfo(e.target.id)}>⚪ Book Now </div> : <div className="booked" id={room.roomName} >🕒 Reserved  </div> }
          </Col>
        </Row>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
          <div className="roomTitleContainer">
            <Modal.Title>{this.props.mode}<span className="roomTitle">{room.roomName}</span></Modal.Title>
          </div>
          </Modal.Header>
          <div className="roomCalendarDay" >
             <RoomCalendar events={this.state.events} view="agendaDay"/>
          </div>
          <Modal.Body className="clearfix">
            <div className="roomAvailability">
              <h3> <span className={room.isAvailable ? 'open' : 'closed'}>{room.isAvailable ? 'available' : 'In use'}</span></h3>
              <button onClick={this.submitBooking.bind(this)} className="scheduleBtn">Book Today</button>
            </div>
            <div className="selectStartTime">
              <label>Select a Start Time</label>
              {this.props.roomInfo.openSlots ?
                <select name="select" onChange={this.changeStartTime.bind(this)}>
                  { this.props.roomInfo.openSlots.map(slot => {
                    return(
                      <option value={slot.startTime}>{this.formatTime(slot.startTime)}</option>
                    );
                  })
                }
              </select> : null}

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
    )
  }
}



// <div className="roomImageContainer">
//   <img className="roomImage" src={room.image}/>
// </div>
// <div className="roomDetails">
//   <p> Capacity: {room.capacity} </p>
//   <p> Conference Table: {room.conferenceTable ? "Yes" : "No"} </p>
//   <p> Air-play: {room.airPlay ? "Yes" : "No"} </p>
//   <p> Hammock: {room.hammock ? "Yes" : "No"} </p>
// </div>
