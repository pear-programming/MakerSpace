import React from 'react';
import ReactDOM from 'react-dom';

export default class Calendar extends React.Component {

	componentDidMount() {
    const { calendar } = this.refs;

    var open = this.props.open;

    var events = this.props.events
    events.forEach(event => {
      if(event.title === "Turing"){
        event.color = "#5DB89D"
      } else if (event.title === "Ellis"){
        event.color = "#7FBFFF"
      } else if (event.title === "Lovelace"){
        event.color = "#0066CC"
      } else if (event.title === "Hopper"){
        event.color = "#BDD7EB"
      } else if (event.title === "Dijkstra"){
        event.color = "#186652"
      } else if (event.title === "Tatooine"){
        event.color = "#9FFF7F"
      } else if (event.title === "Death star"){
        event.color = "#B266CC"
      } else if (event.title === "Dagobah"){
        event.color = "#DFFF7F"
      } else if (event.title === "Naboo"){
        event.color = "#B296C7"
      } else if (event.title === "Lecture Hall"){
        event.color = "#66CCCC"
      }
    })
  
    $(calendar).fullCalendar({
      events: events,
      eventClick: function(event) {
        open(new Date(2016, event.start._d.getMonth(), event.start._d.getDate(), 4, 0)); 
      },
      dayClick: function(date, jsEvent, view) {

        open(new Date(2016, date._d.getMonth(), date._d.getDate(), 4, 0));
      },
      allDay: false,
      hiddenDays: [ 0 ],
      minTime: "09:00:00",
      maxTime: "21:00:00",
      height: "auto"  
    });
    
    $(calendar).fullCalendar( 'changeView', 'agendaWeek' );  
}

  componentWillUnmount() {
    const { calendar} = this.refs

    $(calendar).fullCalendar('destroy')
  }

  render() {
    return (
      <div ref="calendar"></div>
    );
  }
}

