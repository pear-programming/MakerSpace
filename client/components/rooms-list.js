import React, { Component } from 'react';
import Room from './room';
import {fetchRooms, changeStatus} from '../models/rooms';


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
  componentWillMount() {
    //ping server for latest room info then open socket to listen for someone else changing the state
    socket.on('updatedRooms', this.updatedRooms.bind(this))
    
    fetchRooms().then( room => {
      this.setState({ rooms: this.state.rooms.concat(room.data) })
    })
  }
  componentWillUnmount(){
    socket.off('updatedRooms');
  }

  render() {
    return (
      <div> 
        <h2>Rooms</h2> 
        <p>Today, right now</p>
        {this.renderRooms.call(this)}
      </div>
    )
  }
}