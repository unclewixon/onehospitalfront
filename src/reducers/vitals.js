import { UPDATE_VITALS, SAVE_VITALS, GET_VITALS } from '../actions/types';

const INITIAL_STATE = {
	vitals: [],
};

const vitals = (state = INITIAL_STATE, action) => {
	console.log(action.type);
	switch (action.type) {
		case SAVE_VITALS:
			return { ...state, vitals: [...action.payload] };
		case UPDATE_VITALS:
			return { ...state, vitals: [...state.vitals, action.payload] };
		default:
			return state;
	}
};

export default vitals;
