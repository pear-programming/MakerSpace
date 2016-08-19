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
      <div className='filterRoomContainer'>
      {this.state.rooms ? 
      <div>
      <h3> Filter calendar by room </h3> 
        <ul>
          {this.state.rooms.map((room, index) => {
            var roomName = "  " + room.roomName;
            return (
              <li key={index}>
              <label for={index} >
              <input type="checkbox" id={index} name="choice" value={room.roomName} onChange={this.toggleFilter.bind(this)} checked={room.checked}/>
                  {room.roomName}
                </label>
              </li>
            )
          })}
        </ul>
      </div> 

      : null}
      </div>
    )
  }
}




/////////////////////////////JUST FOR NOW
// <h3>Checkboxes</h3>
//   <div>
//       <input id="checkbox-1" class="checkbox-custom" name="checkbox-1" type="checkbox" checked>
//       <label for="checkbox-1" class="checkbox-custom-label">First Choice</label>
//   </div>
//   <div>
//       <input id="checkbox-2" class="checkbox-custom" name="checkbox-2" type="checkbox">
//       <label for="checkbox-2" class="checkbox-custom-label">Second Choice</label>
//   </div>
//   <div>


