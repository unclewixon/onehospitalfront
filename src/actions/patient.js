import axios from 'axios';
import { API_URI } from '../services/constants';
import {
	NEXT_STEP,
	PREV_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	ALLERGY,
	UPDATE_ALLERGY,
	LOAD_PATIENT_UPLOAD_DATA,
	ADD_PATIENT_UPLOAD_DATA,
	DELETE_ALLERGY,
	GET_PHYSIOTHERAPIES,
	GET_DENTISTRY_REQUESTS,
	GET_IMAGING_REQUESTS,
	GET_OPTHALMOLOGY_REQUESTS,
	LOAD_VITALS,
	UPDATE_VITALS,
	CREATE_LAB_REQUEST,
	LOAD_PATIENT_PROCEDURE_DATA,
	ADD_PATIENT_PROCEDURE_DATA,
	LOAD_PATIENTS,
	ADD_PHARMACY_REQUEST,
	GET_PHARMACY_REQUESTS,
	GET_LAB_REQUESTS,
	LOAD_CLINICAL_LAB,
	LOAD_RADIOLOGY,
	LOAD_ANTENNATAL,
} from './types';
import { request } from '../services/utilities';

export const loadPatients = data => {
	return {
		type: LOAD_PATIENTS,
		payload: data,
	};
};

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

export const loadPatientProcedureData = data => {
	return {
		type: LOAD_PATIENT_PROCEDURE_DATA,
		payload: data,
	};
};

export const addPatientProcedureData = data => {
	return {
		type: ADD_PATIENT_PROCEDURE_DATA,
		payload: data,
	};
};

export const loadPatientUploadData = data => {
	return {
		type: LOAD_PATIENT_UPLOAD_DATA,
		payload: data,
	};
};

export const addPatientUploadData = data => {
	return {
		type: ADD_PATIENT_UPLOAD_DATA,
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

export const fetch_Allergies = data => {
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

export const create_lab_request = data => {
	return {
		type: CREATE_LAB_REQUEST,
		payload: data,
	};
};

export const loadClinicalLab = data => {
	return {
		type: LOAD_CLINICAL_LAB,
		payload: data,
	};
};

export const loadRadiology = data => {
	return {
		type: LOAD_RADIOLOGY,
		payload: data,
	};
};

export const add_pharmacy_request = data => {
	return {
		type: ADD_PHARMACY_REQUEST,
		payload: data,
	};
};

export const loadAntennatal = payload => {
	return {
		type: LOAD_ANTENNATAL,
		payload,
	};
};

export const createLabRequest = data => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			let newGroup = data.lab_combo.map(grp => {
				return {
					name: grp.name,
					amount: grp.price,
					service_id: grp.id,
					tests: grp.tests
						? grp.tests.map(test => {
								return {
									testName: test.name,
									paramenters: test.paramenters.map(param => {
										return {
											name: param.parameter.name,
											range: param.referenceRange,
											result: '',
										};
									}),
								};
						  })
						: [],
					parameters: grp.paramenters
						? grp.paramenters.map(param => {
								return {
									name: param.parameter.name,
									range: param.referenceRange,
									result: '',
								};
						  })
						: [],
				};
			});

			let newTest = data.lab_test
				? data.lab_test.map(test => {
						return {
							testName: test && test.name ? test.name : '',
							service_id: test && test.id ? test.id : '',
							amount: test && test.price ? test.price : '',
							paramenters:
								test.parameters &&
								test.parameters.map(param => {
									return {
										name:
											param && param.parameter && param.parameter.name
												? param.parameter.name
												: '',
										range:
											param && param.referenceRange ? param.referenceRange : '',
										result: '',
									};
								}),
						};
				  })
				: [];

			let newRequestObj = {
				requestType: data.service_center,
				patient_id: data.patient_id,
				requestBody: {
					specialization: '',
					sessionCount: '',
					groups: newGroup,
					tests: newTest,
					refferredSpecimen: data.referred_specimen,
					requestNote: data.request_note,
				},
			};
			request(`${API_URI}/patient/save-request`, 'POST', true, newRequestObj)
				.then(response => {
					dispatch(create_lab_request(response));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const getRequestByType = (patientId, type) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			request(
				patientId
					? `${API_URI}/patient/${patientId}/request/${type}?startDate=&endDate=`
					: `${API_URI}/patient/requests/${type}?startDate=&endDate=`,
				'GET',
				true
			)
				.then(response => {
					if (type === 'lab') {
						dispatch({
							type: GET_LAB_REQUESTS,
							payload: response,
						});
					}
					if (type === 'pharmacy') {
						dispatch({
							type: GET_PHARMACY_REQUESTS,
							payload: response,
						});
					}
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

export const addPharmacyRequest = (
	data,
	id,
	diagnosis,
	prescription,
	serviceId,
	cb
) => {
	return dispatch => {
		const requestData = data
			? data.map(request => ({
					forumalary: request.formulary,
					drug_generic_name: request.genericName,
					drug_name: request.drugName,
					dose_quantity: request.quantity,
					service_id: request.serviceId,
					refillable: {
						number_of_refills: request && request.refills ? request.refills : 0,
						eg: request && request.eg ? request.eg : 0,
						frequency_type:
							request && request.frequency ? request.frequency : '',
						duration: request && request.duration ? request.duration : 0,
						note: request && request.refillNote ? request.refillNote : '',
					},
			  }))
			: [];
		return new Promise((resolve, reject) => {
			request(`${API_URI}/patient/save-request`, 'POST', true, {
				requestType: 'pharmacy',
				requestBody: requestData,
				diagnosis: diagnosis ? diagnosis : '',
				prescription: prescription ? prescription : '',
				patient_id: id ? id : '',
			})
				.then(response => {
					dispatch(add_pharmacy_request(response.data));
					cb('success');
					return resolve({ success: true });
				})
				.catch(error => {
					cb(null);
					return reject({ success: false });
				});
		});
	};
};
