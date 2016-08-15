import React, { Component } from 'react';
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from 'react-bootstrap';
import { fetchRooms, getRoomReservations } from '../models/rooms';
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

export default class Room extends Component {

  constructor(props){
    super(props)

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

    this.state = {
      showModal: false,
      events: [],
      currentRoom: {},
      nextRes: {}
    };
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

  getInfo(name){
    getRoomReservations(name).then(reservations => {
      console.log('reservations', reservations)
      let timeDiffs = []
      console.log('reservations.data: ', reservations.data)
      if(reservations.data !== "no reservations currently exist for this room") {
        //if there are reservations do this....
        reservations.data.forEach(reservation => {
          let now = new Date()
          let startTime = new Date(reservation.startTime)

          timeDiffs.push({difference : now - startTime, startTime: startTime})
        })
        //finds largest negative number which is the next reservation start time

        let nextRes = _.sortBy(timeDiffs, 'difference').reverse()
        let future = nextRes.filter(timeObject => timeObject.difference < 0)[0]
        let events = formatEvents(reservations.data)
        console.log('events: ', events)
        this.setState({reservations: reservations.data, nextRes: new Date(future.startTime), events: events, showModal: true })
        console.log('this.state IF: ', this.state)
      } else {  //no current reservations

        this.setState({reservations: null, nextRes: null, events: null, showModal: true})
        console.log('this.state ELSE: ', this.state)

      }
    })
    console.log('what', this.state.events)
  }

  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }

  //we need events of a specific room to display for the current day
  //we need to be able to book a room with start time and endtime of only 2 hours

  render() {

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
              <button className="scheduleBtn">Today's Schedule</button>
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
