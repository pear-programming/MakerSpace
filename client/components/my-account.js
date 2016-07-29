import React, { Component } from 'react';
import NavBar from './nav-bar';
import MyOrganizations from './my-organizations';
import MyReservations from './my-reservations';
import {Grid, Row, Col} from 'react-bootstrap';



export default class MyAccount extends Component {
	render() {
		return (
			<div> 
				<NavBar />
				<h2>My Account</h2> 
				  <Grid>	  
					  <Row className="show-grid">
				      <Col md={6} mdPush={6}><MyReservations /></Col>
				      <Col md={6} mdPull={6}><MyOrganizations /></Col>
				    </Row>
				  </Grid>
			</div>
		)
	}
}