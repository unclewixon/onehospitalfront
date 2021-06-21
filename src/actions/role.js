import { LOAD_ROLES, UPDATE_ROLE, ADD_ROLE } from './types';

export const loadRoles = roles => {
	return {
		type: LOAD_ROLES,
		payload: roles,
	};
};

export const updateRole = role => {
	return {
		type: UPDATE_ROLE,
		payload: role,
	};
};

export const addRole = role => {
	return {
		type: ADD_ROLE,
		payload: role,
	};
};
