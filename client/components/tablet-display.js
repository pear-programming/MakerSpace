import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Room from './room';
import {fetchRooms} from '../models/rooms';




export default class TabletDisplay extends Component {

    constructor(props){  
      super(props)

      // dummy data for testing
      this.state = { 
        currentRoom: {}
      }

    }

  componentWillMount(){
    // we get the availablity, set as state for the current room
    // we also need to start the socket listen event for room status change
  
    socket.on('test', function (data) {
      console.log('socket data', data)
    });

    const url = window.location.href.split('/');
    const currentRoom = url[url.length-2];


    fetchRooms() 
    .then(rooms=>{
      const room = rooms.data.find(findRoom)
      
      function findRoom(findThisRoom) { 
        return findThisRoom.roomName === currentRoom;
      }

      this.setState({currentRoom: room})
    })  
  }

  render() {
  

  var open = { backgroundColor: "green"}
  var closed = { backgroundColor: "red"}

    return (
      this.state.currentRoom.isAvailable ? // dummy for testing
        <div className="fullscreen" style={open}>
          {this.props.room}
          <h1>OPEN</h1>
          
        </div>
        : <div className="fullscreen" style={closed}>
          {this.props.room}
          <h1>CLOSED</h1>

        </div>
      
    )
  }
}