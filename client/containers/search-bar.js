import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button, FormGroup, FormControl} from 'react-bootstrap';



export default class SearchBar extends Component {
	constructor(props){
		super(props);

		this.state = {
			term: ''
		}
	}

  render(){
    return (
      <form className='input-group'>
        <input 
        	placeholder='Get a room'
        	className='form-control'
        	value={this.state.term}
        />
        <span className='input-group-btn'><button type='submit' className='btn btn-secondary'>Search!</button></span>
      </form>

    )
  }
}
