import React from 'react';
import ReactDOM from 'react-dom';

export default class RoomCalendar extends React.Component {

  componentDidMount() {
    console.log("running componentDidMount:", this.props.events)
    const { calendar } = this.refs;

    $(calendar).fullCalendar({
      events: this.props.events,
      eventClick(event) {
        alert('clicked event!');
      },
      dayClick(date, jsEvent, view) {
        alert('Clicked empty space!', date);
      },
      allDay: false,
      minTime: '09:00:00',
      maxTime: '21:00:00',
      height: 'auto',
      header: {
        left: '',
        right: '',
        center: 'title'
      }
    });
    
    $(calendar).fullCalendar( 'changeView', this.props.view ); 
  }

  componentWillUnmount() {
    const { calendar} = this.refs;

    $(calendar).fullCalendar('destroy');
  }

  render() {
    return (
      <div ref="calendar"></div>
    );
  }
}
