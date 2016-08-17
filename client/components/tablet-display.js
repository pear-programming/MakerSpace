import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Room from './room';
import {fetchRooms, changeStatus, getRoomReservations} from '../models/rooms';
import ReactDOM from 'react-dom';
import moment from 'moment';
import _ from 'lodash'
import RoomCalendar from './room-calendar';


function formatEvents(resArray) {
  return resArray.map(res => {
    var start = new Date(res.startTime).getTime()
    var end = new Date(res.endTime).getTime()
    return {
      title: res.userName,
      start: start,
      end: end,
      allDay: false
    }
  })
}

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
        
        this.setState({reservations: reservations.data, nextRes: new Date(future.startTime), events: events })
        
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


  bookNow() {
    changeStatus(this.state.currentRoom.roomName)
    .then((x) => x)

    this.setState({ currentRoom: Object.assign(this.state.currentRoom, {isAvailable: false}) })
    socket.emit('bookNow', this.state.currentRoom._id)  
  }


  unBook() {
    changeStatus(this.state.currentRoom.roomName)
    .then((x) => x)

    this.setState({ currentRoom: Object.assign(this.state.currentRoom, {isAvailable: true}) })
    socket.emit('unBook', this.state.currentRoom._id)  
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

    return (
      <div>
       { room.isAvailable ? 
          <div className="tabletDisplayOpen tabletBlock">
            <h1>{room.roomName} </h1>
            <span className="open">available</span>
        
            <div className="tabletFooter">
             <button className="bookBtn" onClick={this.bookNow.bind(this)}>Book Now!</button> 
            </div>
          </div>
          : 
          <div className="tabletDisplayClosed tabletBlock">
            <h1>{room.roomName} </h1> 
            <span className="closed">In use</span>
            <div className="tabletFooter">
            <p>Please mark room as available below if you are no longer using it.</p>
              <button className="bookBtn" onClick={this.unBook.bind(this)}>All Done!</button> 
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



