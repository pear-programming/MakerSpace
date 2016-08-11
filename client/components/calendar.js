import React from 'react';
import ReactDOM from 'react-dom';

export default class Calendar extends React.Component { 


	componentDidMount() {
    console.log("in componentDidMount in calendar.js")
    const { calendar } = this.refs;

    var open = this.props.open;
    var wait = this.props.wait;

    $(calendar).fullCalendar({
      events: this.props.events,
      eventClick: function(event) {
        open(new Date(2016, event.start._d.getMonth(), event.start._d.getDate(), 4, 0)); 
      },
      dayClick: function(date, jsEvent, view) {
        open(new Date(2016, date._d.getMonth(), date._d.getDate(), 4, 0));
        wait()
      },
      allDay: false,
      minTime: "09:00:00",
      maxTime: "21:00:00",
      height: "auto"  
    });
    
    $(calendar).fullCalendar( 'changeView', 'agendaWeek' );  
    
}


  componentWillUnmount() {
    console.log("dfriirffslkfmsekl===============")
    const { calendar} = this.refs

    $(calendar).fullCalendar('destroy')
  }

  render() {
    return ( 
      <div ref="calendar"></div> 
    );
  }
}

