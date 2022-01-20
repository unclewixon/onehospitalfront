import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import reduxMiddleware from 'react-block-ui/lib/reduxMiddleware';

import reducers from './reducers';
import history from './services/history';

let middlewares = [thunk, reduxMiddleware];

if (process.env.NODE_ENV === 'development') {
	const logger = createLogger({
		collapsed: true,
	});
	middlewares = [...middlewares, logger];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (initialState = {}) => {
	middlewares = [...middlewares, routerMiddleware(history)];
	return createStore(reducers, initialState, applyMiddleware(...middlewares));
};
