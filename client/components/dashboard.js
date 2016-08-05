import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations } from '../models/rooms';
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
      fetchReservations()
      .then(reservationData => {
        console.log('userData:', userData)
        this.mapReservations(reservationData)
        console.log('reservations in Dashboard.js:', reservationData);
        this.setState({ user: userData.data, reservations: reservationData});
      })
    })
  }

  mapReservations(reservationData) {

    console.log("got data in mapReservations:", reservationData.data); 

    var mappedData = reservationData.data.slice(1, 6).map((reservation) => {
      // return {title: reservation.roomName, date: Date.parse(reservation.startTime), allDay: false}
      return {title: reservation.roomName, start: Date.parse(reservation.startTime), end: Date.parse(reservation.endTime), allDay: false}
    })
    this.setState({events: mappedData})
  }

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
