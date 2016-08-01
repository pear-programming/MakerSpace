import React from 'react';
import { browserHistory, Link } from 'react-router';
import NavBar from './nav-bar';
import RoomsList from './rooms-list';



export default function SplashPage() {
  
  return (
    <div>

      { document.cookie ?
           
      <RoomsList /> 

      :  <h1 className='title'>MakerSpace</h1>
        
      }

    </div>
  );
}
