import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';
import { Button, Navbar, NavItem, MenuItem, Nav, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { checkStatus, logout } from '../models/auth';

export default class NavBar extends Component {
  constructor() {
    super()

    this.state = {
      user: null
    }
  }

  componentWillMount() {
    checkStatus()
    .then(userData => {
      console.log('userData', userData)
      this.setState({ user: userData.data })
    })
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
         <Navbar.Brand><Link to={'/'}>M A K E R<strong> S P A C E </strong></Link></Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

        { this.state.user ?
          <Nav pullRight>
            <Image className="profilePicture" src={this.state.user.avatar_url} />
            <NavDropdown title={`Welcome ${this.state.user.name}`} id="basic-nav-dropdown">
              <LinkContainer to={'/'}><MenuItem >Dashboard</MenuItem></LinkContainer>
              <LinkContainer to={'calendar'}><MenuItem >Calendar</MenuItem></LinkContainer>
              <LinkContainer to={'analytics'}><MenuItem >Analytics</MenuItem></LinkContainer>
              <LinkContainer to={'tablet-list'}><MenuItem >Tablet List</MenuItem></LinkContainer>
            </NavDropdown>
          </Nav>
            : 
            null
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
