/* eslint eqeqeq: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

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

const persistConfig = {
	key: 'authType',
	storage: storage,
	whitelist: ['authType'], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);
const allMiddleware = (middlewares = [
	...middlewares,
	routerMiddleware(history),
]);
const middleware = applyMiddleware(...allMiddleware);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
export { persistor, store };
