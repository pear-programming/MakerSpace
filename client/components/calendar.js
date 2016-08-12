import React from 'react';
import ReactDOM from 'react-dom';

// import {events} from './dashboard'

var ran = false;

export default class Calendar extends React.Component { 

  // constructor(){ 
  //   super()
    
    
  // }


	componentDidMount() {
    
    // console.log("in componentDidMount in calendar.js")
    const { calendar } = this.refs;

    var open = this.props.open;
    var wait = this.props.wait;
    // var render = this.render;
    // var events = this.props.events;

    $(calendar).fullCalendar({
      events: this.props.events,
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

  componentDidUpdate() {

 

    // console.log("in componentDidUpdate in calendar.js:", this.props.events.length);

 

    const { calendar } = this.refs;

    var open = this.props.open;
    // var wait = this.props.wait;
    // var render = this.render;
    // var events = this.props.events;

    $(calendar).fullCalendar({
      events: this.props.events,
      eventClick: function(event) {
        open(new Date(2016, event.start._d.getMonth(), event.start._d.getDate(), 4, 0)); 
      },
      dayClick: function(date, jsEvent, view) {
        open(new Date(2016, date._d.getMonth(), date._d.getDate(), 4, 0));
       
      },
      allDay: false,
      minTime: "09:00:00",
      maxTime: "21:00:00",
      height: "auto"  
    });
    
    $(calendar).fullCalendar( 'changeView', 'agendaWeek' ); 

    // console.log("about to go to date:", this.props.goToDate)


    if(this.props.goToDate) {
      $(calendar).fullCalendar( 'gotoDate', this.props.goToDate )
    }

    

      // $(calendar).fullCalendar( 'gotoDate', this.props.goToDate ) 
  }



  componentWillUpdate() {
    // console.log("dfriirffslkfmsekl===============")
 

    const { calendar} = this.refs;
    $(calendar).fullCalendar( 'destroy');  
      
    
  }

  render() {
    // console.log("got to render in calendar.js:", this.props.events.length)
    return ( 
      <div ref="calendar"></div> 
    );

    // if(ran) {

    // }
    // this.componentDidMount()
  }
}

