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

        // open(event.start._d)
        open(new Date(2016, event.start._d.getMonth(), event.start._d.getDate(), 4, 0));

        // alert("clicked event!")
       
      },
      dayClick: function(date, jsEvent, view) {
        console.log("showing date:", date._d);
        // open(date._d);
        open(new Date(2016, date._d.getMonth(), date._d.getDate(), 4, 0));
      }
      
      // eventMouseover: function(event) {
      //  console.log("hovering over event!")
      // },
      // eventMouseout: function(event) {

      //   console.log("hovering over empty space!")
      // }
    });
    
    $(calendar).fullCalendar( 'changeView', 'agendaWeek' ); 



    //   $('.fc-day fc-widget-content fc-sun fc-past').on('click', function() {

    //     console.log("clicked!", $(this));
    //   })

      // $('#mount').on('click', function() {

      //   console.log("clicked!", $(this));
      // })s


      // $('.fc-minor').on('click', function() {

      //   console.log("clicked!", $(this));
      // })

      // $('td').on('click', function() {

      //   console.log("clicked!", $(this));
      // })

      // $('tr').on('click', function() {

      //   console.log("clicked!", $(this));

      //   // console.log("got data", $(this).data())
      // })

      //  $('.fc-minor').on('click', function() {

      //   console.log("clicked!", $(this));

      //   // console.log("got data", $(this).data())
      // })
   
}

  componentWillUnmount() {
    const { calendar} = this.refs

    $(calendar).fullCalendar('destroy')
  }

  render() {
    // console.log("showing reservations in calendar.js:", this.props.events);
    return (
      <div ref="calendar"></div>
    );
  }
}

