import * as types from '../actions/types';

const INITIAL_STATE = {
	profile: null,
	loggedIn: true,
};

const user = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.SET_PROFILE:
			return { ...state, profile: action.payload, loggedIn: action.status };
		default:
			return state;
	}
};

export default user;
