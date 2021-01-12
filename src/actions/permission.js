import { LOAD_PERMISSIONS } from './types';

export const loadPermissions = payload => {
	return {
		type: LOAD_PERMISSIONS,
		payload,
	};
};
