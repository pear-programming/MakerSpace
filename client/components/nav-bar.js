import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';
import AuthModal from './auth-modal';
import {Button, Navbar, NavItem, MenuItem, Nav, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../models/auth';


export default class NavBar extends Component {

  constructor(props){  
    super(props)

    this.state = { 
      loggedIn: true
    };
  }
  
  logout(e) {
    e.preventDefault();
    
    logout()
    .then(x => {
      console.log('logout success', x)
    })
    .catch(err => {
      console.log('logout err', err)
    })
    
  }

  render(){
    return (
      <Navbar inverse>
      <Navbar.Header>
       <Navbar.Brand><Link to={'/'}>MakerSpace</Link></Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>

   
        { document.cookie ?
           <Nav pullRight>
           <NavDropdown eventKey={3} title="Welcome" id="basic-nav-dropdown">
           <LinkContainer to={'my-account'}><MenuItem eventKey={3.1}>My Account</MenuItem></LinkContainer>
           <LinkContainer to={'rooms'}><MenuItem eventKey={3.2}>View rooms</MenuItem></LinkContainer>
            <MenuItem divider />
            <LinkContainer to={'logout'}><MenuItem eventKey={3.3} onClick={this.logout.bind(this)}>Log Out</MenuItem></LinkContainer>
            </NavDropdown>
           </Nav>

          : <Nav pullRight>
              <NavItem eventKey={1} href="#"><AuthModal mode="Log In" /></NavItem>
              <NavItem eventKey={2} href="#"><AuthModal mode="Sign Up" /></NavItem>
            </Nav>
        }
       
      </Navbar.Collapse>
    </Navbar>
    );
  }

}
