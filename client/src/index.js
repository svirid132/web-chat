import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import "./layout/main.scss"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { socketListen } from './API/socket/socketListen';

socketListen(store);

ReactDOM.render(
  <Router>
      <Provider store={store}>
        <App />
      </Provider>
  </Router>,
  document.getElementById('root')
);