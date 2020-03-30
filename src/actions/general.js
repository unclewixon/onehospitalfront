import {
	TOGGLE_PRELOADING,
	TOGGLE_MODAL,
	TOGGLE_IS_MODAL,
	TOGGLE_CREATE_STAFF,
	TOGGLE_SET_LEAVE,
	TOGGLE_EDIT_STAFF,
	TOGGLE_ADD_TASK,
	TOGGLE_SHOW_HISTORY,
	TOGGLE_CREATE_INVENTORY,
	TOGGLE_EDIT_INVENTORY,
	TOGGLE_UPDATE_QTY,
	TOGGLE_VIEW_APPRAISAL,
	TOGGLE_VIEW_PAYROLL_HISTORY,
	TOGGLE_VIEW_CURRENT_PAYROLL,
	TOGGLE_PREPARE_PAYROLL,
	TOGGLE_EDIT_PAYROLL,
	TOGGLE_REGISTER_NEW_PATIENT,
	TOGGLE_CREATE_APPOINTMENT,
	TOGGLE_VIEW_APPOINTMENT_DETAIL,
	TOGGLE_VIEW_PAYPOINT,
	TOGGLE_CREATE_VOUCHER,
	TOGGLE_CREATE_LABOUR_MEASUREMENT,
	TOGGLE_CREATE_RISK_ASSESSMENT,
	TOGGLE_CREATE_RECORD_DELIVERY,
	TOGGLE_CREATE_RECORD_VITAL,
	TOGGLE_UPLOAD_SERVICE,
	TOGGLE_UPLOAD_DIAGNOSIS,
	TOGGLE_UPLOAD_HMO,
	TOGGLE_EDIT_SERIVCE,
	TOGGLE_CREATE_CLINICAL_TASK,
	TOGGLE_OPEN_ENCOUNTER,
	TOGGLE_APPROVE_TRANSACTION,
	TOGGLE_APPLY_VOUCHER,
	TOGGLE_UPLOAD_HMO_TARIFF,
} from './types';

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
export const toggleCreateStaff = status => {
	return {
		type: TOGGLE_CREATE_STAFF,
		payload: status,
	};
};

export const toggleEditStaff = status => {
	return {
		type: TOGGLE_EDIT_STAFF,
		payload: status,
	};
};

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

// inventory modals
export const toggleCreateInventory = status => {
	return {
		type: TOGGLE_CREATE_INVENTORY,
		payload: status,
	};
};

export const toggleEditInventory = status => {
	return {
		type: TOGGLE_EDIT_INVENTORY,
		payload: status,
	};
};

export const toggleApproveTransaction = status => {
	return {
		type: TOGGLE_APPROVE_TRANSACTION,
		payload: status,
	};
};

export const toggleUpdateQuantity = status => {
	return {
		type: TOGGLE_UPDATE_QTY,
		payload: status,
	};
};

//frontdesk modals
export const toggleRegisterNewPatient = status => {
	return {
		type: TOGGLE_REGISTER_NEW_PATIENT,
		payload: status,
	};
};

export const toggleNewAppointment = status => {
	return {
		type: TOGGLE_CREATE_APPOINTMENT,
		payload: status,
	};
};

export const toggleViewAppointDetail = status => {
	return {
		type: TOGGLE_VIEW_APPOINTMENT_DETAIL,
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

export const togglePreparePayroll = status => {
	return {
		type: TOGGLE_PREPARE_PAYROLL,
		payload: status,
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

export const toggleViewPayPoint = status => {
	return {
		type: TOGGLE_VIEW_PAYPOINT,
		payload: status,
	};
};

export const toggleCreateVoucher = status => {
	return {
		type: TOGGLE_CREATE_VOUCHER,
		payload: status,
	};
};

export const toggleApplyVoucher = status => {
	return {
		type: TOGGLE_APPLY_VOUCHER,
		payload: status,
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

export const toggleUploadService = status => {
	return {
		type: TOGGLE_UPLOAD_SERVICE,
		payload: status,
	};
};

export const toggleUploadDiagnosis = status => {
	return {
		type: TOGGLE_UPLOAD_DIAGNOSIS,
		payload: status,
	};
};

export const toggleUploadHmo = status => {
	return {
		type: TOGGLE_UPLOAD_HMO,
		payload: status,
	};
};

export const toggleUploadHmoTariff = status => {
	return {
		type: TOGGLE_UPLOAD_HMO_TARIFF,
		payload: status,
	};
};

export const toggleEditService = (status, data) => {
	return {
		type: TOGGLE_EDIT_SERIVCE,
		payload: { status, data },
	};
};

// patient
export const toggleOpenEncounter = (status, id) => {
	return {
		type: TOGGLE_OPEN_ENCOUNTER,
		payload: status,
		id,
	};
};

// close modals
export const closeModals = () => {
	return dispatch => {
		dispatch(toggleModal(false));
		dispatch(toggleCreateStaff(false));
		dispatch(toggleShowHistory(false));
		dispatch(toggleAddTask(false));
		dispatch(toggleEditStaff(false));
		dispatch(toggleCreateInventory(false));
		dispatch(toggleApplyVoucher(false));
		dispatch(toggleEditInventory(false));
		dispatch(toggleApproveTransaction(false));
		dispatch(toggleUpdateQuantity(false));
		dispatch(toggleViewAppraisal(false));
		dispatch(toggleViewPayrollHistory(false));
		dispatch(toggleCurrentPayroll(false));
		dispatch(togglePreparePayroll(false));
		dispatch(toggleEditPayroll(false));
		dispatch(toggleRegisterNewPatient(false));
		dispatch(toggleNewAppointment(false));
		dispatch(toggleViewAppointDetail(false));
		dispatch(toggleViewPayPoint(false));
		dispatch(toggleCreateVoucher(false));
		dispatch(toggleCreateLabourMeasurement(false));
		dispatch(toggleCreateRiskAssessment(false));
		dispatch(toggleCreateRecordDelivery(false));
		dispatch(toggleCreateClinicalTask(false));
		dispatch(toggleCreateRecordVital(false));
		dispatch(toggleUploadService(false));
		dispatch(toggleUploadDiagnosis(false));
		dispatch(toggleUploadHmo(false));
		dispatch(toggleUploadHmoTariff(false));
		dispatch(toggleEditService(false, null));
		dispatch(toggleOpenEncounter(false, null));
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

export const createStaff = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateStaff(action));
	};
};
export const showHistory = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleShowHistory(action));
	};
};

export const editStaff = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleEditStaff(action));
	};
};

export const addTask = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleAddTask(action));
	};
};

// inventory modal toggles
export const createInventory = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateInventory(action));
	};
};

export const editInventory = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleEditInventory(action));
	};
};

export const approveTransaction = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleApproveTransaction(action));
	};
};

export const updateQuantity = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleUpdateQuantity(action));
	};
};

//frontdesk modals
export const registerNewPatient = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleRegisterNewPatient(action));
	};
};

export const createNewAppointment = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleNewAppointment(action));
	};
};

export const viewAppointmentDetail = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleViewAppointDetail(action));
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

export const preparePayroll = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(togglePreparePayroll(action));
	};
};

export const viewEditPayroll = (action, isModal, id) => {
	return dispatch => {
		dispatch(toggleIsModal(isModal ? true : false));
		dispatch(toggleEditPayroll(action, id));
	};
};

//paypoint
export const viewPayPoint = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleViewPayPoint(action));
	};
};

export const uploadServiceModal = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleUploadService(action));
	};
};

export const uploadDiagnosis = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleUploadDiagnosis(action));
	};
};

export const uploadHmo = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleUploadHmo(action));
	};
};

export const uploadHmoTariff = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleUploadHmoTariff(action));
	};
};

export const editService = (action, data) => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleEditService(action, data));
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

export const openEncounter = (action, id) => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleOpenEncounter(action, id));
	};
};

export const applyVoucher = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleApplyVoucher(true));
		dispatch(toggleCreateVoucher(action));
	};
};

export const createVoucher = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateVoucher(action));
	};
};

export const createClinicalTask = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleCreateClinicalTask(action));
	};
};
