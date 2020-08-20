import {
	LOAD_APPOINTMENTS,
	ADD_APPOINTMENT,
	UPDATE_APPOINTMENT,
} from '../actions/types';

export const loadAppointments = status => {
	return {
		type: LOAD_APPOINTMENTS,
		payload: status,
	};
};

export const addAppointment = status => {
	return {
		type: ADD_APPOINTMENT,
		payload: status,
	};
};

export const updateAppointment = status => {
	return {
		type: UPDATE_APPOINTMENT,
		payload: status,
	};
};
