import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import general from './general';
import inventory from './inventory';
import role from './role';
import hr from './hr';
import setting from './setting';
import utility from './utility';

const reducers = combineReducers({
	form: formReducer,
	routing: routerReducer,
	user,
	general,
	inventory,
	role,
	hr,
	setting,
	utility,
});

export default reducers;
