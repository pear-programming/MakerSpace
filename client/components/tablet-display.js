import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Room from './room';
import {fetchRooms, changeStatus} from '../models/rooms';
import ReactDOM from 'react-dom';


export default class TabletDisplay extends Component {
  constructor(props){  
    super(props)

    // dummy data for testing
    this.state = { 
      currentRoom: {}
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
      console.log(rooms.data)
      const room = rooms.data.find(findRoom)
      
      function findRoom(findThisRoom) { 
        return findThisRoom.roomName === currentRoom;
      }

      this.setState({currentRoom: room})
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
  changeColor(mode) {
    $('body').css('background-color', 'green')
  }

  render() {
    var background = document.querySelector('body')

    console.log('background element', background)

    var open = { backgroundColor: "green"}
    var closed = { backgroundColor: "red"}

    return (
      this.state.currentRoom.isAvailable ? // dummy for testing
        <div className="fullscreen" style={open}>
          <h2>{this.state.currentRoom.roomName}</h2>
          <h1>OPEN</h1> 
          <button onClick={this.bookNow.bind(this)}>Book Now!</button>     
        </div>
        : 
        <div className="fullscreen" style={closed}>
          <h2>{this.state.currentRoom.roomName}</h2>
          <h1>CLOSED</h1>
        </div> 
        
    )
  }
}