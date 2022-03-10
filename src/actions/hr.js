import {
	LOAD_APPRAISALS,
	LOAD_LEAVE,
	LOAD_PAYROLL,
	LOAD_UNPAID_PAYROLL,
	LOAD_PAYROLL_HISTORY,
	LOAD_STAFF_TRANSACTION,
	ADD_PERFORMANCE_PERIOD,
	LOAD_PERFORMANCE_PERIOD,
	SET_PERFORMANCE_PERIOD,
} from './types';

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

export const loadStaffTransaction = payload => {
	return {
		type: LOAD_STAFF_TRANSACTION,
		payload,
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
