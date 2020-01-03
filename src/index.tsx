import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router/index';

import { Provider } from 'react-redux'
import store from './redux/store'

import 'antd-mobile/dist/antd-mobile.css';
import './assets/style/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, 
  document.getElementById('root')
);
