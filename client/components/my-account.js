import React, { Component } from 'react';
import NavBar from './nav-bar';
import MyOrganizations from './my-organizations';
import MyReservations from './my-reservations';


export default class MyAccount extends Component {
	render() {
		return (
			<div> 
				<NavBar />
				<h2>My Account</h2> 
				<div className="container-fluid">
				<div className="row"><MyOrganizations className="col-md-6"/>
				<MyReservations className="col-md-6"/></div>
				</div>
			</div>
		)
	}
}