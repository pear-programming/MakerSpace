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
  var changeGoToDate = this.props.changeGoToDate;

  $(calendar).fullCalendar({
    events: this.props.events,
    eventClick(event) {
      open(new Date(2016, event.start._d.getMonth(), event.start._d.getDate(), 4, 0));
    },
    dayClick(date, jsEvent, view) {
      open(new Date(2016, date._d.getMonth(), date._d.getDate(), 4, 0));
    },
    viewRender(view, element) {
      changeGoToDate(view.start._d);
    },
    allDay: false,
    hiddenDays: [0],
                                                minTime: '09:00:00',
                                                maxTime: '21:00:00',
                                                height: 'auto',
    header: {
      left: 'title',
      right: 'today, prev,next',
      center: ''
    }
  });

  $(calendar).fullCalendar('changeView', 'agendaWeek');
}


  componentDidUpdate() {
    var changeGoToDate = this.props.changeGoToDate;


    if (this.props.reRenderCalendar) {
      const { calendar } = this.refs;
      var open = this.props.open;

      $(calendar).fullCalendar({
        events: this.props.events,
        eventClick(event) {
          open(new Date(2016, event.start._d.getMonth(), event.start._d.getDate(), 4, 0));
        },
        dayClick(date, jsEvent, view) {
          open(new Date(2016, date._d.getMonth(), date._d.getDate(), 4, 0));
        },
        viewRender(view, element) {
          changeGoToDate(view.start._d);
        },
        allDay: false,
        hiddenDays: [0],
                                                                    minTime: '09:00:00',
                                                                    maxTime: '21:00:00',
                                                                    height: 'auto',
        header: {
          left: 'title',
          right: 'today, prev,next',
          center: ''
        }
      });

      $(calendar).fullCalendar('changeView', 'agendaWeek');

      if (this.props.goToDate) {
        $(calendar).fullCalendar('gotoDate', this.props.goToDate);
      }

      if (executeSetState) {
        executeSetState = false;
        executeWillUpdate = true;
        this.setState({runWillUpdate: true});
      }
      else {
        executeSetState = true;
        this.state.runWillUpdate = false;
        this.props.resetReRender();
      }
    }
  }

  componentWillUpdate() {
    if (executeWillUpdate) {
      const { calendar} = this.refs;
      $(calendar).fullCalendar('destroy');
      executeWillUpdate = false;
    }
  }

  render() {
    return (
      <div ref="calendar"></div>
    );
  }
}

