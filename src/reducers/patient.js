import {
	NEXT_STEP,
	PREV_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	ALLERGY,
	GET_PHYSIOTHERAPIES,
	GET_DENTISTRY_REQUESTS,
	GET_IMAGING_REQUESTS,
	GET_OPTHALMOLOGY_REQUESTS,
} from '../actions/types';

const INITIAL_STATE = {
	formStep: 1,
	formData: {},
	allergy: {},
	allergies: [],
	physiotherapies: [],
	dentistryRequests: [],
	imagingRequests: [],
	opthalmologyRequests: [],
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
		case ALLERGY:
			return { ...state, allergy: action.payload };
		case GET_PHYSIOTHERAPIES:
			return { ...state, allergies: action.payload };
		case GET_DENTISTRY_REQUESTS:
			return { ...state, dentistryRequests: action.payload };
		case GET_IMAGING_REQUESTS:
			return { ...state, imagingRequests: action.payload };
		case GET_OPTHALMOLOGY_REQUESTS:
			return { ...state, opthalmologyRequests: action.payload };
		default:
			return state;
	}
};

export default patient;
