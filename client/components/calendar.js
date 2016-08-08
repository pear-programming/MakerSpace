import React from 'react';
import ReactDOM from 'react-dom';

export default class Calendar extends React.Component {

	componentDidMount() {
    const { calendar } = this.refs;

    var getTimeSlotInfo = this.props.getTimeSlotInfo;
  
    $(calendar).fullCalendar({
      events: this.props.events,
      eventClick: function(event) {

        console.log("showing event:", event);
        alert("clicked event!")
       
      },
      dayClick: function(date, jsEvent, view) {
        console.log("showing date:", date._d);


        console.log("showing jsEvent:", jsEvent);
        console.log("showing view:", view);
        // alert('Clicked empty space!', date);
        console.log("showign this:", )
        getTimeSlotInfo(date._d);
      }
    });
    
    $(calendar).fullCalendar( 'changeView', 'agendaWeek' ); 
}

  componentWillUnmount() {
    const { calendar} = this.refs

    $(calendar).fullCalendar('destroy')
  }

  render() {
    console.log("showing reservations in calendar.js:", this.props.events);
    return (
      <div ref="calendar"></div>
    );
  }
}

