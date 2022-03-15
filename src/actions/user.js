import {
	SET_PROFILE,
	SIGN_OUT,
	TOGGLE_MODE,
	TOGGLE_MENU,
	TOGGLE_FULLSCREEN,
	INIT_MODE,
	INIT_FULLSCREEN,
	SET_PATIENT_RECORD,
	TOGGLE_PROFILE,
} from './types';

export const loginUser = user => {
	return {
		type: SET_PROFILE,
		payload: user,
		status: true,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

export const toggleProfile = (status, info, appointmentId, anc) => {
	return {
		type: TOGGLE_PROFILE,
		payload: status,
		info,
		appointmentId,
		antenatal: anc,
	};
};

export const toggleMode = () => {
	return {
		type: TOGGLE_MODE,
	};
};

export const toggleMenu = () => {
	return {
		type: TOGGLE_MENU,
	};
};

export const toggleFullscreen = () => {
	return {
		type: TOGGLE_FULLSCREEN,
	};
};

export const initMode = status => {
	return {
		type: INIT_MODE,
		payload: status,
	};
};

export const initFullscreen = status => {
	return {
		type: INIT_FULLSCREEN,
		payload: status,
	};
};

export const setPatientRecord = data => {
	return {
		type: SET_PATIENT_RECORD,
		payload: data,
	};
};
