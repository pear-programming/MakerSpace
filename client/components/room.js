import React, { Component } from 'react';
import {Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';

export default class Room extends Component {

    constructor(props){  
      super(props)

      this.close = this.close.bind(this);
      this.open = this.open.bind(this);

      this.state = { 
        showModal: false
      };
    }

    close() {
      this.setState({ showModal: false });
    }

    open() {
      this.setState({ showModal: true });
    }

  render() {
    return (
      <div key={this.props.roomInfo.name}>
        <span onClick={this.open}>{this.props.roomInfo.name}</span>
      
        <span><label className="switch">
         <input type="checkbox"/>
          <div className="slider round"></div>
        </label></span>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.mode}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4> {this.props.roomInfo.name} </h4>
          </Modal.Body>
          <Modal.Footer>
            <Link to={`${this.props.roomInfo.name}/display`} ><Button>Display</Button></Link>
          </Modal.Footer>
        </Modal>
      </div>

    )
  }
}