import React, { Component } from 'react';
import Room from './room';

var roomsList = [{name: 'Dagobah', capacity: 10, conferenceTable: true, airPlay: true, hammock: false, availability: true}, {name: 'Lovelace', capacity: 6, conferenceTable: true, airPlay: false, hammock: true, availability: false}]


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
      return findThisRoom.name === room.name;
    }

    rooms[roomIndex].availability = !rooms[roomIndex].availability
    this.setState({ rooms: rooms })
    socket.emit('newRooms', { rooms: this.state.rooms });
    
  }
  renderRooms() {
    return this.state.rooms.map((room, i) => <Room key={i} toggleState={this.changeRoomState.bind(this)} roomInfo={room} />)
  }
  updatedRooms(data) {
    console.log('setting state to this', data)
    this.setState({ rooms: data.rooms.rooms })
  }
  componentWillMount() {
    //ping server for latest room info then open socket to listen for someone else changing the state
    this.setState({ rooms: this.state.rooms.concat(roomsList) })
    socket.on('updatedRooms', this.updatedRooms.bind(this))

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