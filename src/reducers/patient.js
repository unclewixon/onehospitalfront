import {
	NEXT_STEP,
	PREV_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	SET_ALLERGY,
	LOAD_ENCOUNTERS,
} from '../actions/types';

const INITIAL_STATE = {
	formStep: 1,
	formData: {},
	allergy: {},
	allergies: [],
	encounters: [],
};

const patient = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEXT_STEP:
			return { ...state, formData: action.payload, formStep: 2 };
		case PREV_STEP:
			return { ...state, formStep: action.payload };
		case GET_ALLERGIES:
			return { ...state, allergies: action.payload };
		case SAVE_ALLERGIES:
			return { ...state, allergies: [...state.allergies, action.payload] };
		case SET_ALLERGY:
			return { ...state, allergy: action.payload };
		case LOAD_ENCOUNTERS:
			return { ...state, encounters: [...action.payload] };
		default:
			return state;
	}
};

export default patient;
