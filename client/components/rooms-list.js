import React, { Component } from 'react';
import {fetchRooms, changeStatus} from '../models/rooms';
import Room from './room';
import NavBar from './nav-bar';


export default class RoomsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rooms: []
    }
  }
  
  changeRoomState(room) {
    const rooms = this.state.rooms
    const roomIndex = rooms.indexOf(rooms.find(findRoom))
    //function to change state in parent of the room selected
    function findRoom(findThisRoom) { 
      return findThisRoom.roomName === room.roomName;
    }

    changeStatus(room.roomName)
    .then(x => x)

    rooms[roomIndex].isAvailable = !rooms[roomIndex].isAvailable
    this.setState({ rooms: rooms })
    socket.emit('newRoomStatus', { rooms: this.state.rooms });
  }
  renderRooms() {
    return this.state.rooms.map((room, i) => <Room key={i} toggleState={this.changeRoomState.bind(this)} roomInfo={room} />)
  }
  updatedRooms(data) {
    this.setState({ rooms: data.rooms.rooms })
  }

  instaBookedRoom(roomId) {
    console.log("reached instaBookedRoom:", roomId);
    console.log("showing rooms:", this.state.rooms);

    var roomIndex; 
    var bookedRoom = this.state.rooms.filter((room, index) => {

      if(room._id.toString() === roomId.toString()) {
        roomIndex = index;
        return true;
      }    
      else {
        return false
      }
    })[0] 

    bookedRoom.isAvailable = false;
    var roomsCopy = this.state.rooms.slice();
    roomsCopy[roomIndex] = bookedRoom; 
    console.log("showing rooms copy:", roomsCopy);
    this.setState({rooms: roomsCopy})
  }

  componentWillMount() {
    //ping server for latest room info then open socket to listen for someone else changing the state
    fetchRooms()
    .then( room => {
      console.log('room data', room)
      socket.on('updatedRooms', this.updatedRooms.bind(this));
      socket.on('instaBooked', this.instaBookedRoom.bind(this));
      this.setState({ rooms: this.state.rooms.concat(room.data) })
    })
    .catch( err => {
      console.log('error', err)
      this.setState({ rooms: null })
    })
  }
  componentWillUnmount(){
    socket.off('updatedRooms');
  }

  render() {
    return (
      <div>
        <NavBar />
        <div> 
          <h2>Rooms</h2> 
          {this.state.rooms ? this.renderRooms.call(this) : "Login to view rooms"}
        </div>
      </div>
    )
  }
}