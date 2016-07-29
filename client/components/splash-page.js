import React from 'react';
import { browserHistory, Link } from 'react-router';
import SearchBar from '../containers/search-bar';



export default function SplashPage() {
  
  return (
    <div>
    <h1 className='title'>Get a Room</h1>
    <SearchBar />
    <div><Link to={'organizations'}>View All</Link></div>
   
    </div>
  );
}
