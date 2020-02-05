import {
	TOGGLE_MODAL,
	TOGGLE_CREATE_STAFF,
	TOGGLE_SET_LEAVE,
	TOGGLE_SHOW_HISTORY,
} from './types';

export const toggleModal = status => {
	return {
		type: TOGGLE_MODAL,
		payload: status,
	};
};

export const toggleCreateStaff = status => {
	return {
		type: TOGGLE_CREATE_STAFF,
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

export const closeModals = () => {
	return dispatch => {
		dispatch(toggleModal(false));
		dispatch(toggleCreateStaff(false));
		dispatch(toggleShowHistory(false));
		dispatch(toggleSetLeave(false));
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

export const setLeave = action => {
	return dispatch => {
		dispatch(closeModals());
		dispatch(toggleModal(true));
		dispatch(toggleSetLeave(action));
	};
};
