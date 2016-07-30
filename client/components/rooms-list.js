import React, { Component } from 'react';
import Room from './room';

var roomsList = [{name: 'Dagobah', capacity: 10, conferenceTable: true, airPlay: true, hammock: false}, {name: 'Lovelace', capacity: 6, conferenceTable: true, airPlay: false, hammock: true}]

export default class RoomsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rooms: []
    }
  }

  renderRooms() {
    return this.state.rooms.map(room => <Room roomInfo={room} />)
  }

  componentWillMount() {
    this.setState({ rooms: this.state.rooms.concat(roomsList) })
  }

  render() {
    return (
      <div> 
        <h2>Rooms</h2> 
        <p>Today, right now</p>
        {this.renderRooms.call(this)}
      </div>
    )
  }
}