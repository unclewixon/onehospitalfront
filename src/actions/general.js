import {
	TOGGLE_PRELOADING,
	TOGGLE_MODAL,
	TOGGLE_IS_MODAL,
	TOGGLE_SET_LEAVE,
	TOGGLE_ADD_TASK,
	TOGGLE_SHOW_HISTORY,
	TOGGLE_VIEW_APPRAISAL,
	TOGGLE_VIEW_PAYROLL_HISTORY,
	TOGGLE_VIEW_CURRENT_PAYROLL,
	TOGGLE_EDIT_PAYROLL,
	TOGGLE_ADD_NEW_OBSERVATION,
	TOGGLE_CREATE_LABOUR_MEASUREMENT,
	TOGGLE_CREATE_RISK_ASSESSMENT,
	TOGGLE_CREATE_RECORD_DELIVERY,
	TOGGLE_CREATE_RECORD_VITAL,
	TOGGLE_CREATE_CLINICAL_TASK,
	TOGGLE_LINE_APPRAISAL,
	TOGGLE_STAFF_APPRAISAL,
	TOGGLE_LABOUR_MEASURMENT_DETAIL,
	ADD_STAFF_FOR_APPRAISAL,
	SET_IS_STAFF_APPRAISAL,
	CREAE_NEW_DRUG,
	CREAE_NEW_GENERIC,
} from './types';

export const createNewGeneric = status => {
	return {
		type: CREAE_NEW_GENERIC,
		payload: status,
	};
};

export const createNewDrug = status => {
	return {
		type: CREAE_NEW_DRUG,
		payload: status,
	};
};

export const setIsStaffAppraisal = status => {
	return {
		type: SET_IS_STAFF_APPRAISAL,
		payload: status,
	};
};

export const addStaffForAppraisal = staff => {
	return {
		type: ADD_STAFF_FOR_APPRAISAL,
		payload: staff,
	};
};

export const togglePreloading = status => {
	return {
		type: TOGGLE_PRELOADING,
		payload: status,
	};
};

export const toggleIsModal = status => {
	return {
		type: TOGGLE_IS_MODAL,
		payload: status,
	};
};

export const toggleModal = status => {
	return {
		type: TOGGLE_MODAL,
		payload: status,
	};
};

//Hr Modals
export const toggleShowHistory = status => {
	return {
		type: TOGGLE_SHOW_HISTORY,
		payload: status,
	};
};

export const toggleSetLeave = status => {
	return {
		type: TOGGLE_SET_LEAVE,
		payload: status,
	};
};

export const toggleAddTask = status => {
	return {
		type: TOGGLE_ADD_TASK,
		payload: status,
	};
};

// appraisals
export const toggleViewAppraisal = status => {
	return {
		type: TOGGLE_VIEW_APPRAISAL,
		payload: status,
	};
};

// payroll
export const toggleViewPayrollHistory = (status, staff) => {
	return {
		type: TOGGLE_VIEW_PAYROLL_HISTORY,
		payload: status,
		staff,
	};
};

export const toggleCurrentPayroll = (status, id) => {
	return {
		type: TOGGLE_VIEW_CURRENT_PAYROLL,
		payload: status,
		id,
	};
};

export const toggleEditPayroll = (status, id) => {
	return {
		type: TOGGLE_EDIT_PAYROLL,
		payload: status,
		id,
	};
};

export const toggleCreateLabourMeasurement = status => {
	return {
		type: TOGGLE_CREATE_LABOUR_MEASUREMENT,
		payload: status,
	};
};

export const toggleCreateRiskAssessment = status => {
	return {
		type: TOGGLE_CREATE_RISK_ASSESSMENT,
		payload: status,
	};
};

export const toggleCreateRecordVital = status => {
	return {
		type: TOGGLE_CREATE_RECORD_VITAL,
		payload: status,
	};
};
export const toggleCreateRecordDelivery = status => {
	return {
		type: TOGGLE_CREATE_RECORD_DELIVERY,
		payload: status,
	};
};

export const toggleCreateClinicalTask = status => {
	return {
		type: TOGGLE_CREATE_CLINICAL_TASK,
		payload: status,
	};
};

// patient
export const toggleLineAppraisal = status => {
	return {
		type: TOGGLE_LINE_APPRAISAL,
		payload: status,
	};
};

export const toggleStaffAppraisal = (status, data) => {
	return {
		type: TOGGLE_STAFF_APPRAISAL,
		payload: status,
		data,
	};
};

export const toggleLabourMeasurementDetail = (action, data) => {
	return {
		type: TOGGLE_LABOUR_MEASURMENT_DETAIL,
		payload: action,
		data,
	};
};

// nicu
export const toggleAddNewObservation = status => {
	return {
		type: TOGGLE_ADD_NEW_OBSERVATION,
		payload: status,
	};
};

// close modals
export const closeModals = () => {
	return dispatch => {
		dispatch(toggleModal(false));
		dispatch(toggleShowHistory(false));
		dispatch(toggleAddTask(false));
		dispatch(toggleViewAppraisal(false));
		dispatch(toggleViewPayrollHistory(false));
		dispatch(toggleCurrentPayroll(false));
		dispatch(toggleEditPayroll(false));
		dispatch(toggleAddNewObservation(false));
		dispatch(toggleCreateLabourMeasurement(false));
		dispatch(toggleCreateRiskAssessment(false));
		dispatch(toggleCreateRecordDelivery(false));
		dispatch(toggleCreateClinicalTask(false));
		dispatch(toggleCreateRecordVital(false));
		dispatch(toggleLineAppraisal(false));
		dispatch(toggleStaffAppraisal(false, null));
		dispatch(toggleLabourMeasurementDetail(false, null));
	};
};

export const closeCurrentPayRoll = is_modal => {
	return dispatch => {
		if (!is_modal) {
			dispatch(toggleModal(false));
		}
		dispatch(toggleCurrentPayroll(false, null));
	};
};

export const closeEditPayRoll = is_modal => {
	return dispatch => {
		if (!is_modal) {
			dispatch(toggleModal(false));
		}
		dispatch(toggleEditPayroll(false, null));
	};
};

export const showHistory = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleShowHistory(action));
	};
};

export const addTask = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleAddTask(action));
	};
};

//appraisal modals
export const viewAppraisal = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleViewAppraisal(action));
	};
};

export const viewPayrollHistory = (action, staff) => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleViewPayrollHistory(action, staff));
	};
};

export const viewCurrentPayroll = (action, isModal, id) => {
	return dispatch => {
		if (!isModal) {
			dispatch(closeModals());
			dispatch(toggleModal(true));
		}
		dispatch(toggleIsModal(isModal ? true : false));
		dispatch(toggleCurrentPayroll(action, id));
	};
};

export const viewEditPayroll = (action, isModal, id) => {
	return dispatch => {
		dispatch(toggleIsModal(isModal ? true : false));
		dispatch(toggleEditPayroll(action, id));
	};
};

export const createLabourMeasurement = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateLabourMeasurement(action));
	};
};

export const createRiskAssessment = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateRiskAssessment(action));
	};
};
export const createRecordDelivery = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateRecordDelivery(action));
	};
};

export const createRecordVital = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateRecordVital(action));
	};
};

export const createClinicalTask = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateClinicalTask(action));
	};
};

export const lineAppraisal = (action, data) => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleLineAppraisal(action));
	};
};

export const loadStaffAppraisal = (action, data) => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleStaffAppraisal(action, data));
	};
};

export const labourMeasurementDetail = (action, data) => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleLabourMeasurementDetail(action, data));
	};
};

// nurse
export const addNewObservation = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleAddNewObservation(action));
	};
};
