import React from 'react';
import ReactDOM from 'react-dom';

export default class RoomCalendar extends React.Component {

  componentDidMount() {
    const { calendar } = this.refs;

    $(calendar).fullCalendar({
      events: this.props.events,
      eventClick: function(event) {

        console.log("showing event:", event);
        alert("clicked event!")

      },
      dayClick: function(date, jsEvent, view) {

          console.log("showing date:", date);
          alert('Clicked empty space!', date);
      },
      allDay: false,
      minTime: "09:00:00",
      maxTime: "21:00:00",
      height: "auto"
    });

    $(calendar).fullCalendar( 'changeView', this.props.view );


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
