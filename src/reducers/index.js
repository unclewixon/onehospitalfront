import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';
import general from './general';
import settings from "./settings"

const reducers = combineReducers({
	form: formReducer,
	routing: routerReducer,
	user,
	general,
	settings
});

export default reducers;
