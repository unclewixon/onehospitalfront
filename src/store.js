/* eslint eqeqeq: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import { createBrowserHistory } from 'history';

let middlewares = [thunk];

if (process.env.NODE_ENV == 'development') {
	const logger = createLogger({
		collapsed: true,
	});
	middlewares = [...middlewares, logger];
}

export const history = createBrowserHistory();

export default (initialState = {}) => {
	middlewares = [...middlewares, routerMiddleware(history)];
	return createStore(
		reducers(history),
		initialState,
		compose(applyMiddleware(...middlewares))
	);
};
