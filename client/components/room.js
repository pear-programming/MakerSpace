import React, { Component } from 'react';

export default class Room extends Component {
  render() {
  	console.log('room in Room', this.props.roomInfo)
    return (
      <div> 
      	{this.props.roomInfo.name}
      </div>
    )
  }
}