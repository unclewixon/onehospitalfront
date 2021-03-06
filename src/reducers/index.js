import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import reduxBlock from './redux-block';
import user from './user';
import general from './general';
import settings from './settings';
import role from './role';
import hr from './hr';
import patient from './patient';
import transaction from './transaction';
import utility from './utility';
import permission from './permission';
import department from './department';

const reducers = combineReducers({
	form: formReducer,
	routing: routerReducer,
	reduxBlock,
	user,
	general,
	settings,
	role,
	hr,
	utility,
	patient,
	transaction,
	permission,
	department,
});

export default reducers;
