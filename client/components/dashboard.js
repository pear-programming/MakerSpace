import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms} from '../models/rooms';
import Calendar from './calendar';
import Room from './room'; 
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';


export default class Dashboard extends React.Component {
  constructor(){ 
    super()

    this.state = {
      user: null,
      events: null,
      timeSlots: null,
      roomsWithTimeSlotInfo: [],
      rooms: null,
      showModal: false
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open(time) {
    console.log("inside open:", this.getTimeSlotInfo(time));
    this.setState({ showModal: true, roomsWithTimeSlotInfo: this.getTimeSlotInfo(time) });
  }

  componentWillMount() {

    checkStatus()
    .then(user => {
      fetchRooms()
      .then(rooms => {
        fetchTimeSlots()
        .then(timeSlots => {

          var mappedData = this.mapTimeSlots(timeSlots);
          this.setState({ 
            user: user.data, 
            events: mappedData, 
            timeSlots: timeSlots.data, 
            rooms: rooms.data
          });
        })
      })
    })    
  }

  getTimeSlotInfo(time) {

    console.log("got time in dashboard.js:", time);
    var nextFourTimeSlots = this.state.timeSlots.filter((timeSlot) => {
      var thirtyMin = 1800000;
      var startTime = Date.parse(timeSlot.startTime); 

      return startTime === time.getTime() || 
            (startTime === time.getTime() + thirtyMin) || 
            (startTime === time.getTime() + thirtyMin * 2) ||
            (startTime === time.getTime() + thirtyMin * 3)
    }) 
    console.log("got nextFourTimeSlots:", nextFourTimeSlots);

    return this.state.rooms.map(room => {
      room.openSlots = [];

      for(var i = 0; i < 4; i++) {
        if(!nextFourTimeSlots[i].reservations.filter(reserv => reserv.roomId === room._id).length) {
          room.openSlots.push(nextFourTimeSlots[i]) 
        }
        else {
          break
        }
      }
      return room;
    })
    // console.log("showing open room slots:", test);
  }

  mapTimeSlots(timeSlots) {

    console.log("got data in mapTimeSlots:", timeSlots.data); 

    return timeSlots.data.filter((timeSlot) => !timeSlot.isAvailable)
    .map((fullRes) => {
      return {
        title: 'FULLY BOOKED', 
        start: Date.parse(fullRes.startTime), 
        end: Date.parse(fullRes.endTime), 
        allDay: false, 
        color: 'red'
      };
    })
  }

  render(){

    console.log("shwing rooms in render in dashboard:", this.state.rooms);
    return (
      <div>
        <NavBar />
       {this.state.events ?  

        <div>
          <Calendar 
            events={this.state.events}
            open={this.open.bind(this)}
          /> 

          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
            <div className="roomTitleContainer">
              <Modal.Title>My Modal<span className="roomTitle">{this.state.rooms[0].roomName}</span></Modal.Title>
            </div>
            </Modal.Header>
            <Modal.Body className="clearfix">
              <div className="roomImageContainer">
                <img className="roomImage" src={this.state.rooms[0].image}/>
              </div>
              <div className="roomDetails">
                <p> Capacity: {this.state.rooms[0].capacity} </p>
                <p> Conference Table: {this.state.rooms[0].conferenceTable ? "Yes" : "No"} </p>
                <p> Air-play: {this.state.rooms[0].airPlay ? "Yes" : "No"} </p>
                <p> Hammock: {this.state.rooms[0].hammock ? "Yes" : "No"} </p>
              </div>
              <div className="roomAvailability">
                <h3>currently <span>available</span></h3>
                <button className="scheduleBtn">Today's Schedule</button>
              </div>

              <select name="select" >
                {this.state.roomsWithTimeSlotInfo.map(room => {
                  return(
                    <option value={room._id}>{room.roomName}</option> 
                    ); 
                  })
                }
              </select>

            </Modal.Body>

          </Modal>
        </div>

        : null   }



        
               
      </div>

    )
  }
}

// onchange={this.changeModalView.bind(this)}
// <select name="select" onchange={this.changeModalView.bind(this)}>
              //   {this.state.roomsWithTimeSlotInfo.map(room => {
              //     return(
              //       <option value={room._id}>{room.roomName}</option> 
              //       ); 
              //     })
              //   }
              // </select>

// <div id="eachRoom clearfix">
//         <span onClick={this.open}>{room.roomName}</span>

//         <label className="switch">
//           { room.isAvailable ? <input onClick={() => this.props.toggleState(room)} type="checkbox" checked /> : <input onClick={() => this.props.toggleState(room)} type="checkbox" /> }
//           <div className="slider round"></div>
//         </label>
        
//         <Modal show={this.state.showModal} onHide={this.close}>
//           <Modal.Header closeButton>
//           <div className="roomTitleContainer">
//             <Modal.Title>{this.props.mode}<span className="roomTitle">{room.roomName}</span></Modal.Title>
//           </div>
//           </Modal.Header>
//           <Modal.Body className="clearfix">
//             <div className="roomImageContainer">
//               <img className="roomImage" src={room.image}/>
//             </div>
//             <div className="roomDetails">
//               <p> Capacity: {room.capacity} </p>
//               <p> Conference Table: {room.conferenceTable ? "Yes" : "No"} </p>
//               <p> Air-play: {room.airPlay ? "Yes" : "No"} </p>
//               <p> Hammock: {room.hammock ? "Yes" : "No"} </p>
//             </div>
//             <div className="roomAvailability">
//               <h3>currently <span>available</span></h3>
//               <button className="scheduleBtn">Today's Schedule</button>
//             </div>
//           </Modal.Body>

//         </Modal>
//       </div>






