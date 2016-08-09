import React, { Component } from 'react';

export default class RoomWindow extends Component {

  constructor(props) {
    super(props)   

  }




  render() {
    
    const room = this.props.room
    var style = { height: "200px", float: "right" }

    return (
      <div className="window" >
        <h1>{room.roomName}</h1>
        <img src={room.image} style={style} />
        <h3>{ room.isAvailable ? "Open" : "Closed" }</h3>
        <p>Capacity: {room.capacity ? room.capacity : null }</p>
        <p>Projector: { room.projector ? "Yes" : "No" }</p>
        <p>Whiteboard: {room.whiteBoard ? "Yes": "No" }</p>
        <p>TV: {room.tv ? "Yes": "No" }</p>
        <p>AirPlay: {room.airPlay ? "Yes": "No" }</p>  
        <p>Hammock: {room.hammock ? "Yes": "No" }</p>
      </div>
     ) 
  }

}
        