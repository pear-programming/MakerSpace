import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Room from './room';
import {fetchRooms, changeStatus, getRoomReservations, addReservation} from '../models/rooms';
import {updateReservation} from '../models/reservations';
import ReactDOM from 'react-dom';
import moment from 'moment';
import _ from 'lodash'
import RoomCalendar from './room-calendar';
import BookNowConfirm from './book-now-confirm'
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';


function formatEvents(resArray) {
  return resArray.map(res => {
    var start = new Date(res.startTime).getTime()
    var end = new Date(res.endTime).getTime()
    return {
      title: res.userName,
      start: start,
      end: end,
      allDay: false,
      showConfirm: true
    }
  })
}

var nextOpenSlots = [new Date(Date.now()).toUTCString()];

export default class TabletDisplay extends Component {
  constructor(props){
    super(props)

    // dummy data for testing
    this.state = {
      currentRoom: {},
      reservations: [{}],
      nextRes: {},
      events: null
    }

  }

  componentWillMount() {
    // we get the availablity, set as state for the current room
    // we also need to start the socket listen event for room status change

    var url = window.location.href.split('/');
    var currentRoom = url[url.length-2];
    currentRoom = decodeURIComponent(currentRoom)

    socket.on('updatedRooms', this.updateState.bind(this))
    socket.on('checkStatus', (data) => console.log('checck for changes', data))
    socket.on('checkingChanges', (newRes) => {
      let date = new Date();
      let time = date.getTime();
    })
    fetchRooms()
    .then(rooms=>{
      let room = rooms.data.find( room =>room.roomName === currentRoom)
      this.setState({currentRoom: room})
      return room
    })
    .then(room => {
      this.setState({ currentRoom: room })
      return getRoomReservations(room.roomName)
    })
    .then(reservations => {
      let timeDiffs = []
      if(reservations.data !== "no reservations currently exist for this room") {
        //if there are reservations do this....
        reservations.data.forEach(reservation => {
          let now = new Date()
          let startTime = new Date(reservation.startTime)
          timeDiffs.push({difference : now - startTime, startTime: startTime})
        })
        //finds largest negative number which is the next reservation start time
        let nextRes = _.sortBy(timeDiffs, 'difference').reverse()
        let future = nextRes.filter(timeObject => timeObject.difference < 0)[0]
        let events = formatEvents(reservations.data)

        this.setState({
          reservations: reservations.data,
          nextRes: new Date(future.startTime),
          events: events
        })

      } else {  //no current reservations
        this.setState({reservations: null, nextRes: null, events: null})
      }
    })
    //start timer that checks room status 10 seconds
    this.checkForChanges.call(this)
  }
  checkForChanges() {
    var url = window.location.href.split('/');
    var currentRoom = url[url.length-2];
    currentRoom = decodeURIComponent(currentRoom)
    setInterval(() => {
      fetchRooms()
      .then(rooms=>{
        console.log('checking changes')
        const room = rooms.data.find(findRoom)
        function findRoom(findThisRoom) {
          return findThisRoom.roomName === currentRoom;
        }
        this.setState({currentRoom: room})
      })
    }, 5000)
  }


  confirm() {

    var nextHour = this.state.reservations.filter(res => {
      var difference = Date.parse(res.startTime) - Date.now() + 18000000;
      return difference > 0 && difference < 1800000
    })

    var now = new Date(Date.now() - 18000000); 
    var nextSlots = [];
    if(now.getMinutes() >= 30) {
      nextSlots.push(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0).toUTCString()); 
      if(!nextHour.length) {
        nextSlots.push(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 30));
      }
    } 
    else {
      nextSlots.push(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 30).toUTCString());
      if(!nextHour.length) {
        nextSlots.push(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0));
      }
    }

    nextOpenSlots = nextSlots;

    this.setState({showConfirm: true});
  }

  closeConfirm() {
    this.setState({showConfirm: false});
  }

  bookNow(endTime) { 

    console.log("got booknow request:", endTime); 
    console.log("showing room info:", this.state.currentRoom); 
    var reservation = {
      roomId: this.state.currentRoom._id,
      roomName: this.state.currentRoom.roomName,
      userName: 'anonymous',
      userId: '123',
      startTime: new Date(Date.now() - 18000000),
      endTime: new Date(endTime)
    }

    Promise.all([changeStatus(this.state.currentRoom.roomName), addReservation(reservation)])
    .then(data => {

      var stringifiedReservation = Object.assign(
        reservation, 
        {startTime: reservation.startTime.toUTCString(), endTime: reservation.endTime.toUTCString()},
        {_id: data[1].data})

      console.log("got stringifiedReservation:", stringifiedReservation);

      var reservations = this.state.reservations.concat([stringifiedReservation])
      
      console.log("showing data from promise.all:", data);
      var eventsCopy = this.state.events.concat(formatEvents([reservation]))
      this.setState({events: null});
      this.setState({ 
        currentRoom: Object.assign(this.state.currentRoom, {isAvailable: false}),
        showConfirm: false,
        events: eventsCopy,
        reservations: reservations
      })
      socket.emit('bookNow', this.state.currentRoom._id)  
    })
  }


  unBook() {
    var endTime = new Date(Date.now());

    var index;
    var completedReservation = this.state.reservations.filter((res, i) => {

      if(Date.parse(res.startTime) < Date.now() - 18000000 && 
            Date.parse(res.endTime) > Date.now() - 18000000) {
        index = i;
        return true;
      }
      else {
        return false;
      }
    })[0];


     var reservation = {
      roomId: this.state.currentRoom._id,
      roomName: this.state.currentRoom.roomName,
      userName: 'anonymous',
      userId: '123',
      startTime: new Date(Date.now() - 18000000),
      endTime: new Date(endTime)
    }


    var reservations = this.state.reservations.slice();
    completedReservation = Object.assign(completedReservation, {endTime: new Date(Date.now() - 18000000)})
    // reservations[index] = Object.assign(reservations[index], {endTime: new Date(Date.now() - 18000000).toUTCString()});
    console.log("reservations before change:", reservations);


    Promise.all([updateReservation(completedReservation._id, completedReservation), 
      changeStatus(this.state.currentRoom.roomName)])
    .then(data => {

      // console.log("got back new resId:", data);
      reservations[index] = data[0].data 
      console.log("reservations after change:", reservations);
      var eventsCopy = formatEvents(reservations);
      this.setState({events: null});
      // console.log("showing events:", eventsCopy);
      this.setState({ 
        currentRoom: Object.assign(this.state.currentRoom, {isAvailable: true}),
        reservations: reservations,
        events: eventsCopy
       })
      socket.emit('unBook', this.state.currentRoom._id)  
      
    })
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
  componentWillUnmount() {
     socket.off('updatedRooms');
  }
  render() {
    var background = document.querySelector('body')
    const room = this.state.currentRoom
    let image;
    if(room.isAvailable){
      image = {
        borderLeft: "50px solid green",
        borderRight: "50px solid green"
      }
    } else {
      image = {
        borderLeft: "50px solid red",
        borderRight: "50px solid red"
      }
    }
    return (

      <div >
        <div style={image} >
          <img src={room.image} className="tabletImage" />
        </div>
     { room.isAvailable ?
          <div className="tabletDisplayOpen tabletBlock" >
            <h1 className="tabletTitle">{room.roomName} </h1>
            <span className="available">Open</span>
            <div className="tabletFooter">
             <button className="bookBtn" onClick={this.bookNow.bind(this)}>BOOK NOW</button>
              <BookNowConfirm 
                showConfirm={this.state.showConfirm}
                closeConfirm={this.closeConfirm.bind(this)}
                bookNow={this.bookNow.bind(this)}
                nextOpenSlots={nextOpenSlots}
              />
            </div>
          </div>
          :
          <div className="tabletDisplayClosed tabletBlock" >
            <h1 className="tabletTitle">{room.roomName} </h1>
            <span className="inUse" >Closed</span>
            <div className="tabletFooter">
              <button className="bookBtn" onClick={this.unBook.bind(this)}>CHECK OUT</button>
            </div>
          </div>
        }

        { this.state.events ?
        <div className="roomCalendar" >
           <RoomCalendar events={this.state.events} view="agendaDay"  />
        </div>
        :
        null
        }
        
      </div>
    )
  }
}
