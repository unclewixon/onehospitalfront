import { LOAD_BANKS, LOAD_COUNTRIES } from '../actions/types';

const INITIAL_STATE = {
	banks: [],
	countries: [],
};

const utility = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_BANKS:
			return { ...state, banks: action.payload };
		case LOAD_COUNTRIES:
			return { ...state, countries: action.payload };
		default:
			return state;
	}
};

export default utility;
