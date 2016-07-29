import React from 'react';
import ReactDOM from 'react-dom';
import routes from './Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


// Render to DOM
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<Router history={browserHistory} routes={routes} />
  </Provider>,  
  document.getElementById('mount')
);
