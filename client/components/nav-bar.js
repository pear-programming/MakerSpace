import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';
import Modal from './modal';
import {Button, Navbar, NavItem, MenuItem, Nav, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

export default class NavBar extends Component {
  render(){
    return (
      <Navbar inverse>
      <Navbar.Header>
       <Navbar.Brand><Link to={'/'}>Get a Room 🍐</Link></Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>

   
        { document.cookie ?
           <Nav pullRight>
           <NavDropdown eventKey={3} title="Welcome" id="basic-nav-dropdown">
           <LinkContainer to={'my-account'}><MenuItem eventKey={3.1}>My Account</MenuItem></LinkContainer>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Log Out</MenuItem>
            </NavDropdown>
           </Nav>

          : <Nav pullRight>
              <NavItem eventKey={1} href="#"><Modal mode="Log In" /></NavItem>
              <NavItem eventKey={2} href="#"><Modal mode="Sign Up" /></NavItem>
            </Nav>
        }
       
      </Navbar.Collapse>
    </Navbar>
    );
  }

}
