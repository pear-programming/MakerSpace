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



  render() {
    return (
      <div> 
        <NavBar />
        {this.state.user ? 
          <div>
            <h2>{this.state.user.name.split(" ")[0]}'s Reservations</h2> 
            <table>
              <tr>
                <td>Room Name</td>
                <td>Start Time</td>
                <td>End Time</td>
                <td>Edit Reservation</td>
                <td>Delete Reservation</td>
              </tr>              

              { this.state.reservations ? 

                this.state.reservations.map(res => {
                return (
                <tr>
                  <td> {res.roomName} </td>
                  <td> {res.startTime} </td>
                  <td> {res.endTime} </td>
                  <td> <button>Edit Reservation</button> </td>
                  <td> <button>Delete Reservation</button> </td>
                </tr>  
                  )
                })


                :

                null  
              }
            
            </table>
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