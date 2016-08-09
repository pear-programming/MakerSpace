import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Room from './room';
import {fetchRooms, changeStatus, getRoomReservations} from '../models/rooms';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import RoomCalendar from './room-calendar';


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



export default class TabletDisplay extends Component {
  constructor(props){  
    super(props)

    // dummy data for testing
    this.state = { 
      currentRoom: {},
      reservations: [{}],
      nextRes: {},
      events: null
    }

  }

  componentWillMount() {
    // we get the availablity, set as state for the current room
    // we also need to start the socket listen event for room status change

    var url = window.location.href.split('/');
    var currentRoom = url[url.length-2];
    currentRoom = decodeURIComponent(currentRoom)

    socket.on('updatedRooms', this.updateState.bind(this))
    fetchRooms() 
    .then(rooms=>{
      let room = rooms.data.find((room)=>room.roomName === currentRoom)
      this.setState({currentRoom: room})
      return room
    })
    .then(room => {
      return getRoomReservations(room.roomName)
    })
    .then(reservations => {

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
        this.setState({reservations: reservations.data, nextRes: new Date(future.startTime), events: events })
        console.log('this.state IF: ', this.state)
      } else {  //no current reservations
     
        this.setState({reservations: null, nextRes: null, events: null})
        console.log('this.state ELSE: ', this.state)

      }

    })

  }


  bookNow() {
    changeStatus(this.state.currentRoom.roomName)
    .then((x) => x)

    this.setState({ currentRoom: Object.assign(this.state.currentRoom, {isAvailable: false}) })
    socket.emit('bookNow', this.state.currentRoom._id)  
  }

  updateState(room) {
    var url = window.location.href.split('/');
    var currentRoom = url[url.length-2];
    const roomz = room.rooms.rooms.find(findRoom)
    
    function findRoom(findThisRoom) { 
      return findThisRoom.roomName === currentRoom;
    }
    this.setState({currentRoom: roomz})
  }
  componentWillUnmount() {
     socket.off('updatedRooms');
  }


  render() {
    var background = document.querySelector('body')
    const room = this.state.currentRoom
    console.log('this.state.nextRes', this.state.nextRes)
    console.log('room in tablet display: ', room)
    // console.log('background element', background)
    let nextReservation = "no current reservations"

    if(this.state.nextRes !== null){
      let nextReservation = this.state.nextRes.toString()
      nextReservation = "Next reservation is at " + nextReservation;
    } 
      console.log('nextReservation:', nextReservation)
    
    return (
      <div className = "tabletDisplayContainer">
     { room.isAvailable ? 
        <div className="tabletDisplayOpen">
          <h1>{room.roomName}  <sup className="infoCircle"> <i className="fa fa-info-circle" aria-hidden="true"></i> </sup></h1>
          <span className="open">available</span>
          <p>{nextReservation}</p>
      
          <div className="tabletFooter">
           <button onClick={this.bookNow.bind(this)}>Book Now!</button> 
          </div>
        </div>
        : 
        <div className="tabletDisplayClosed">
          <h1>{room.roomName} <sup className="infoCircle"> <i className="fa fa-info-circle" aria-hidden="true"></i> </sup></h1> 
          <span className="closed">In use</span>
          <div className="tabletFooter">
          </div>
        </div> 
      }

      { this.state.events ? 
      <div className="roomCalendar" >
         <RoomCalendar view="agendaDay" events={this.state.events} /> 
      </div> 
      : 
      <div className="roomCalendar" >
        <RoomCalendar view="agendaDay"/>
      </div> 
      }

  
      </div>
    )
  }
}