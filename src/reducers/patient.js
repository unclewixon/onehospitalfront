import {
	NEXT_STEP,
	PREV_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	LOAD_ENCOUNTERS,
	ALLERGY,
	UPDATE_ALLERGY,
	DELETE_ALLERGY,
	GET_PHYSIOTHERAPIES,
} from '../actions/types';

const INITIAL_STATE = {
	formStep: 1,
	formData: {},
	allergy: {},
	allergies: [],
	encounters: [],
	physiotherapies: [],
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
		case LOAD_ENCOUNTERS:
			return { ...state, encounters: [...action.payload] };
		case GET_PHYSIOTHERAPIES:
			return { ...state, allergies: action.payload };
		case UPDATE_ALLERGY:
			return {
				...state,
				allergies: [
					...state.allergies.filter(
						deletedItem => deletedItem.id !== action.previousData.id
					),
					action.payload,
				],
			};
		case DELETE_ALLERGY:
			return {
				...state,
				allergies: state.allergies.filter(
					deletedItem => deletedItem.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};

export default patient;
