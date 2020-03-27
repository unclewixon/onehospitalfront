/* eslint eqeqeq: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import reducers from './reducers';
import { createBrowserHistory } from 'history';
import SSRStorage from './services/storage';

let middlewares = [thunk];

if (process.env.NODE_ENV == 'development') {
	const logger = createLogger({
		collapsed: true,
	});
	middlewares = [...middlewares, logger];
}
export const history = createBrowserHistory();

const persistConfig = {
	key: 'primary',
	storage: storage,
	version: 0,
	debug: true,
	stateReconciler: hardSet,
	//whitelist: ['vitals'], // which reducer want to store
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
