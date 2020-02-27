import { GET_ALL_DEPARTMENTS } from './types';

export const loadDepartments = data => {
	return {
		type: GET_ALL_DEPARTMENTS,
		payload: data,
	};
};
