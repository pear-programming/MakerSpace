import React, { Component } from 'react';

export default class RoomWindow extends Component {
  render() {
    const room = this.props.room;
    const style = { display: 'inline-flex' };

    return (
      <div className="window clearfix" >
        <div className="col-sm-4">
          <h1>{room.roomName}</h1>
          <p>Capacity: {room.capacity ? room.capacity : null}</p>
          <p>Projector: {room.projector ? 'Yes' : 'No'}</p>
          <p>Whiteboard: {room.whiteBoard ? 'Yes' : 'No'}</p>
          <p>TV: {room.tv ? 'Yes' : 'No'}</p>
          <p>AirPlay: {room.airPlay ? 'Yes' : 'No'}</p>
          <p>Hammock: {room.hammock ? 'Yes' : 'No'}</p>
        </div>

        <div className="col-sm-8">
          <img src={room.image} />
        </div>
      </div>
     );
  }
}
