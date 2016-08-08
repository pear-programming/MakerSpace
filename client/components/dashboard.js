import React from 'react';
import NavBar from './nav-bar';
import { checkStatus } from '../models/auth';
import { fetchReservations , fetchTimeSlots} from '../models/rooms';
import Calendar from './calendar';

export default class Dashboard extends React.Component {
  constructor(){ 
    super()

    this.state = {
      user: null,
      events: null,
      timeSlots: null,
      timeSlot: null
    }
  }

  componentWillMount() {

    checkStatus()
    .then(userData => {
      fetchTimeSlots()
      .then(timeSlotData => {
        // console.log('userData:', userData)
        var mappedData = this.mapTimeSlots(timeSlotData);
        this.setState({ user: userData.data, events: mappedData, timeSlots: timeSlotData.data});
      })
    })
  }

  getTimeSlotInfo(time) {

    console.log("got time in dashboard.js:", time);
    var nextFourTimeSlots = this.state.timeSlots.filter((timeSlot) => {
      var thirtyMin = 1800000;
      var startTime = Date.parse(timeSlot.startTime); 

      return startTime === time.getTime() || 
            (startTime === time.getTime() + thirtyMin) || 
            (startTime === time.getTime() + thirtyMin * 2) ||
            (startTime === time.getTime() + thirtyMin * 3)
    }) 

    console.log("got nextFourTimeSlots:", nextFourTimeSlots);
    // this.setState({timeSlot: timeSlot});

  }

  mapTimeSlots(timeSlotData) {

    console.log("got data in mapTimeSlots:", timeSlotData.data); 

    return timeSlotData.data.filter((timeSlot) => !timeSlot.isAvailable)
    .map((fullRes) => {
      return {title: 'FULLY BOOKED', start: Date.parse(fullRes.startTime), end: Date.parse(fullRes.endTime), allDay: false, color: 'red'}
    })
  }

  render(){

    console.log("shwing timeSlots in render in dashboard:", this.state.timeSlots);
    return (
      <div>
        <NavBar />
       {this.state.events ?  <Calendar 
        events={this.state.events}
        getTimeSlotInfo={this.getTimeSlotInfo.bind(this)}
        />  
        : null   }
               
      </div>
    )
  }
}
