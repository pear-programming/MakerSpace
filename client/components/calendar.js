import React from 'react';
import ReactDOM from 'react-dom';

var executeSetState = true;
var executeWillUpdate = false;

export default class Calendar extends React.Component { 

  constructor() {
    super();

    this.state = {
      runWillUpdate: false
    };
  }

	componentDidMount() {
    
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
      },
      customButtons: {
        myCustomButton: {
            text: 'custom!',
            click: function() {
                alert('clicked the custom button!');
            }
        }
      },
      header: {
          left: 'prev,next today',
          center: 'title'
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

    if(this.props.reRenderCalendar) {

      // console.log("got inside componentDidUpdate")
      const { calendar } = this.refs;

      var open = this.props.open;

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


      if(this.props.goToDate) {
        $(calendar).fullCalendar( 'gotoDate', this.props.goToDate )
      }

      if(executeSetState) {
        executeSetState = false;
        executeWillUpdate = true;
        this.setState({runWillUpdate: true})
      }
      else {
        executeSetState = true;
        this.state.runWillUpdate = false;
        this.props.resetReRender();
      }
    } 
  }

  componentWillUpdate() {

    if(executeWillUpdate) {
      const { calendar} = this.refs;
      $(calendar).fullCalendar( 'destroy');   
      executeWillUpdate = false;
    }
  }

  render() {
    return ( 
      <div ref="calendar"></div> 
    );
  }
}

