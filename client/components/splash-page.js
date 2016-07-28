import React from 'react';
import { browserHistory, Link } from 'react-router';
import NavBar from './nav-bar';
import SearchBar from '../containers/search-bar';

export default function SplashPage() {
  
  return (
    <div>
    <NavBar />
    <h1 className='title'>Peared Up</h1>
    <SearchBar />
    </div>
  );
}
