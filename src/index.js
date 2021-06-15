import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { BrowserRouter } from 'react-router-dom';

import store from './redux/store'

import "./_base.scss";

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
