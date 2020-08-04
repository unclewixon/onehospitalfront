import {
	LOAD_ROLES,
	NEW_ROLE,
	UPDATE_ROLE,
	DELETE_ROLE,
	TOGGLE_PERMISSION_MODAL,
} from './types';
import { API_URI } from '../services/constants';
import axios from 'axios';
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

export const updateRole = (role, previousData) => {
	return {
		type: UPDATE_ROLE,
		payload: role,
		previousData,
	};
};

export const delete_role = role => {
	return {
		type: DELETE_ROLE,
		payload: role,
	};
};

export const deleteRole = data => {
	return dispatch => {
		return axios
			.delete(`${API_URI}/settings/roles/${data.id}`)
			.then(response => {
				return dispatch(delete_role(data));
			})
			.catch(error => {
				console.log(error);
			});
	};
};

export const togglePermissionModal = status => {
	return {
		type: TOGGLE_PERMISSION_MODAL,
		payload: status,
	};
};
