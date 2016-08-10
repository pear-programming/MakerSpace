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

      eventDragStart: function(event, jsEvent, ui, view){
        console.log('event:', event)
        console.log('event:', jsEvent)
        console.log('view:', ui)
        console.log('event:', view)
      },

      minTime: "08:00:00",
      maxTime: "22:00:00",
      height: "auto"
    });
    
    $(calendar).fullCalendar( 'changeView', this.props.view ); 


}

  componentWillUnmount() {
    const { calendar} = this.refs

    $(calendar).fullCalendar('destroy')
  }

  render() {
    console.log("showing reservations in calendar.js:", this.props.events);

    if(this.props.view.name === "agendaDay"){
        $('.fc-view-container').css('overflow-x','auto');
        $("#fullcalendar_container").css('min-width',$('.fc-resource-cell').length*slot_width_resource);
    }
    return (
      <div ref="calendar"></div>
    );
  }
}

