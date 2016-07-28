import React, {Component} from 'react';
import {Popover, Button, Tooltip, Modal} from 'react-bootstrap';

export default class ModalButton extends Component {
  
  constructor(props){  
    super(props)

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = { 
      showModal: false,
      user: {}
    };
  }

  onInputChange(inputField, e ){
    var temp = this.state.user
    temp[inputField] = e.target.value
    this.setState({ user: Object.assign(this.state.user, temp) });
    console.log('user object', this.state.user)
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
              <span><label>Email</label><input className="form-control" onChange={this.onInputChange.bind(null, 'email')}/><br/></span>
              <span><label>Password</label><input type="password" className="form-control" onChange={this.onInputChange.bind(null, 'password')}/><br/></span>
              {this.props.mode === 'Sign Up' ? <span><label>Re-enter Password</label><input type="password" className="form-control" onChange={this.onInputChange.bind(null, 'password2')}/><br/></span> : null}

              <button type="submit">Submit</button>

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

