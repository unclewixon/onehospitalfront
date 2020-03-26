import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import general from './general';
import settings from './settings';
import hmo from './hmo';
import inventory from './inventory';
import vitals from './vitals';
import role from './role';
import hr from './hr';
import patient from './patient';
import utility from './utility';
import { connectRouter } from 'connected-react-router';

const reducers = history =>
	combineReducers({
		router: connectRouter(history),
		form: formReducer,
		routing: routerReducer,
		user,
		general,
		settings,
		hmo,
		inventory,
		vitals,
		role,
		hr,
		utility,
		patient,
	});

export default reducers;
