import { applyMiddleware, createStore } from 'redux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import reducers from './redux/reducer';

const middlewares = [...getDefaultMiddleware()];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
