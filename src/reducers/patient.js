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
	GET_DENTISTRY_REQUESTS,
	GET_IMAGING_REQUESTS,
	GET_OPTHALMOLOGY_REQUESTS,
	LOAD_VITALS,
	UPDATE_VITALS,
	LOAD_PATIENT_UPLOAD_DATA,
	ADD_PATIENT_UPLOAD_DATA,
	LOAD_PATIENT_PROCEDURE_DATA,
	ADD_PATIENT_PROCEDURE_DATA,
	LOAD_PATIENTS,
	GET_LAB_REQUESTS,
	GET_PHARMACY_REQUESTS,
	GET_ALL_REQUESTS,
} from '../actions/types';

const INITIAL_STATE = {
	formStep: 1,
	formData: {},
	allergy: {},
	allergies: [],
	encounters: [],
	physiotherapies: [],
	dentistryRequests: [],
	imagingRequests: [],
	opthalmologyRequests: [],
	patient_upload: [],
	vitals: [],
	patients: [],
	labRequests: [],
	pharmacyRequests: [],
	allRequests: [],
};

const patient = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEXT_STEP:
			return { ...state, formData: action.payload, formStep: 2 };
		case PREV_STEP:
			return { ...state, formStep: action.payload };
		case LOAD_PATIENT_UPLOAD_DATA:
			return { ...state, patient_upload: action.payload };
		case ADD_PATIENT_UPLOAD_DATA:
			return {
				...state,
				patient_upload: [...state.patient_upload, action.payload],
			};

		case LOAD_PATIENT_PROCEDURE_DATA:
			return { ...state, patient_procedure: action.payload };
		case ADD_PATIENT_PROCEDURE_DATA:
			return {
				...state,
				patient_procedure: [...state.patient_procedure, action.payload],
			};
		case LOAD_PATIENTS:
			return { ...state, patients: action.payload };
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
		case GET_DENTISTRY_REQUESTS:
			return { ...state, dentistryRequests: action.payload };
		case GET_IMAGING_REQUESTS:
			return { ...state, imagingRequests: action.payload };
		case GET_OPTHALMOLOGY_REQUESTS:
			return { ...state, opthalmologyRequests: action.payload };
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
		case LOAD_VITALS:
			return { ...state, vitals: [...action.payload] };
		case UPDATE_VITALS:
			return { ...state, vitals: [action.payload, ...state.vitals] };
		case GET_LAB_REQUESTS:
			return { ...state, labRequests: action.payload };
		case GET_PHARMACY_REQUESTS:
			return { ...state, pharmacyRequests: action.payload };
		case GET_ALL_REQUESTS:
			return { ...state, allRequests: action.payload };
		default:
			return state;
	}
};

export default patient;
