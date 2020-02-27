import { LOAD_ROLES, NEW_ROLE, UPDATE_ROLE } from './types';

export const loadRoles = roles => {
	return {
		type: LOAD_ROLES,
		payload: roles,
	};
};

export const addRole = role => {
	return {
		type: NEW_ROLE,
		payload: role,
	};
};

export const updateRole = role => {
	return {
		type: UPDATE_ROLE,
		payload: role,
	};
};
