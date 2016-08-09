import React, { Component } from 'react';

export default class RoomWindow extends Component {

  constructor(props) {
    super(props)   

  }




  render() {
    
    const room = this.props.room
    var style={width: "100px"}

    return (
      <div>
      <h1>Hi Caleb</h1>
      <h2>{room.roomName}</h2>
      <img src={room.image} style={style} />
      </div>
     ) 
  }

}
        