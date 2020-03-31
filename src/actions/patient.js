import axios from 'axios';
import { API_URI } from '../services/constants';
import {
	NEXT_STEP,
	PREV_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	ALLERGY,
	UPDATE_ALLERGY,
	DELETE_ALLERGY,
	GET_PHYSIOTHERAPIES,
	GET_DENTISTRY_REQUESTS,
	GET_IMAGING_REQUESTS,
	GET_OPTHALMOLOGY_REQUESTS,
	LOAD_VITALS,
	UPDATE_VITALS,
	CREATE_LAB_REQUEST,
	GET_REQUESTS_BY_TYPE
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

// vitals
export const loadVitals = data => {
	return {
		type: LOAD_VITALS,
		payload: data,
	};
};

export const updateVitals = data => {
	return {
		type: UPDATE_VITALS,
		payload: data,
	};
};

const create_lab_request = data => {
	return {
		type: CREATE_LAB_REQUEST,
		payload: data,
	};
};

const get_requests_by_type = data => {
	return {
		type: GET_REQUESTS_BY_TYPE,
		payload: data,
	};
};

export const createLabRequest = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${API_URI}/patient/save-request`, {
					requestType: data.service_center,
					category_id: data.category,
					requestBody: {
						specialization: '',
						sessionCount: '',
						combination: data.lab_combo,
						test: data.lab_test,
						referredSpeciment: data.referred_specimen,
						requestNote: data.request_note,
					},
					patient_id: data.patient_id,
				})
				.then(response => {
					dispatch(create_lab_request(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getRequestByType = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${API_URI}/patient/${data}/request/lab?startDate=&endDate=`)
				.then(response => {
					dispatch(get_requests_by_type(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
}
