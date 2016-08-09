import React, { Component } from 'react';
import NavBar from './nav-bar';
import { fetchRooms } from '../models/rooms';
import { Link } from 'react-router';
import {
  VictoryAxis,
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryScatter
} from 'victory';
import ReactDOM from 'react-dom';


export default class RoomDisplays extends Component {
  constructor() {
    super()

    this.state = {
      rooms: []
    }
  }
	componentWillMount() {

  }

  renderRooms() {
    return this.state.rooms.map(room => {
      return (
        <li>
          <Link to={`${room.roomName}/display`}>{room.roomName}</Link>
        </li>
      )
    })
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        {this.renderRooms.call(this)}
        <NavBar />
        <VictoryChart>
          <VictoryLine
            // Try changing 1.5 to 5
            y={(data) => Math.sin(1.5 * Math.PI * data.x)} 
          />
          <VictoryLine
            // Try adding a strokeWidth
            style={{data: {stroke: "tomato"}}}
            y={(data) => Math.cos(2 * Math.PI * data.x)}
          />
        </VictoryChart>
      </div>
    );
  }
}

