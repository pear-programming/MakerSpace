import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots} from '../models/rooms';
import Calendar from './calendar';

export default class Dashboard extends React.Component {
  constructor(){ 
    super()

    this.state = {
      user: null
    }
  }

  componentWillMount() {

    checkStatus()
    .then(userData => {
      fetchTimeSlots()
      .then(reservationData => {
        console.log('userData:', userData)
        var mappedData = this.mapReservations(reservationData)
        // console.log('reservations in Dashboard.js:', reservationData);
        this.setState({ user: userData.data, events: mappedData});
      })
    })
  }

  mapReservations(reservationData) {

    console.log("got data in mapReservations:", reservationData.data); 

    var mappedData =reservationData.data.filter((reserv) => !reserv.isAvailable)
    .map((reservation) => {

      console.log("shwing reserve starttime:", typeof reservation.startTime)
      var availablility;
      var color;
      var borderColor; 
      if(reservation.isAvailable) {
        availablility = "-"
        color = 'whit'
        borderColor = 'lightgrey'

      }
      else {
        availablility = "NOT AVAILABLE!"
        color = 'red'
        borderColor = 'red'
      }
      // return {title: reservation.roomName, date: Date.parse(reservation.startTime), allDay: false}
      return {title: availablility, start: Date.parse(reservation.startTime), end: Date.parse(reservation.endTime), allDay: false, color: color, borderColor: borderColor}

      // return {title: reservation.roomName, start: Date.parse(reservation.startTime), end: Date.parse(reservation.endTime), allDay: false}
    })
    // this.setState({events: mappedData})
    return mappedData;
  }

  // calendarDisplay() {
  //   background-color:　'red';
  //   opacity: 0
    
  // }



  render(){
    console.log("shwing reservation in render in dashboard:", this.state.events);
    return (


      <div>
        <NavBar />
       {this.state.events ?  <Calendar events={this.state.events}/>  : null   }
        
       
      </div>
    )
  }
}
