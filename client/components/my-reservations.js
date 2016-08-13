import React, { Component } from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots, fetchRooms, fetchUserReservations, getRoomReservations } from '../models/rooms';
import { deleteReservation } from '../models/reservations';
import {Grid, Row, Col} from 'react-bootstrap';



export default class ReservationList extends Component {
  
  constructor(){ 
    super()
    
    this.state = {
      user: null,
      reservations: []
    }
  }

  componentWillMount() {
    this.update.call(this)

  }


  update() {
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


  deleteThisReservation(res) {
    // console.log("resId!!!!!", res)
    deleteReservation(res)
    .then(() => this.update.call(this))
  }





  render() {
    return (
      <div className="reservationList col-md-3"> 
        {this.state.user ? 
          <div>
            <h2>{this.state.user.name.split(" ")[0]}'s Reservations</h2> 
            <div className="table-responsive">
            <table className="myTable">
              <tr>
                <th>Room Name</th>
                <th>Date</th>
                <th>Time</th>
                <th></th>
              </tr>              

              { this.state.reservations ? 

                this.state.reservations.sort((a,b) => Date.parse(a.startTime) - Date.parse(b.startTime) ).map(res => {
                return (
                  <tr>
                    <td> { res.roomName } </td>
                    <td> { this.formatDate(res.startTime) } </td>
                    <td> { this.formatTime(res.startTime) + ' - \n' + this.formatTime(res.endTime)} </td>
                    <td> <button onClick={ () => this.deleteThisReservation(res._id) } > DELETE </button> </td>
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

