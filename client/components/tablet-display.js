import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Room from './room';


export default class TabletDisplay extends Component {

    constructor(props){  
      super(props)

      // dummy data for testing
      this.state = { 
        available: false
      }

    }


  render() {
  
  var open = { backgroundColor: "green"}
  var closed = { backgroundColor: "red"}

    return (
      this.state.available ? // dummy for testing
        <div className="fullscreen" style={open}>
          <h1>OPEN</h1>
        </div>
        : <div className="fullscreen" style={closed}>
          <h1>CLOSED</h1>
        </div>
      
    )
  }
}