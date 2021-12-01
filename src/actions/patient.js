import {
	NEXT_STEP,
	PREV_STEP,
	RESET_STEP,
	SAVE_ALLERGIES,
	GET_ALLERGIES,
	ALLERGY,
	UPDATE_ALLERGY,
	DELETE_ALLERGY,
	GET_IMAGING_REQUESTS,
	LOAD_VITALS,
	UPDATE_VITALS,
	CREATE_LAB_REQUEST,
	LOAD_PATIENTS,
	LOAD_CLINICAL_LAB,
	LOAD_RADIOLOGY,
	LOAD_ANTENATAL_ASSESSMENT,
	LOAD_LABOUR,
	LOAD_LABOUR_DETAIL,
	CLEAR_LABOUR_DETAIL,
	PATIENT_REGULATION_TABLE,
	LOAD_PARTOGRAPH,
	LOAD_RISK,
	LOAD_DELIVERY_RECORD,
	LOAD_LABOUR_MEASUREMENT,
	PATIENT_IVF,
	ADD_NEW_PATIENT,
	GET_ALL_OPD_LAB_APPOINTMENTS,
	UPDATE_PATIENT,
	READING_DONE,
	SET_IVF,
	CAN_CLOSE_LABOUR,
	UPDATE_ENCOUNTER_DATA,
	RESET_ENCOUNTER_DATA,
	UPDATE_SOAP_DATA,
} from './types';

export const setIVF = data => {
	return {
		type: SET_IVF,
		payload: data,
	};
};

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
	console.log(data);
	return {
		type: NEXT_STEP,
		payload: data,
	};
};

export const resetStep = () => {
	return {
		type: RESET_STEP,
		payload: {},
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
export const loadImagingRequests = data => {
	return {
		type: GET_IMAGING_REQUESTS,
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

export const updateEncounterData = data => {
	return {
		type: UPDATE_ENCOUNTER_DATA,
		payload: data,
	};
};

export const updateSoapData = data => {
	return {
		type: UPDATE_SOAP_DATA,
		payload: data,
	};
};

export const resetEncounterData = data => {
	return {
		type: RESET_ENCOUNTER_DATA,
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

export const closeLabour = () => dispatch => {
	dispatch({
		type: CAN_CLOSE_LABOUR,
	});
};
