import React, {Component} from 'react';
import {Popover, Button, Tooltip, Modal, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

export default class ModalButton extends Component {
  
  constructor(props){  
    super(props)

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);

    this.state = { 
      showModal: false,
      user: {}
    };
  }

  onInputChange(inputField, e ){
    var temp = this.state.user
    temp[inputField] = e.target.value
    this.setState({ user: Object.assign(this.state.user, temp) });
    console.log('email', this.state.validateEmail)

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
    this.setState({ showModal: false, user: {} });

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
            <form>
              {this.props.mode === 'Sign Up' ? <span><label>Full Name</label><input className="form-control" onChange={this.onInputChange.bind(null, 'fullName')}/><br/></span> : null}      
              <FormGroup validationState={!this.state.validEmail ? "error" : "success" } onChange={this.onInputChange.bind(null, 'email')}>
                <ControlLabel>Email</ControlLabel>
                <FormControl type="text" />
              </FormGroup>
              <span><label>Password</label><input type="password" className="form-control" onChange={this.onInputChange.bind(null, 'password')}/><br/></span>
              {this.props.mode === 'Sign Up' ? 
                <FormGroup validationState={!this.state.validPassword ? "error" : "success" } onChange={this.onInputChange.bind(null, 'password2')}>
                  <ControlLabel>Re-enter Password</ControlLabel>
                  <FormControl type="password" />
                  {!this.state.validPassword ? <HelpBlock>Passwords must match</HelpBlock> : null }
                </FormGroup>
                : null}
              <Button type="submit">Submit</Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
};

