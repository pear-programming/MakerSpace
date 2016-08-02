import React from 'react';
import { browserHistory, Link } from 'react-router';
import NavBar from './nav-bar';
import { Button } from 'react-bootstrap';



export default function SplashPage() {
  
  return (
    <div id="home">
      <h3 className="loginButton" ><a href="/auth/makerpass" className="loginButton"><span id="fakeButton">Login with Maker<strong>Pass</strong></span></a></h3>
    </div>
    
  );
}


// <div id="home" className="container">
//   <div className="row">
//   <Button className="loginButton col-md-8" bsStyle="primary" bsSize="small" href="/auth/makerpass">Login with Makerpass</Button>
//   </div>
// </div>