import React, { Component } from 'react';
import { Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock, Row, Col } from 'react-bootstrap';
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

  // componentWillMount(){
  //    window.addEventListener('load', function() {
  //       FastClick.attach(document.body);
  //   }, false);
  // }

  render() {
    const room = this.props.roomInfo
    const color = { display: "inherit", verticalAlign: "top" }
    const switchColor = { backgroundColor: room.roomColor }

    return (
      <div id="eachRoom">
      <Row>
        <Col md={6} mdPush={6}><label className="switch">
          { room.isAvailable ? <input onClick={() => this.props.toggleState(room)} type="checkbox" checked /> : <input onClick={() => this.props.toggleState(room)} type="checkbox" /> }
          <div className="slider round"></div>
        </label></Col>
          <Col md={6} mdPull={6}><div className="foo" style={switchColor}/><span onClick={this.open}><h4 style={color}>{room.roomName}</h4></span></Col>
         </Row> 
        
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.mode}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4> {room.roomName} </h4>
            <p> Capacity: {room.capacity} </p>
            <p> Conference Table: {room.conferenceTable ? "Yes" : "No"} </p>
            <p> Air-play: {room.airPlay ? "Yes" : "No"} </p>
            <p> Hammock: {room.hammock ? "Yes" : "No"} </p>
          </Modal.Body>
          <Modal.Footer>
            <Link to={`${this.props.roomInfo.roomName}/display`} ><Button>Display</Button></Link>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}