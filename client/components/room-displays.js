import React, { Component } from 'react';
import NavBar from './nav-bar';
import { fetchRooms, fetchReservations } from '../models/rooms';
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
    fetchRooms()
    .then( room => {
      this.setState({ rooms: this.state.rooms.concat(room.data) })
    })
    .catch( err => {
      console.log('error', err)
      this.setState({ rooms: null })
    })

    fetchReservations()
    .then( reservations => {
      
      let resArray = reservations.data;
      let resOccurences = {};
      resArray.forEach(reservation => {
        if(!resOccurences[reservation.roomName]) {
          resOccurences[reservation.roomName] = 1
        } else {
          resOccurences[reservation.roomName] += 1
        }
      })

      console.log('occurences', resOccurences)
      let x = 1
      let data = []
      for ( let key in resOccurences ) {
        data.push({ x: x, y: resOccurences[key] })
        x += 1
      }
      console.log('data', data)
      this.setState({ data: data, roomOccurences: resOccurences })
    })
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

  getTickValues() {
    let ticks = Object.keys(this.state.roomOccurences)
    console.log('ticks', ticks)
    return ticks

  }

  getYaxis() {
    let occurences = [];
    let ans = [];
    for (let key in this.state.roomOccurences) {
      occurences.push(this.state.roomOccurences[key])
    }
    console.log('occurences', occurences)
    let largestOccurence = Math.max(...occurences)

    console.log('largest Occurence', largestOccurence)
    for (let i = 0; i <= largestOccurence; i++) {
      ans.push(i)
    }

    console.log('tick array', ans);
    return ans;
  }



  render() {
    const style = {
      parent: {border: "1px solid #ccc", margin: "2%", maxWidth: "80%"}
    };
    return (
      <div>
        <NavBar />
        <ul>
          {this.renderRooms.call(this)}
        </ul>
        {this.state.data ? <VictoryChart style={style} domainPadding={{x: 30, y: 30}}>
          <VictoryAxis
            label="Rooms"
            tickValues={this.getTickValues.call(this)}
            style={{
              axis: {stroke: "black", strokeWidth: 2},
              ticks: {stroke: "transparent", padding: 15},
              tickLabels: {fill: "black", fontSize: 6}
            }}
          />
          <VictoryAxis label="Reservations" dependentAxis
            tickValues={this.getYaxis.call(this)}
            style={{
              grid: {strokeWidth: 1},
              axis: {stroke: "black", strokeWidth: 2},
              ticks: {stroke: "transparent", padding: 15}
            }}
          />
          <VictoryBar style={{data: {width: 15, fill: "orange"}}}
            data={this.state.data}
          />
        </VictoryChart> :
        '' }
      </div>
    );
  }
}

