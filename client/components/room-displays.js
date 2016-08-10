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
import moment from 'moment';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom';


export default class RoomDisplays extends Component {
  constructor() {
    super()

    this.state = {
      rooms: [],
      pieData: [{x: 'Sun', y: 2}, {x: 'M', y: 2}, {x: 'T', y: 2}, {x: 'W', y: 2}, {x: 'TR', y: 2}, {x: 'F', y: 2}, {x: 'Sat', y: 2}],
      data: [{x: 1, y: 15}, {x: 2, y: 15}, {x: 3, y: 15}, {x: 4, y: 15}, {x: 5, y: 15}],
      roomOccurences: {Room: 15}
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
  }

  getGraphData() {
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

      let days = [
        { x: 'Sun', y: 0 }, 
        { x: 'M', y: 0 }, 
        { x: 'T', y: 0 }, 
        { x: 'W', y: 0 }, 
        { x: 'TR', y: 0 },
        { x: 'F', y: 0 },
        { x: 'Sat', y: 0 }
        ]

      resArray.forEach(reservation => {
        let time = moment(reservation.startTime)
        let dayIndex = time._d.getDay();

        days[dayIndex].y += 1
      })

      this.setState({ pieData: days })
      
      let x = 1
      let data = []
      for ( let key in resOccurences ) {
        data.push({ x: x, y: resOccurences[key] })
        x += 1
      }
      this.setState({ data: data, roomOccurences: resOccurences })
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({data: this.getGraphData()});
    }, 2000);
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
    return ticks
  }

  getYaxis() {
    let occurences = [];
    let ans = [];
    for (let key in this.state.roomOccurences) {
      occurences.push(this.state.roomOccurences[key])
    }
    let largestOccurence = Math.max(...occurences)

    for (let i = 0; i <= largestOccurence; i++) {
      ans.push(i)
    }
    return ans;
  }



  render() {
    const style = {
      parent: { margin: "2%", maxWidth: "92.5%"}
    };
    return (
      <div>
        <NavBar />
        <Grid>
          <Row>
            <Col md={6} mdPush={6}>
              {this.state.data ? 
                  <VictoryChart style={style} domainPadding={{x: 30, y: 30}} animate={{ duration: 1000 }}>
                    <VictoryAxis
                      label="Rooms"
                      animate={{ duration: 1000 }}
                      tickValues={this.getTickValues.call(this)}
                      style={{
                        axis: {stroke: "black", strokeWidth: 2},
                        ticks: {stroke: "transparent", padding: 15},
                        tickLabels: {fill: "black", fontSize: 6}
                      }}
                    />
                    <VictoryAxis label="Reservations" dependentAxis
                      animate={{ duration: 1000 }}
                      tickValues={this.getYaxis.call(this)}
                      style={{
                        grid: {strokeWidth: 1},
                        axis: {stroke: "black", strokeWidth: 2},
                        ticks: {stroke: "transparent", padding: 15}
                      }}
                    />
                    <VictoryBar style={{data: {width: 15, fill: "orange"}}}
                      animate={{ duration: 1000 }}
                      data={this.state.data}
                    />
                  </VictoryChart> 
                :
                '' }
            </Col>
            <Col md={6} mdPull={6}>
              {this.state.pieData ? 
                <VictoryPie 
                  style={{  }}
                  data={this.state.pieData}
                  animate={{
                    duration: 1000,
                    onEnter: {
                      duration: 500
                    }
                  }} /> 
              : 
              ''}
            </Col>
          </Row>
        </Grid>
        <ul>
          {this.renderRooms.call(this)}
        </ul>
      </div>
    );
  }
}



