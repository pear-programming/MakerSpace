import React, { Component } from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import MyReservations from './my-reservations';
import { fetchReservations , fetchTimeSlots, fetchRooms, fetchUserReservations, getRoomReservations } from '../models/rooms';
import {Grid, Row, Col} from 'react-bootstrap';



export default class MyAccount extends Component {
  
  constructor(){ 
    super()
    
    this.state = {
      user: null,
      reservations: []
    }
  }

  componentWillMount() {
    checkStatus()
    .then(userData => {
      console.log('userData.data', userData.data)
      this.setState({ user: userData.data})
      return userData.data.uid
    })
    .then(userId => {

     return fetchUserReservations(userId)
    })
    .then(userReservations => {
       console.log('userReservations.data: ', userReservations.data)
       this.setState({ reservations: userReservations.data })
      })

  }

  formatTime(time) {
    var hours = new Date(Date.parse(time) + 18000000).getHours() 
    var amPm;
    if(hours > 12) {
      hours = hours - 12
      amPm = 'pm'
    }
    else if(hours === 12) amPm = 'pm'
    else amPm = 'am'
    return hours.toString() + ":" + (new Date(time).getMinutes().toString() + "0").slice(0,2) + amPm;
  }

  formatDate(time) {
    var tomonth = new Date(time).getMonth() +1;
    var todate= new Date(time).getDate();
    var toyear = new Date(time).getFullYear();
    return tomonth+'/'+todate+'/'+toyear;
  }

  render() {
    return (
      <div className="accountPage"> 
        <NavBar />
        {this.state.user ? 
          <div>
            <h2>{this.state.user.name.split(" ")[0]}'s Reservations</h2> 
            <div className="table-responsive">
            <table className="myTable">
              <tr>
                <th>Room Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Edit Reservation</th>
                <th>Delete Reservation</th>
              </tr>              

              { this.state.reservations ? 

                this.state.reservations.sort((a,b) => Date.parse(a.startTime) - Date.parse(b.startTime) ).map(res => {
                return (
                <tr>
                  <td> { res.roomName } </td>
                  <td> { this.formatDate(res.startTime) } </td>
                  <td> { this.formatDate(res.startTime) } </td>
                  <td> { this.formatTime(res.endTime) } </td>
                  <td> <button> Edit Reservation </button> </td>
                  <td> <button> Delete Reservation </button> </td>
                </tr>  
                  )
                })

                :

                null  
              }
            
            </table>
            </div>
          </div>
          :
          null
        }

      </div>
    )
  }
}


// endTime
// :
// "2016-08-10T14:30:00.000Z"
// roomId
// :
// "579cdae4682f1ba7032f0d7c"
// roomName
// :
// "Turing"
// startTime
// :
// "2016-08-10T13:30:00.000Z"
// userEmail
// :
// "ashleymarie4989@gmail.com"
// userId
// :
// "ef95bd0cca83"
// userName
// :
// "Ashley Smith"


/*
<table border="1">
  <tr>
  <td>Row 1, Column 1</td>
  <td>Row 1, Column 2</td>
  </tr>
  <tr>
  <td>Row 2, Column 1</td>
  <td>Row 2, Column 2</td>
  </tr>
</table>
  GOALS:
  - Get user name from log in?
  - show existing reservations
  - ability to update or delete existing reservations 
  - past reservations
  - stylish styling
*/