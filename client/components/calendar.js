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
      events: this.props.events,
      eventClick: function(event) {

        console.log("showing event:", event);
        alert("clicked event!")
       
      },

      dayClick: function(date, jsEvent, view) {

          console.log("showing date:", date);
          alert('Clicked empty space!', date);
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





// {
//     "_id": {
//         "$oid": "57a0c5589f8823db03aa04eb"
//     },
//     "roomId": {
//         "$oid": "579ba6a08b6fcb4204613361"
//     },
//     "roomName": "Death Star",
//     "userId": {
//         "$oid": "579cdfea3527752704977a2e"
//     },
//     "userName": "Carlo's first POST request",
//     "startTime": {
//         "$date": "2016-08-12T16:00:00.000Z"
//     },
//     "endTime": {
//         "$date": "2016-08-12T17:30:00.000Z"
//     }
// }
