import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import App from './App';
import { reducers } from './store/store';

import './index.css';
import * as serviceWorker from './serviceWorker';


//Set up redux dev tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//Set up store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

//Set up Axios global config
const projectId = 'haud-efa39'; 
axios.defaults.baseURL = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();