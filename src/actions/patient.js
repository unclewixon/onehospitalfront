import {
	NEXT_STEP,
	PREV_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	ALLERGY,
	UPDATE_ALLERGY,
	DELETE_ALLERGY,
} from './types';

export const nextStep = data => {
	return {
		type: NEXT_STEP,
		payload: data,
	};
};

export const prevStep = data => {
	return {
		type: PREV_STEP,
		payload: data,
	};
};

export const add_allergies = data => {
	return {
		type: SAVE_ALLERGIES,
		payload: data,
	};
};

export const update_allergy = (data, previousData) => {
	return {
		type: UPDATE_ALLERGY,
		payload: data,
		previousData,
	};
};

export const Fetch_Allergies = data => {
	return {
		type: GET_ALLERGIES,
		payload: data,
	};
};

export const Allergy = data => {
	return {
		type: ALLERGY,
		payload: data,
	};
};

export const delete_allergy = payload => {
	return {
		type: DELETE_ALLERGY,
		payload,
	};
};
