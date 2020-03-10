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
  TOGGLE_UPLOAD_SERVICE
} from "./types";

export const togglePreloading = status => {
  return {
    type: TOGGLE_PRELOADING,
    payload: status
  };
};

export const toggleIsModal = status => {
  return {
    type: TOGGLE_IS_MODAL,
    payload: status
  };
};

export const toggleModal = status => {
  return {
    type: TOGGLE_MODAL,
    payload: status
  };
};

//Hr Modals

export const toggleCreateStaff = status => {
  return {
    type: TOGGLE_CREATE_STAFF,
    payload: status
  };
};

export const toggleEditStaff = status => {
  return {
    type: TOGGLE_EDIT_STAFF,
    payload: status
  };
};

export const toggleShowHistory = status => {
  return {
    type: TOGGLE_SHOW_HISTORY,
    payload: status
  };
};

export const toggleSetLeave = status => {
  return {
    type: TOGGLE_SET_LEAVE,
    payload: status
  };
};

export const toggleAddTask = status => {
  return {
    type: TOGGLE_ADD_TASK,
    payload: status
  };
};

// inventory modals
export const toggleCreateInventory = status => {
  return {
    type: TOGGLE_CREATE_INVENTORY,
    payload: status
  };
};

export const toggleEditInventory = status => {
  return {
    type: TOGGLE_EDIT_INVENTORY,
    payload: status
  };
};

export const toggleUpdateQuantity = status => {
  return {
    type: TOGGLE_UPDATE_QTY,
    payload: status
  };
};

//frontdesk modals
export const toggleRegisterNewPatient = status => {
  return {
    type: TOGGLE_REGISTER_NEW_PATIENT,
    payload: status
  };
};

export const toggleNewAppointment = status => {
  return {
    type: TOGGLE_CREATE_APPOINTMENT,
    payload: status
  };
};

export const toggleViewAppointDetail = status => {
  return {
    type: TOGGLE_VIEW_APPOINTMENT_DETAIL,
    payload: status
  };
};

// appraisals
export const toggleViewAppraisal = status => {
  return {
    type: TOGGLE_VIEW_APPRAISAL,
    payload: status
  };
};

// payroll
export const toggleViewPayrollHistory = status => {
  return {
    type: TOGGLE_VIEW_PAYROLL_HISTORY,
    payload: status
  };
};

export const togglePreparePayroll = status => {
  return {
    type: TOGGLE_PREPARE_PAYROLL,
    payload: status
  };
};

export const toggleCurrentPayroll = status => {
  return {
    type: TOGGLE_VIEW_CURRENT_PAYROLL,
    payload: status
  };
};

export const toggleEditPayroll = status => {
  return {
    type: TOGGLE_EDIT_PAYROLL,
    payload: status
  };
};

export const toggleUploadService = status => {
  return {
    type: TOGGLE_UPLOAD_SERVICE,
    payload: status
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
    dispatch(toggleEditInventory(false));
    dispatch(toggleUpdateQuantity(false));
    dispatch(toggleViewAppraisal(false));
    dispatch(toggleViewPayrollHistory(false));
    dispatch(toggleCurrentPayroll(false));
    dispatch(togglePreparePayroll(false));
    dispatch(toggleEditPayroll(false));
    dispatch(toggleRegisterNewPatient(false));
    dispatch(toggleNewAppointment(false));
    dispatch(toggleViewAppointDetail(false));
    dispatch(toggleUploadService(false));
  };
};

export const closeCurrentPayRoll = is_modal => {
  return dispatch => {
    if (!is_modal) {
      dispatch(toggleModal(false));
    }
    dispatch(toggleCurrentPayroll(false));
  };
};

export const closeEditPayRoll = is_modal => {
  return dispatch => {
    if (!is_modal) {
      dispatch(toggleModal(false));
    }
    dispatch(toggleEditPayroll(false));
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

export const viewPayrollHistory = action => {
  return dispatch => {
    dispatch(closeModals());
    dispatch(toggleModal(true));
    dispatch(toggleViewPayrollHistory(action));
  };
};

export const viewCurrentPayroll = (action, isModal) => {
  return dispatch => {
    if (!isModal) {
      dispatch(closeModals());
      dispatch(toggleModal(true));
    }
    dispatch(toggleIsModal(isModal ? true : false));
    dispatch(toggleCurrentPayroll(action));
  };
};

export const preparePayroll = action => {
  return dispatch => {
    dispatch(closeModals());
    dispatch(toggleModal(true));
    dispatch(togglePreparePayroll(action));
  };
};

export const viewEditPayroll = (action, isModal) => {
  return dispatch => {
    dispatch(toggleIsModal(isModal ? true : false));
    dispatch(toggleEditPayroll(action));
  };
};

export const uploadService = action => {
  return dispatch => {
    dispatch(closeModals());
    dispatch(toggleModal(true));
    dispatch(toggleUploadService(action));
  };
};
