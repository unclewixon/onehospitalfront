import { LOAD_DEPARTMENTS, UPDATE_DEPARTMENT } from './types';

export const loadDepartments = payload => {
	return {
		type: LOAD_DEPARTMENTS,
		payload,
	};
};

export const updateDepartment = payload => {
	return {
		type: UPDATE_DEPARTMENT,
		payload,
	};
};
