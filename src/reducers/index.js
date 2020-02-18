import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import user from "./user";
import general from "./general";
import settings from "./settings";
import hmo from "./hmo";
import inventory from './inventory';
import role from './role';

const reducers = combineReducers({
  form: formReducer,
  routing: routerReducer,
  user,
  general,
  settings,
  hmo,
	inventory,
	role,
});

export default reducers;
