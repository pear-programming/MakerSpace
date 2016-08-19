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
      endTime: new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 4, 30 ),
      nextFourSlots:[],
      reRenderCalendar: false,
      user: null,
      userId: null,
      userEmail: null,
    };
  }

  componentWillMount() {
    checkStatus()
    .then(userData => {
      this.setState(
        {
        user: userData.data.name,
        userId: userData.data.uid,
        userEmail: userData.data.email,
        })
    })
  }

  mapTimeSlotsByDay(time) {
    var timeSlotsForDay = timeSlots.filter((timeSlot) => {
      var startTime = Date.parse(timeSlot.startTime);
      if(startTime === time.getTime()){
      }
      return startTime >= time.getTime() && startTime < (time.getTime() + 43200000)
    })
    var openSlots = timeSlotsForDay.filter(
      slot => !slot.reservations.filter(
        res => res.roomId === this.props.roomInfo._id
      ).length
    )
    .filter(slot => {
      return Date.parse(slot.startTime) + 18000000 > Date.now()
    })
    this.props.roomInfo.openSlots = openSlots
  }

  getInfo(name){
    fetchTimeSlots()
    .then(slots => {
      getRoomReservations(name).then(reservations => {
        timeSlots = slots.data
        let timeDiffs = []
        if(reservations.data !== "no reservations currently exist for this room") {
          reservations.data.forEach(reservation => {
            let now = new Date()
            let startTime = new Date(reservation.startTime)
            timeDiffs.push({
              difference : now - startTime, startTime: startTime
            })
          })
          let currentTime = new Date(Date.now())
          this.mapTimeSlotsByDay(new Date(
            currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 4, 0 )
          )
          var nextFourSlots = this.getTimeSlotInfo(this.props.roomInfo.openSlots[0].startTime, this.props.roomInfo);
          let nextRes = _.sortBy(timeDiffs, 'difference').reverse()
          let future = nextRes.filter(timeObject => timeObject.difference < 0)[0]
          let events = formatEvents(reservations.data)
          this.setState({
             reservations: reservations.data,
             nextRes: new Date(future.startTime),
             events: events,
             showModal: true,
             nextFourSlots: nextFourSlots,
             startTime: new Date(this.props.roomInfo.openSlots[0].startTime),
             endTime: new Date(Date.parse(this.props.roomInfo.openSlots[0].startTime) + 1800000)
           })
        }
        else {  //no current reservations
          this.setState({
            reservations: null,
            nextRes: null,
            events: null,
            showModal: true
          })
        }
      })
    })
  }

  close() {
    this.setState({
      showModal: false
    });
  }
  open(time) {
    var roomsWithTimeSlotInfo = this.mapTimeSlotsByDay(time);
    var currentRoom = roomsWithTimeSlotInfo.filter(room => room.openSlots.length)[0]
    var nextFourSlots = this.getTimeSlotInfo(currentRoom.openSlots[0].startTime, currentRoom);
    goToDate = time.getTime();

    this.setState({
      showModal: true,
      roomsWithTimeSlotInfo: roomsWithTimeSlotInfo,
      currentRoom: currentRoom,
      startTime: new Date(currentRoom.openSlots[0].startTime),
      endTime: new Date(currentRoom.openSlots[0].endTime),
      nextFourSlots: nextFourSlots
    });
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

  changeStartTime(event){
    $('.selectEndTime option').prop('selected', function() {
        return this.defaultSelected;
    });
    var nextSlots = this.getTimeSlotInfo(event.target.value, this.props.roomInfo)
    console.log("got next slots from getTimeSlotInfo:", nextSlots);
    this.setState({
      nextFourSlots: nextSlots,
      startTime: new Date(event.target.value),
      endTime: new Date(Date.parse(event.target.value) + 1800000)
    });
  }
  changeEndTime(event){
    this.setState({
      endTime: new Date(event.target.value)
    });
  }

  submitBooking() {
    var reservation = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      roomName: this.props.roomInfo.roomName,
      roomId: this.props.roomInfo._id,
      userName: this.state.user,
      userId: this.state.userId,
      userEmail: this.state.userEmail
    }
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
      goToDate = Date.parse(reservation.startTime)
      this.setState({
        showModal: false,
        events: events,
        reRenderCalendar: true
      })
    })
  }

  renderCalendar() {

    return (<Calendar key={0}
      events={this.state.events}
      open={this.open.bind(this)}
      goToDate={goToDate}
      />
  )}

  render() {
    const room = this.props.roomInfo;

    var title = {float: 'left'}
    var info = {float: 'right'}

    return (
      <div>
        <Row className="row" id={room.roomName}
          onMouseEnter={ (e)=> this.props.updateWindow(e.target.id)}>
          <Col md={6} className="eachRoom"><div id={room.roomName}
            onMouseEnter={ (e)=> this.props.updateWindow(e.target.id)}>
            {room.roomName}
          </div>
          </Col>
          <Col md={6}>
            { room.isAvailable
              ?
              <div className="opened" id={room.roomName}
                onMouseEnter={ (e)=> this.props.updateWindow(e.target.id)}
                onClick={(e)=>this.getInfo(e.target.id)}>
                ⚪ Book Now 
              </div>
              :
              <div className="booked" id={room.roomName}
                onMouseEnter={ (e)=> this.props.updateWindow(e.target.id)}
                onClick={(e)=>this.getInfo(e.target.id)}>
                🕒 Reserved  
              </div>
              }
          </Col>
        </Row>
        <Modal className="carlo" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
          <div className="roomTitleContainer">
            <Modal.Title>
              {this.props.mode}
                <span className="roomTitle">
              {room.roomName}
              </span>
            </Modal.Title>
          </div>
          </Modal.Header>
            <Modal.Body className="clearfix">
              <div className="selecters">
                <div>
                  <h3>
                    <span className={room.isAvailable ? 'open' : 'closed'}>
                      {room.isAvailable ? 'available' : 'In use'}
                    </span>
                  </h3>
                </div>
              <div className="selectStartTime">
                <label>Select a Start Time</label>
                {this.props.roomInfo.openSlots ?
                  <select name="select1" onChange={this.changeStartTime.bind(this)}>
                    { this.props.roomInfo.openSlots.map(slot => {
                      return(
                        <option className="changeStartTimes" value={slot.startTime}>
                          {this.formatTime(slot.startTime)}
                        </option>
                      );
                    })
                  }
                </select> : null}
              </div>
              <div className="select">
                <label>Select an End Time</label>
                <select name="select2" onChange={this.changeEndTime.bind(this)}>
                  { this.state.nextFourSlots.map(slot => {
                    return(
                      <option className="changeEndTimes" value={slot}>
                        {this.formatTime(slot)}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            <button onClick={this.submitBooking.bind(this)} className="scheduleBtn">
              Book Today
            </button>
          </div>
              <div className="roomCalendarDay" >
                <RoomCalendar events={this.state.events} view="agendaDay"/>
              </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
