import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';
import AuthModal from './auth-modal';
import { Button, Navbar, NavItem, MenuItem, Nav, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { checkStatus } from '../models/auth';

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
  logout() {
    this.setState({ user: null })
  }
  render() {
    return (
      <Navbar inverse>
      <Navbar.Header>
       <Navbar.Brand><Link to={'/'}>Get a Room 🍐</Link></Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        { this.state.user ?
          <Nav pullRight>
            <Image className="profilePicture" src={this.state.user.avatar_url} />
            <NavDropdown eventKey={3} title={`Welcome ${this.state.user.name}`} id="basic-nav-dropdown">
              <LinkContainer to={'my-account'}><MenuItem eventKey={3.1}>My Account</MenuItem></LinkContainer>
              <LinkContainer to={'/rooms'}><MenuItem eventKey={3.2}>View rooms</MenuItem></LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey={3.3} onClick={this.logout.bind(this)}>Log Out</MenuItem>
            </NavDropdown>
          </Nav>
          : 
          <Nav pullRight>
            <NavItem href="/auth/makerpass" eventKey={1} ><Button  bsStyle="primary" bsSize="small">Login with Makerpass</Button></NavItem>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
    );
  }
}
