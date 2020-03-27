/* eslint eqeqeq: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
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

// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	debug: true,
// }
const pReducer = persistCombineReducers(persistConfig, reducers);
const allMiddleware = (middlewares = [
	...middlewares,
	routerMiddleware(history),
]);
const middleware = applyMiddleware(...allMiddleware);
const store = createStore(pReducer, {}, middleware);
const persistor = persistStore(store);
export { persistor, store };
