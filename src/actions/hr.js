import {
	LOAD_STAFFS,
	LOAD_APPRAISALS,
	LOAD_LEAVE,
	LOAD_DUTY_ROSTERS,
	LOAD_PAYROLL,
	ADD_STAFF,
	LOAD_UNPAID_PAYROLL,
	LOAD_PAYROLL_HISTORY,
	ADD_PERFORMANCE_PERIOD,
	LOAD_PERFORMANCE_PERIOD,
	SET_PERFORMANCE_PERIOD,
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

// payroll
export const loadPayroll = data => {
	return {
		type: LOAD_PAYROLL,
		payload: data,
	};
};

export const loadUnpaidPayroll = data => {
	return {
		type: LOAD_UNPAID_PAYROLL,
		payload: data,
	};
};

export const loadPayrollHistory = data => {
	return {
		type: LOAD_PAYROLL_HISTORY,
		payload: data,
	};
};

export const loadPerformancePeriod = data => {
	return {
		type: LOAD_PERFORMANCE_PERIOD,
		payload: data,
	};
};
export const addPerformancePeriod = data => {
	return {
		type: ADD_PERFORMANCE_PERIOD,
		payload: data,
	};
};

export const setPerformancePeriod = data => {
	return {
		type: SET_PERFORMANCE_PERIOD,
		payload: data,
	};
};
