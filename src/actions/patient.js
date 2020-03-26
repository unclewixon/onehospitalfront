import axios from 'axios';
import { API_URI, patientAPI } from '../services/constants';

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

export const loadDentistryRequests = data => {
	return {
		type: GET_DENTISTRY_REQUESTS,
		payload: data,
	};
};

export const loadImagingRequests = data => {
	return {
		type: GET_IMAGING_REQUESTS,
		payload: data,
	};
};

export const loadOpthalmologyRequests = data => {
	return {
		type: GET_OPTHALMOLOGY_REQUESTS,
		payload: data,
	};
};
