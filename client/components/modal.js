import React, {Component} from 'react';
import {Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import { signup, login } from '../models/auth';
import ReactSpinner from 'react-spinjs';

export default class ModalButton extends Component {
  
  constructor(props){  
    super(props)

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = { 
      showModal: false,
      user: {},
      error: false
    };
  }

  onInputChange(inputField, e ){
    var temp = this.state.user
    temp[inputField] = e.target.value
    this.setState({ user: Object.assign(this.state.user, temp) });

    if(inputField === 'email'){
      this.setState({validEmail: this.validateEmail()});
    }
    if(inputField === 'password2' || inputField === 'password'){
      this.setState({validPassword: this.validatePassword()});
    }
  }

  onFormSubmit(e){
    e.preventDefault();
    // check props.mode, send POST for either log in or sign up
    this.setState({user: {}})

  }

  close() {
    this.setState({ showModal: false, user: {}, error: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  validateEmail() {
    var x = this.state.user.email;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        return false;
    }
    return true;
  }
  validatePassword() {
    if(this.state.user.password === this.state.user.password2) {
      return true
    } else {
      return false
    }
  }

  submitForm(e){
    e.preventDefault();
    if(this.props.mode === 'Sign Up'){
      signup(this.state.user)
      .then(x => {
        console.log('response', x)
        this.close();
      })
      .catch(err => {
        this.setState({error: true})
      })
    }
    
    if(this.props.mode === 'Log In'){
      login(this.state.user)
      .then(x => {
        console.log('response', x)
        this.close();
      })
      .catch(err => {
        this.setState({error: true})
      })
    }

  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <span>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          {this.props.mode}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.mode}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitForm} id="myform">
              {this.props.mode === 'Sign Up' ? <span><label>Full Name</label><input className="form-control" onChange={this.onInputChange.bind(null, 'fullName')} required/><br/></span> : null}      
              <FormGroup validationState={!this.state.validEmail || this.state.error ? "error" : "success" } onChange={this.onInputChange.bind(null, 'email')}>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text" required/>
                {this.state.error ? <HelpBlock>{this.props.mode === "Sign Up" ? "Email is already taken": "Invalid email / password" }</HelpBlock> : null }
              </FormGroup>
              <span><label>Password</label><input type="password" className="form-control" onChange={this.onInputChange.bind(null, 'password')} required /><br/></span>
              {this.props.mode === 'Sign Up' ? 
                <FormGroup validationState={!this.state.validPassword ? "error" : "success" } onChange={this.onInputChange.bind(null, 'password2')}>
                  <ControlLabel>Re-enter Password</ControlLabel>
                  <FormControl type="password" required/>
                  {!this.state.validPassword ? <HelpBlock>Passwords must match</HelpBlock> : null }
                </FormGroup>
                : null}
            </form>
          </Modal.Body>
          <Modal.Footer>
              <Button type="submit" form="myform">Submit</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
};

