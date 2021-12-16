import {
	LOAD_VITALS,
	UPDATE_VITALS,
	LOAD_LABOUR,
	LOAD_LABOUR_DETAIL,
	CLEAR_LABOUR_DETAIL,
	PATIENT_REGULATION_TABLE,
	LOAD_PARTOGRAPH,
	LOAD_RISK,
	LOAD_DELIVERY_RECORD,
	LOAD_LABOUR_MEASUREMENT,
	PATIENT_IVF,
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

export const readingDone = data => {
	return {
		type: READING_DONE,
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
