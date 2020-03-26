import { GET_VITALS, SAVE_VITALS, UPDATE_VITALS, VITALS } from './types';

export const getAVital = data => {
	return {
		type: GET_VITALS,
		payload: data,
	};
};

export const allVitals = data => {
	return {
		type: VITALS,
		payload: data,
	};
};

export const addVital = data => {
	return {
		type: SAVE_VITALS,
		payload: data,
	};
};

export const updateVitals = data => {
	return {
		type: UPDATE_VITALS,
		payload: data,
	};
};
