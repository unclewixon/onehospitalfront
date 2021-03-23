import {
	LOAD_STAFFS,
	LOAD_APPRAISALS,
	LOAD_LEAVE,
	LOAD_DUTY_ROSTERS,
	LOAD_PAYROLL,
	ADD_STAFF,
	LOAD_UNPAID_PAYROLL,
	LOAD_PAYROLL_HISTORY,
	UPDATE_STAFF,
	EDIT_STAFF_PAYLOAD,
	LOAD_STAFF_TRANSACTION,
	ADD_PERFORMANCE_PERIOD,
	LOAD_PERFORMANCE_PERIOD,
	SET_PERFORMANCE_PERIOD,
} from './types';
import { notifySuccess, notifyError } from './../services/notify';

import { API_URI, TOKEN_COOKIE } from '../services/constants';
import SSRStorage from '../services/storage';
import axios from 'axios';
const storage = new SSRStorage();

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

export const edited_staff_payload = data => {
	return {
		type: EDIT_STAFF_PAYLOAD,
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

export const updateStaff = (datum, id, cb) => async dispatch => {
	console.log('updat:)');
	console.log(datum);
	const formDataObj = new FormData();
	for (const key in datum) {
		formDataObj.append(key, datum[key]);
	}
	const user = await storage.getItem(TOKEN_COOKIE);
	const jwt = `Bearer ${user.token}`;
	let headers = { Authorization: jwt };
	axios
		.patch(`${API_URI}/hr/staffs/${id}/update`, formDataObj, { headers })
		.then(res => {
			if (res) {
				dispatch({
					type: UPDATE_STAFF,
					payload: res.data.staff,
				});
				cb();
				notifySuccess('Updated Staff Successfully');
				return;
			} else {
				notifyError(res.message);
			}
		})
		.catch(e => {
			cb();
			notifyError('Could not update staff');
		});
};
