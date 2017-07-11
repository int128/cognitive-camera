import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import * as reducers from './state/reducers';
import initialState from './state/initialState';
import rootSaga from './state/sagas';

import App from './components/App';

import './index.css';

const devMiddlewares = [];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  devMiddlewares.push(logger);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers(reducers),
  initialState(),
  applyMiddleware(sagaMiddleware, ...devMiddlewares));

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
