import React, { Component } from 'react';
import {fetchRooms, changeStatus} from '../models/rooms';
import { Grid, Row, Col } from 'react-bootstrap';
import Room from './room';
import Plan from './plan';
import NavBar from './nav-bar';
import RoomWindow from './room-window';

export default class RoomsList extends Component {
  constructor(props) {
    super(props)

    this.showWindow = this.showWindow.bind(this);
    this.updateWindow = this.updateWindow.bind(this);

    this.state = {
      rooms: [],
      window: false,
      room: {}
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
    return this.state.rooms.map((room, i) => <Room key={i} toggleState={this.changeRoomState.bind(this)} roomInfo={room} current={this.state.room} window={this.state.window} showWindow={this.showWindow} updateWindow={this.updateWindow}/>)
  }
  updatedRooms(data) {
    this.setState({ rooms: data.rooms.rooms })
  }

  roomUnBooked(roomId) {
    console.log("current rooms in state: ", this.state.rooms);
    var roomIndex; 
    var unBookedRoom = this.state.rooms.filter((room, index) => {
      if(room._id.toString() === roomId.toString()) {
        roomIndex = index;
        return true;
      }    
      else {
        return false
      }
    })[0] 

    unbookedRoom.isAvailable = true;
    var roomsCopy = this.state.rooms.slice();
    roomsCopy[roomIndex] = unBookedRoom; 
    this.setState({rooms: roomsCopy})
  }

  instaBookedRoom(roomId) {
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
    this.setState({rooms: roomsCopy})
  }

  componentWillMount() {
    //ping server for latest room info then open socket to listen for someone else changing the state
    fetchRooms()
    .then( room => {
      console.log('room data', room)
      socket.on('updatedRooms', this.updatedRooms.bind(this));
      socket.on('instaBooked', this.instaBookedRoom.bind(this));
      socket.on('unBook', this.roomUnBooked.bind(this));
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

  showWindow (bool) {
    this.setState({ window: bool })
  }

  updateWindow(name) {
    const room = this.state.rooms.find(findRoom)  

    function findRoom(findThisRoom) { return findThisRoom.roomName === name;}
    this.setState({room})
    this.showWindow(name)
  }

  render() {

    return (
      <div >
        <NavBar />
        <Grid>
          <Row>
            <Col md={4} >
              <div className="RoomsList"> 
                <h1>Rooms</h1> 
                {this.state.rooms ? this.renderRooms.call(this) : "Login to view rooms"}
              </div>
            </Col>
            
            <Col md={8} >
              <Plan window={this.state.window} showWindow={this.showWindow} updateWindow={this.updateWindow} />
          
              <div className="roomWindow">
                { this.state.window ? <RoomWindow window={this.state.window} room={this.state.room} rooms={this.state.room} /> : null }
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
