import React from 'react';
import ReactDOM from 'react-dom';

export default class Calendar extends React.Component {

	componentDidMount() {
    const { calendar } = this.refs;

    var open = this.props.open;

   
    // var view = this.props.view
  
    $(calendar).fullCalendar({
      events: this.props.events,
      eventClick: function(event) {

        // console.log("showing event:", event);
        // alert("clicked event!")
       
      },
      dayClick: function(date, jsEvent, view) {
        console.log("showing date:", date._d);
        open(date._d);
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

