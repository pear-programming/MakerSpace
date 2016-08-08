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
      .then(timeSlotData => {
        // console.log('userData:', userData)
        var mappedData = this.mapTimeSlots(timeSlotData);
        this.setState({ user: userData.data, events: mappedData});
      })
    })
  }

  mapTimeSlots(timeSlotData) {

    console.log("got data in mapTimeSlots:", timeSlotData.data); 

    return timeSlotData.data.filter((timeSlot) => !timeSlot.isAvailable)
    .map((fullRes) => {
      return {title: 'FULLY BOOKED', start: Date.parse(fullRes.startTime), end: Date.parse(fullRes.endTime), allDay: false, color: 'red'}
    })
  }

  render(){
    console.log("shwing reservation in render in dashboard:", this.state.events);
    return (
      <div>
        <NavBar />
       {this.state.events ?  <Calendar events={this.state.events} view="agendaWeek" />  : null   }
               
      </div>
    )
  }
}
