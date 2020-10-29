import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import general from './general';
import settings from './settings';
import hmo from './hmo';
import inventory from './inventory';
import role from './role';
import hr from './hr';
import patient from './patient';
import transaction from './transaction';
import utility from './utility';
import paypoint from './paypoint';
import appointment from './appointment';
import cafeteria from './cafeteria';

const reducers = combineReducers({
	form: formReducer,
	routing: routerReducer,
	user,
	general,
	paypoint,
	settings,
	hmo,
	inventory,
	role,
	hr,
	utility,
	patient,
	transaction,
	appointment,
	cafeteria,
});

export default reducers;
