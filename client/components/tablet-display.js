import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Room from './room';
import {fetchRooms, changeStatus, getRoomReservations} from '../models/rooms';
import ReactDOM from 'react-dom';

export default class TabletDisplay extends Component {
  constructor(props){  
    super(props)

    // dummy data for testing
    this.state = { 
      currentRoom: {},
      reservations: [{}]
    }

  }

  componentWillMount() {
    // we get the availablity, set as state for the current room
    // we also need to start the socket listen event for room status change

    var url = window.location.href.split('/');
    var currentRoom = url[url.length-2];

    socket.emit('tabletDisplay', 'xD')
    socket.on('updatedRooms', this.updateState.bind(this))
    fetchRooms() 
    .then(rooms=>{
      
      const room = rooms.data.find(findRoom)
      
      function findRoom(findThisRoom) { 
        return findThisRoom.roomName === currentRoom;
      }
      this.setState({currentRoom: room})
      return room
    })
    .then(room => {
      return getRoomReservations(room.roomName)
    })
    .then(reservations => {
      console.log('reservations.data: ', reservations.data)
      this.setState({reservations: reservations.data})
      console.log('this.state: ', this.state)
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
  // changeColor(mode) {
  //   $('body').css('background-color', 'green')
  // }

  render() {
    var background = document.querySelector('body')
    const room = this.state.currentRoom

    console.log('ROOM!!! ', room)
    // console.log('background element', background)

    return (
      room.isAvailable ? // dummy for testing
        <div className="tabletDisplayOpen">
          <h2>{room.roomName}<i className="fa fa-info-circle" aria-hidden="true"></i> </h2>
          <h1>available</h1>
          <p>Next reservation at {this.state.reservations[0].startTime}</p>
          <div>
            <p>Hope to have daily schedule for this room show here</p>
          </div>
          <div className="tabletFooter">
           <button onClick={this.bookNow.bind(this)}>Book Now!</button>     
          </div>
        </div>
        : 
        <div className="tabletDisplayClosed">
          <h2>{room.roomName} is <span>closed</span> until 2:00pm</h2>
          <p>Hope to have daily schedule for this room show here</p>
          <div className="tabletFooter">
          </div>
        </div> 
    )
  }
}