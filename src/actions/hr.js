import {
	LOAD_STAFFS,
	LOAD_APPRAISALS,
	LOAD_LEAVE,
	LOAD_DUTY_ROSTERS,
	LOAD_PAYROLL,
	ADD_STAFF,
} from './types';

export const loadStaff = data => {
	return {
		type: LOAD_STAFFS,
		payload: data,
	};
};

export const addStaff = data => {
	return {
		type: ADD_STAFF,
		payload: data,
	};
};

export const loadAppraisals = data => {
	return {
		type: LOAD_APPRAISALS,
		payload: data,
	};
};

export const loadStaffLeave = data => {
	return {
		type: LOAD_LEAVE,
		payload: data,
	};
};

export const loadRoster = data => {
	return {
		type: LOAD_DUTY_ROSTERS,
		payload: data,
	};
};

export const loadPayroll = data => {
	return {
		type: LOAD_PAYROLL,
		payload: data,
	};
};
