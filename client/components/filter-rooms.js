import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, addReservation} from '../models/rooms';
import { formatTime } from '../helpers.js'
import Calendar from './calendar';
import Room from './room'; 
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

var runOnce = false;
var roomsToDisplay = [];

export default class FilterRooms extends React.Component {


  constructor(props){ 
    super(props)

    this.state = {
      rooms: null
    }
  }

  componentWillMount() {
    runOnce = false;
  }

  componentDidUpdate() {
    if(!runOnce) {
      runOnce = true;
      roomsToDisplay = this.props.rooms.map(room => room.roomName);
      this.setState({rooms: this.props.rooms.map(room => Object.assign(room, {checked: true}))});
    }
    
  }

  toggleFilter(event) {
    var roomsCopy = this.state.rooms.slice()
    var index;

    for(var i = 0; i < roomsCopy.length; i++) {
      if(roomsCopy[i].roomName == event.target.value) {
        index = i;
        break;
      }
    }

    roomsCopy[index].checked = event.target.checked

    if(event.target.checked) {
      roomsToDisplay.push(event.target.value)
    }
    else {
      roomsToDisplay.splice(roomsToDisplay.indexOf(event.target.value), 1)
    }
    this.props.filterRooms(roomsToDisplay);
    this.setState({rooms: roomsCopy});
  }

  render() {
    return (
      <div>
      {this.state.rooms ? 
      <div>
        <ul>
          {this.state.rooms.map((room, index) => {
            return (
              <li key={index}><input type="checkbox" id={index} name="choice" value={room.roomName} onChange={this.toggleFilter.bind(this)} checked={room.checked}/>{room.roomName}</li>
            )
          })}
        </ul>
      </div> 

      : null}
      </div>
    )
  }
}


