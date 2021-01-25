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
	LOAD_PATIENTS,
	LOAD_CLINICAL_LAB,
	LOAD_RADIOLOGY,
	LOAD_ANTENNATAL,
	LOAD_ANTENATAL_ASSESSMENT,
	LOAD_LABOUR,
	LOAD_LABOUR_DETAIL,
	CLEAR_LABOUR_DETAIL,
	LOAD_ENCOUNTERS,
	ENCOUNTER_FORM,
	PATIENT_REGULATION_TABLE,
	LOAD_PARTOGRAPH,
	LOAD_RISK,
	LOAD_DELIVERY_RECORD,
	LOAD_LABOUR_MEASUREMENT,
	PATIENT_IVF,
	ADD_NEW_PATIENT,
	GET_ALL_OPD_LAB_APPOINTMENTS,
	GET_ALL_OPD_IMMUNIZATION_APPOINTMENTS,
	UPDATE_PATIENT,
	READING_DONE,
} from './types';
import { request } from '../services/utilities';
// import axios from 'axios';
// import { API_URI, transactionsAPI } from '../services/constants';
// import { delete_transaction } from './transaction';

export const loadPatients = data => {
	return {
		type: LOAD_PATIENTS,
		payload: data,
	};
};

export const readingDone = data => {
	return {
		type: READING_DONE,
		payload: data,
	};
};

export const loadOPDLabAppointments = data => {
	return {
		type: GET_ALL_OPD_LAB_APPOINTMENTS,
		payload: data,
	};
};

export const loadOPDImmunizationAppointments = data => {
	return {
		type: GET_ALL_OPD_IMMUNIZATION_APPOINTMENTS,
		payload: data,
	};
};

export const addNewPatient = data => {
	return {
		type: ADD_NEW_PATIENT,
		payload: data,
	};
};

export const updatePatient = data => {
	return {
		type: UPDATE_PATIENT,
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
	console.log(payload);
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

export const add_dentisry = data => {
	return {
		type: SAVE_ALLERGIES,
		payload: data,
	};
};

export const update_dentistry = (data, previousData) => {
	return {
		type: UPDATE_ALLERGY,
		payload: data,
		previousData,
	};
};

export const Dentistry = data => {
	return {
		type: ALLERGY,
		payload: data,
	};
};

export const delete_dentistry = payload => {
	console.log(payload);
	return {
		type: DELETE_ALLERGY,
		payload,
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

export const loadEncounterForm = data => {
	return {
		type: ENCOUNTER_FORM,
		payload: data,
	};
};

export const loadPatientIVFForm = data => {
	return {
		type: PATIENT_IVF,
		payload: data,
	};
};

export const loadPatientRegulationTable = data => {
	return {
		type: PATIENT_REGULATION_TABLE,
		payload: data,
	};
};

export const loadEncounterData = data => {
	return {
		type: LOAD_ENCOUNTERS,
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

export const loadAntennatal = payload => {
	return {
		type: LOAD_ANTENNATAL,
		payload,
	};
};

export const loadAntenatalAssessment = payload => {
	return {
		type: LOAD_ANTENATAL_ASSESSMENT,
		payload,
	};
};
export const loadLabour = payload => {
	return {
		type: LOAD_LABOUR,
		payload,
	};
};

export const loadLabourDetails = payload => {
	return {
		type: LOAD_LABOUR_DETAIL,
		payload,
	};
};

export const clearLabourDetails = () => {
	return {
		type: CLEAR_LABOUR_DETAIL,
	};
};

export const loadPartograph = payload => {
	return {
		type: LOAD_PARTOGRAPH,
		payload,
	};
};

export const loadRiskAssessment = payload => {
	return {
		type: LOAD_RISK,
		payload,
	};
};
export const loadDeliveryRecord = payload => {
	return {
		type: LOAD_DELIVERY_RECORD,
		payload,
	};
};

export const loadLabourMeasurement = payload => {
	return {
		type: LOAD_LABOUR_MEASUREMENT,
		payload,
	};
};

export const antenatalAssessment = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			request(`patient/immunizations`, 'GET', true)
				.then(response => {
					dispatch(loadAntenatalAssessment(response.data));
					return resolve({ success: true });
				})
				.catch(error => {
					return reject({ success: false });
				});
		});
	};
};

// export const getPartograph = id => {
// 	return dispatch => {
// 		return new Promise((resolve, reject) => {
// 			request(`labour-management/${id}/vitals`, 'GET', true)
// 				.then(response => {
// 					dispatch(loadPartograph(response));
// 					return resolve({ success: true });
// 				})
// 				.catch(error => {
// 					return reject({ success: false });
// 				});
// 		});
// 	};
// };
