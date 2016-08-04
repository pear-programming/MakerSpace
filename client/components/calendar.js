import React from 'react';
import ReactDOM from 'react-dom';

export default class Calendar extends React.Component {

	componentDidMount() {

    const { calendar } = this.refs;

    $(calendar).fullCalendar({

      events: this.props.events
    });
  }

  
  componentWillUnmount() {

    const { calendar} = this.refs

    $(calendar).fullCalendar('destroy')
  }

  render() {
    console.log("inside calendar.js render")
    return (

      <div ref="calendar"></div>
      );
  }
}
