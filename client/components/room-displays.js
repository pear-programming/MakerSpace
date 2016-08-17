import React, { Component } from 'react';
import NavBar from './nav-bar';
import { fetchRooms, fetchReservations } from '../models/rooms';
import { Link } from 'react-router';
import { VictoryAxis, VictoryArea, VictoryBar, VictoryChart, VictoryLine, VictoryPie, VictoryScatter, VictoryStack } from 'victory';
import moment from 'moment';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import ReactDOM from 'react-dom';


export default class RoomDisplays extends Component {
  constructor() {
    super()

    this.state = {
      rooms: [],
      pieData: [{x: 'Su', y: 2}, {x: 'M', y: 2}, {x: 'T', y: 2}, {x: 'W', y: 2}, {x: 'Th', y: 2}, {x: 'F', y: 2}, {x: 'Sa', y: 2}],
      data: [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}, {x: 5, y: 5}, {x: 6, y: 6}, {x: 7, y: 7}, {x: 8, y: 8}, {x: 9, y: 9}, {x: 10, y: 10}, {x: 11, y: 11}],
      roomOccurences: {Room: 15},
      barData: [[]],
      barLabel: [],
      topFive: []
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

  sum(items, prop){
    return items.reduce( function(a, b){
        return a + b[prop];
    }, 0);
  };

  getGraphData() {
    fetchReservations()
    .then( reservations => {
      let resArray = reservations.data;
      let resOccurences = {};
      let days = [
        { x: 'Su', y: 0 }, 
        { x: 'M', y: 0 }, 
        { x: 'T', y: 0 }, 
        { x: 'W', y: 0 }, 
        { x: 'Th', y: 0 },
        { x: 'F', y: 0 },
        { x: 'Sa', y: 0 }
        ];
      let users = {};
      let jen = [];
      let caleb = [];
      let platinum = [];
      let count = {};

      resArray.forEach(reservation => {
        let time = moment(reservation.startTime)
        let dayIndex = time._d.getDay();

        if(!resOccurences[reservation.roomName]) {
          resOccurences[reservation.roomName] = 1
        } else {
          resOccurences[reservation.roomName] += 1
        }  

        if(!users[reservation.userName]){
          users[reservation.userName] = {}
          users[reservation.userName][reservation.roomName] = 1
        } else if(!users[reservation.userName][reservation.roomName]){
          users[reservation.userName][reservation.roomName] = 1
        } else {
          users[reservation.userName][reservation.roomName] += 1
        }       

        days[dayIndex].y += 1

      })

      for (let key in users){
        caleb.push(key)
      }

      let rooms = Object.keys(resOccurences)
      rooms.forEach( room => {      
        let data = []
        for (let key in users){
          if(users[key][room]){
            data.push({ y: users[key][room], z: key })
          } else {
            data.push({ y: 0, z: key  })
          }
          x++
        }
        jen.push(data)
      })

      jen.forEach(room=> {
        room.forEach(user=>{
          if(!count[user.z]){ 
            count[user.z] = user.y 
          } else {
            count[user.z] += user.y
          }
        })
      })

      let topFive  = Object.keys(count).sort(function(a,b){return count[b]-count[a] }).slice(0, 5)

      topFive.forEach( person => platinum.push({ userName: person, totalRes: count[person] }))

      let rihanna = jen.map( room => {
        return room.filter( user => {
           return topFive.includes(user.z)
        })
      })

      rihanna.forEach( room => {
        let counter = 1
        room.forEach( user => {
          user.x = counter
          counter++
        })
      })

      let x = 1
      let data = []
      for ( let key in resOccurences ) {
        data.push({ x: x, y: resOccurences[key] })
        x += 1
      }
      this.setState({ pieData: days, barData: rihanna, barLabel: caleb, topFive: platinum, data: data, roomOccurences: resOccurences })
    })
  }

  componentDidMount() {
      this.setState({data: this.getGraphData()});
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

  renderBarGraph() {
    return this.state.barData.map( room => <VictoryBar 
      style={{data: {fill: randomColor() }}}
      data={room}
    />)
  }

  pieTable() {
    
    let sum = this.sum(this.state.pieData, 'y');

    return this.state.pieData.map(room =>  {
      return (
        <tr>
          <td><strong>{room.x}</strong></td>
          <td>{room.y} reservations</td>
          <td>{Math.floor(room.y / sum  * 100)}%</td>
        </tr>
      )
    })
  }

  chartTable() {
    return this.state.topFive.map(user =>{
      return (
        <tr>
          <td>{user.userName}</td>
          <td>{user.totalRes} Reservations</td>
        </tr>
      )
    }) 
  }

  render() {
    const style = {
      parent: { margin: "2%", maxWidth: "92.5%"}
    };
    
    let chart = { backgroundColor: "lightblue" }
    let stack = { backgroundColor: "#DEEDDE" }
    let grid = { padding: "0px" }
    let sum = this.sum(this.state.pieData, 'y');

    return (
      <div>
        <NavBar />
        <Grid style={grid} className="grid">  
          
          <Row> 
            <Col md={6}>     
              <VictoryPie 
                style={{  }}
                data={this.state.pieData}
                animate={{
                  duration: 1000,
                  onEnter: {
                    duration: 500
                  }
                }} /> 
            </Col>
            <Col md={6}>
              <h1>Reservations by Day</h1>
              <Table>
                <tbody>
                  {this.pieTable.call(this)}
                </tbody>
              </Table>
            </Col>
          </Row>
          
          <Row style={chart}>
            <Col md={4}>
              <h1>Reservations by Room</h1>
              <Table>
                <tbody>
                  <div><h3><strong>{sum}</strong> Total Reservations</h3></div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </tbody>
              </Table>
            </Col>

            <Col md={8}>
              <VictoryChart style={style} domainPadding={{x: 30, y: 30}} animate={{ duration: 2000 }} >
                <VictoryAxis
                  label="Rooms"
                  animate={{ duration: 2000 }}
                  tickValues={Object.keys(this.state.roomOccurences)}
                  style={{
                    axis: {stroke: "black", strokeWidth: 2},
                    ticks: {stroke: "transparent", padding: 15},
                    tickLabels: {fill: "black", fontSize: 6}
                  }}
                />
                <VictoryAxis label="Reservations" dependentAxis
                  animate={{ duration: 2000 }}
                  tickValues={this.getYaxis.call(this)}
                  style={{
                    grid: {strokeWidth: 1},
                    axis: {stroke: "black", strokeWidth: 2},
                    ticks: {stroke: "transparent", padding: 15}
                  }}
                />
                <VictoryBar style={{data: {width: 15, fill: "orange"}}}
                  animate={{ duration: 2000 }}
                  data={this.state.data}
                />
              </VictoryChart> 
            </Col>
          </Row>

          <Row style={stack}> 
            <Col md={6}>
              <VictoryStack horizontal
                padding={30}
                height={300}
                animate={{ duration: 2000 }}
                style={{
                  data: {width: 30},
                }}
              
              >
                {this.renderBarGraph.call(this)}
              </VictoryStack>
            </Col>

            <Col md={6}>
              <h1>Top 5 Users</h1>
                <Table>
                  <tbody>
                    {this.chartTable.call(this)} 
                  </tbody>
                </Table>      
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

function randomColor(){
  return "#" + ("000000" + Math.floor(Math.random()*0xffffff).toString(16)).slice(-6); 
}

