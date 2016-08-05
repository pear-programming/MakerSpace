import React from 'react';
import ReactDOM from 'react-dom';

export default class Calendar extends React.Component {

  // constructor(){ 
  //   super(props)

  //   // this.state = {
  //   //   user: null
  //   //   reservations: this.props.reservations
  //   // }
  // }

	componentDidMount() {
    console.log("showing props in calendar.js:", this.props.events)
    const { calendar } = this.refs;


    
    $(calendar).fullCalendar({
      events: this.props.events
      // views: {name: 'agendaWeek'}
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
