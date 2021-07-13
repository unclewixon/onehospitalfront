import {
	LOAD_BANKS,
	LOAD_COUNTRIES,
	LOAD_PAYMENT_METHODS,
} from '../actions/types';

const INITIAL_STATE = {
	banks: [],
	countries: [],
	methods: [],
};

const utility = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_BANKS:
			return { ...state, banks: action.payload };
		case LOAD_COUNTRIES:
			return { ...state, countries: action.payload };
		case LOAD_PAYMENT_METHODS:
			return { ...state, methods: action.payload };
		default:
			return state;
	}
};

export default utility;
