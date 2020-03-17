/* eslint eqeqeq: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import history from './services/history';

let middlewares = [thunk];

if (process.env.NODE_ENV == 'development') {
	const logger = createLogger({
		collapsed: true,
	});
	middlewares = [...middlewares, logger];
}

export default (initialState = {}) => {
	middlewares = [...middlewares, routerMiddleware(history)];
	return createStore(reducers, initialState, applyMiddleware(...middlewares));
};
