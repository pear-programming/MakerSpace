import React, { Component } from 'react';

export default class Room extends Component {
  render() {
    console.log('room in Room', this.props.roomInfo)
    return (
      <div key={this.props.roomInfo.name}> 
        <span>{this.props.roomInfo.name}</span>
      
        <span><label className="switch">
         <input type="checkbox"/>
          <div className="slider round"></div>
        </label></span>

      </div>

    )
  }
}