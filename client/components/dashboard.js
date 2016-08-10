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
      currentRoom: null,
      showModal: false,
      startTime: new Date(2016, 0, 1, 9, 10)
    }
  }

  close() {
    this.setState({ showModal: false });
  }

  open(time) {
    console.log("got time:", time);

    // console.log("inside open:", this.getTimeSlotInfo(time)); 
    // var roomsWithTimeSlotInfo = this.getTimeSlotInfo(time) 
    var roomsWithTimeSlotInfo = this.mapTimeSlotsByDay(time); 
    console.log("showing roomsWithTimeSlotInfo:", roomsWithTimeSlotInfo);
    var currentRoom = roomsWithTimeSlotInfo.filter(room => room.openSlots.length)[0]
    console.log("got currentRoom in open:", currentRoom);

    this.setState({ showModal: true, roomsWithTimeSlotInfo: roomsWithTimeSlotInfo, currentRoom: currentRoom, startTime: time });
  }

  componentWillMount() {

    checkStatus()
    .then(user => {
      fetchRooms()
      .then(rooms => {
        fetchTimeSlots()
        .then(timeSlots => {
          fetchReservations()
          .then(reservations => {
            // var mappedRooms = this.mapRooms(rooms.data, timeSlots.data);
            var mappedData = this.mapTimeSlots(reservations);
            console.log("got mappedData:", mappedData)
            // console.log("got mappedRooms:", mappedRooms);
            this.setState({ 
              user: user.data, 
              events: mappedData, 
              timeSlots: timeSlots.data, 
              rooms: rooms.data,
              currentRoom: Object.assign(rooms.data[0], {openSlots: []})     
            })

          })
        })
      })
    })    
  }

  // componentDidMount() {

  //   $( document ).ready(function() { 

  //     $('.fc-day fc-widget-content fc-sun fc-past').on('click', function() {

  //       console.log("clicked!", $(this));
  //     })

  //   })
  // }

  getTimeSlotInfo(time) {

    // console.log("got time in dashboard.js:", time);
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

  mapTimeSlots(reservations) {

    return reservations.data.map(reservation => {
      return {
        title: reservation.roomName, 
        start: Date.parse(reservation.startTime), 
        end: Date.parse(reservation.endTime), 
        allDay: false, 
        color: 'red'
      };
    })

    // console.log("got data in mapTimeSlots:", timeSlots.data); 

    // return timeSlots.data.filter((timeSlot) => !timeSlot.isAvailable)
    // .map((fullRes) => {
    //   return {
    //     title: 'FULLY BOOKED', 
    //     start: Date.parse(fullRes.startTime), 
    //     end: Date.parse(fullRes.endTime), 
    //     allDay: false, 
    //     color: 'red'
    //   };
    // })
  }

  mapTimeSlotsByDay(time) {
    console.log("in mapTimeSlotsByDay:", this.state.timeSlots);

    var timeSlotsForDay = this.state.timeSlots.filter((timeSlot) => {
  
      var startTime = Date.parse(timeSlot.startTime); 
      return startTime >= time.getTime() && startTime < (time.getTime() + 43200000)
    }) 
    console.log("got timeSlotsForDay:", timeSlotsForDay);

    return this.state.rooms.map(room => { 
      var openSlots = timeSlotsForDay.filter(slot => !slot.reservations.filter(res => res.roomId === room._id).length )
      return Object.assign(room, {openSlots: openSlots})
    })
  }

  changeModalView(event) {

    console.log("got event from select:", typeof event.target.value);
    this.setState({currentRoom: this.state.roomsWithTimeSlotInfo.filter(room => room._id == event.target.value)[0]})
  }

  changeStartTime(event) {


  }

  render(){

    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    console.log("showing currentRoom in render in dashboard:", this.state.currentRoom);
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
              <Modal.Title>My Modal<span className="roomTitle">{this.state.currentRoom.roomName}</span></Modal.Title>
            </div>
            </Modal.Header>
            <Modal.Body className="clearfix">
              <div className="roomImageContainer">
                <img className="roomImage" src={this.state.currentRoom.image}/>
              </div>
              <div className="roomDetails">
                <p> Capacity: {this.state.currentRoom.capacity} </p>
                <p> Conference Table: {this.state.currentRoom.conferenceTable ? "Yes" : "No"} </p>
                <p> Air-play: {this.state.currentRoom.airPlay ? "Yes" : "No"} </p>
                <p> Hammock: {this.state.currentRoom.hammock ? "Yes" : "No"} </p>
              </div>
              <div className="roomAvailability">
                <h3>{MONTHS[this.state.startTime.getMonth()]} <span>{this.state.startTime.getDate()}</span></h3>
                
              </div>
              <div className="selectRoom">
                <label>Select a Room</label>
                <select name="select" onChange={this.changeModalView.bind(this)}>
                  { this.state.roomsWithTimeSlotInfo.filter(room => room.openSlots.length)
                      .map(room => {
                        return(
                          <option value={room._id}>{room.roomName}</option> 
                        ); 
                      })
                  }
                </select>
              </div>

              <div className="selectStartTime">
                <label>Select a Start Time</label>
                <select name="select" onChange={this.changeStartTime.bind(this)}>
                 { this.state.currentRoom.openSlots.map(slot => {
                        var hours = new Date(Date.parse(slot.startTime) + 18000000).getHours() 
                        var amPm;
                        if(hours > 12) {
                          hours = hours - 12
                          amPm = 'pm'
                        }
                        else {
                          amPm = 'am'
                        }
                        var time = hours.toString() + ":" + (new Date(slot.startTime).getMinutes().toString() + "0").slice(0,2) + amPm;
                        return(    
                          <option value={slot._id}>{time}</option> 
                        ); 
                      })
                  }
                </select>
              </div>

              <div className="selectEndTime">
                <label>Select an End Time</label>
                <select name="select" onChange={this.changeModalView.bind(this)}>
                  { this.state.roomsWithTimeSlotInfo.filter(room => room.openSlots.length)
                      .map(room => {
                        return(
                          <option value={room._id}>{room.roomName}</option> 
                        ); 
                      })
                  }
                </select>
              </div>

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







