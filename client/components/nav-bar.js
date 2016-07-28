import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';

export default class NavBar extends Component {
  render(){
    return (
      <div>
        <span>Log In </span>
        <span> Sign Up</span>
      </div>
    );
  }
}
