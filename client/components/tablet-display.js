import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Room from './room';
import {fetchRooms} from '../models/rooms';
import ReactDOM from 'react-dom';


export default class TabletDisplay extends Component {

    constructor(props){  
      super(props)

      // dummy data for testing
      this.state = { 
        currentRoom: {}
      }

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

  componentWillMount(){
    // we get the availablity, set as state for the current room
    // we also need to start the socket listen event for room status change

    var url = window.location.href.split('/');
    var currentRoom = url[url.length-2];

    socket.emit('tabletDisplay', 'xD')
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
  componentWillUnmount() {
     socket.off('updatedRooms');
  }

  render() {
  var background = document.getElementById('mount')

  console.log('background element', background)

  var open = { backgroundColor: "green"}
  var closed = { backgroundColor: "red"}

    return (
      this.state.currentRoom.isAvailable ? // dummy for testing
        <div className="fullscreen" style={open}>
          {this.props.room}
          <h1>OPEN</h1>    
        </div>
        : 
        <div className="fullscreen" style={closed}>
          {this.props.room}
          <h1>CLOSED</h1>
        </div> 
    )
  }
}