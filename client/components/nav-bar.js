import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';
import Modal from './modal';

export default class NavBar extends Component {
  render(){
    return (
      <div>
        <span><Modal mode="Log In" /></span>
        <span><Modal mode="Sign Up" /></span>
      </div>
    );
  }
}
