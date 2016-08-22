import React, { Component } from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations, fetchTimeSlots, fetchRooms, fetchUserReservations, getRoomReservations } from '../models/rooms';
import { deleteReservation } from '../models/reservations';
import { Grid, Row, Col } from 'react-bootstrap';
import ConfirmDelete from './confirm-delete-reservation';


export default class ReservationList extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      reservations: [],
      showConfirmDelete: false,
      resId: null
    };
  }

  componentWillMount() {
    this.update.call(this);
  }

  componentDidUpdate() {
    if (this.props.shouldUpdateUserRes) {
      this.update();
    }
  }

  update() {
    checkStatus()
    .then(userData => {
      this.setState({ user: userData.data});

      return userData.data.uid;
    })
    .then(userId => {
      return fetchUserReservations(userId);
    })
    .then(userReservations => {
      if (this.props.shouldUpdateUserRes) {
        this.props.resetShouldUpdate();
      }
      this.setState({ reservations: userReservations.data });
    });
  }

  formatTime(time) {
    var hours = new Date(Date.parse(time) + 18000000).getHours();
    var minutes = (new Date(time).getMinutes().toString() + '0').slice(0, 2);
    var amPm;
    if (hours > 12) {
      hours = hours - 12;
      amPm = 'pm';
    }
    else if (hours === 12) amPm = 'pm';
    else amPm = 'am';
    if (minutes === '00') {
      return hours.toString() + amPm;
    } else {
      return hours.toString() + ':' + minutes + amPm;
    }
  }

  formatDate(time) {
    var tomonth = new Date(time).getMonth() + 1;
    var todate = new Date(time).getDate();
    var toyear = new Date(time).getFullYear();
    toyear = toyear.toString().substring(2);

    return tomonth + '/' + todate + '/' + toyear;
  }

  deleteThisReservation(res) {
    deleteReservation(res)
    .then(() => {
      this.props.deleteFromCalendar(res);
      this.update.call(this);
    });
  }

  closeConfirmDelete(shouldDeleteRes) {
    if (shouldDeleteRes) {
      // delete reservations
      this.state.resId ? this.deleteThisReservation(this.state.resId) : null;
      // then reset state to hide modal
      this.setState({showConfirmDelete: false});
    } else {
      this.setState({showConfirmDelete: false});
    }
  }


  render() {
    return (
      <div className="reservationList col-md-12 col-sm-6">
        {this.state.user ?
          <div>
            <h4> Your Reservations</h4>
            <div className="table-responsive">
            <table className="myTable">
              <tr>
                <th>Room Name</th>
                <th>Date</th>
                <th>Time</th>
                <th></th>
              </tr>

              {this.state.reservations ?

                this.state.reservations.sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime)).map(res => {
                  return (
                  <tr>
                    <td> {res.roomName} </td>
                    <td> {this.formatDate(res.startTime)} </td>
                    <td> {this.formatTime(res.startTime) + ' - \n' + this.formatTime(res.endTime)} </td>
                    <td> <button onClick={() => this.setState({showConfirmDelete: true, resId: res._id})} > Delete </button> </td>
                  </tr>
                  );
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

        <ConfirmDelete
          showConfirmDelete={this.state.showConfirmDelete}
          resId={this.state.resId}
          closeConfirmDelete={this.closeConfirmDelete.bind(this)}
        />

      </div>

    );
  }
}

