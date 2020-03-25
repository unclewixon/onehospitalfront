import {
	NEXT_STEP,
	PREV_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	ALLERGY,
	GET_PHYSIOTHERAPIES,
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

export const AddAllergies = data => {
	return {
		type: SAVE_ALLERGIES,
		payload: data,
	};
};

export const GetAllergies = data => {
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

export const getPhysiotherapies = data => {
	return {
		type: GET_PHYSIOTHERAPIES,
		payload: data,
	};
};
