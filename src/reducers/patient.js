import { NEXT_STEP, PREV_STEP } from '../actions/types';

const INITIAL_STATE = {
	formStep: 1,
	formData: {}
};

const patient = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEXT_STEP:
			return { ...state, formData: action.payload, formStep: 2 };
		case PREV_STEP:
			return { ...state, formStep: action.payload };
		default:
			return state;
	}
};

export default patient;
