import { LOAD_ROLES, UPDATE_ROLE } from './types';

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
