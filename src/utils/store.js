import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';

const middlewares = [thunk];
middlewares.push(logger);

export default createStore(reducers, {}, applyMiddleware(...middlewares));